import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Order, OrderState } from '../entity/Order';
import { Route } from '../entity/Routes';
import { Train, TrainType } from '../entity/Trains';
import { TrainStop } from '../entity/TrainStop';
import { OrderService } from './order';
import { TrainService } from './train';
import { TrainStopService } from './trainStop';
moment.tz.setDefault('Europe/Athens');

export class RouteService {
  routeRepository: Repository<Route>;

  constructor() {
    this.routeRepository = getRepository(Route);
  }

  async findAll(): Promise<Route[]> {
    return await this.routeRepository.find({
      loadRelationIds: true,
    });
  }

  async getRecurring(): Promise<Route[]> {
    return await this.routeRepository.find({
      where: {
        recurring: true,
        active: true,
      },
      loadRelationIds: true,
    });
  }

  async recurRoutes(routes: Route[]): Promise<Route[]> {
    const routeModel = new RouteService();
    let route: Route;
    let startLocation, endLocation: any;
    let startTime, estimatedTime: Date;
    for (let i = 0; i < routes.length; i++) {
      // Get routes values
      route = routes[i];
      startLocation = route.startLocation;
      endLocation = route.endLocation;
      startTime = moment(route.startTime).add(1, 'day').toDate();
      estimatedTime = moment(route.estimatedTime).add(1, 'day').toDate();
      route.active = false;
      await routeModel.routeRepository.save(route);
      await routeModel.createRoute(startLocation, endLocation, estimatedTime, startTime, true);
    }
    return routes;
  }

  async createRoute(
    startLocationId: any,
    endLocationId: any,
    estimatedTime: Date,
    startTime: Date,
    recurring: boolean = false,
  ): Promise<Route> {
    const trainStopModel = new TrainStopService();
    const start = await trainStopModel.findById(startLocationId);
    const end = await trainStopModel.findById(endLocationId);
    let newRoute = this.routeRepository.create();

    newRoute.startLocation = start;
    newRoute.endLocation = end;
    newRoute.estimatedTime = moment(estimatedTime).toDate();
    newRoute.startTime = moment(startTime).toDate();
    newRoute.endTime = moment(startTime).add(moment(estimatedTime).hours(), 'hour').toDate();
    newRoute.recurring = recurring;
    newRoute.active = recurring ? true : false;
    return await this.routeRepository.save(newRoute);
  }

  findById(routeId: number) {
    return this.routeRepository.findOne({
      where: {
        id: routeId,
      },
      loadRelationIds: true,
    });
  }

  async assignTrain(route: Route, trainId: number): Promise<Route> {
    const trainModel = new TrainService();
    const train = await trainModel.findById(trainId);
    route.currentTrain = train;
    // Transfer to start of route
    route.trainId = train.id;
    let newRoute = await this.routeRepository.save(route);
    return newRoute;
  }

  clearTrain(route: Route) {
    route.currentTrain = null;
    return this.routeRepository.save(route);
  }

  async startRoute(orders: Order[]) {
    let response = '';
    const orderModel = new OrderService();
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].state === OrderState.SCANNED) {
        orderModel.updateOrderStatus(orders[i], OrderState.IN_TRANSIT);
      } else {
        response = response + `Order with id ${orders[i].id} is in bad State. \n`;
      }
    }
    response = response === '' ? 'ok' : response;
    return response;
  }

  getTotalWeight(route: Route) {
    let totalWeight = 0;
    route.currentOrders.forEach((o) => o.packages.forEach((p) => (totalWeight += p.weight)));
    return totalWeight;
  }

  async findAvailable(totalWeight: number, trainType: TrainType) {
    let routesQuery = this.routeRepository
      .createQueryBuilder('route')
      .select('routes.*')
      .leftJoinAndSelect('routes.id', 'orders', 'routes.id = orders.routeId')
      .leftJoinAndSelect('orders.id', 'packages', 'packages.orderId = orders.id')
      .leftJoinAndSelect('routes.currentTrainId', 'trains', 'routes.currentTrainId = trains.id')
      .where('trains.type = :type', { type: trainType })
      .andWhere('routes.startTime > :date', { date: moment().toDate() });
    let routes = await routesQuery.getRawMany();
    routes = routes.map(
      (r: Route) => this.getTotalWeight(r) + totalWeight <= r.currentTrain.maxWeight,
    );
  }
}
