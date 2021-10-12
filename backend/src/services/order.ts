import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { EventType, SSE } from '../controller/sseController';
import { Order, OrderState } from '../entity/Order';
import { Package } from '../entity/Package';
import { TrackRecordType } from '../entity/TrackRecord';
import { TrainStop } from '../entity/TrainStop';
import { sendEventsToAll } from '../lib/sse';
import { RouteService } from './route';
import { TrackRecordService } from './trackRecord';
import { UserService } from './user';
moment.tz.setDefault('Europe/Athens');

export class OrderService {
  orderRepository: Repository<Order>;

  constructor() {
    this.orderRepository = getRepository(Order);
  }

  async createOrder(
    userId: number,
    packages: Package[],
    routeId: number,
    pickupDate: Date,
  ): Promise<Order> {
    const userModel = new UserService();
    const user = await userModel.findById(userId);

    const routeModel = new RouteService();
    const route = await routeModel.findById(routeId);

    let newOrder = this.orderRepository.create();
    newOrder.user = user;
    newOrder.route = route;
    newOrder.requestedPickupDate = pickupDate;
    newOrder.eta = route.endTime ? route.endTime : null;
    newOrder.state = OrderState.NEW_ORDER;
    newOrder.packages = packages;

    let totalPrice = 0;
    let totalWeight = 0;
    for (let i = 0, l = packages.length; i < l; i++) {
      totalPrice = totalPrice + packages[i].price;
      totalWeight = totalWeight + packages[i].weight;
    }
    newOrder.totalPrice = totalPrice;
    route.availableCapacity = route.availableCapacity - totalWeight;
    await routeModel.routeRepository.save(route);
    if (route.availableCapacity < 40) {
      let SSEvent: SSE = {
        eventType: EventType.TRAIN_IS_FULL,
        routeId: route.id,
      };
      sendEventsToAll(SSEvent);
    }

    return await this.orderRepository.save(newOrder);
  }

  findById(orderId: number) {
    return this.orderRepository.findOne({ where: { id: orderId }, loadRelationIds: true });
  }

  async updateOrderStatus(order: Order, status: OrderState) {
    order.state = status;
    order = await this.orderRepository.save(order);
    return order;
  }
  async updateOrdersStatus(orders: Order[], status: OrderState) {
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      order.state = status;
      await this.orderRepository.save(order);
    }
    return orders;
  }

  async scanOrder(order: Order, station: TrainStop) {
    const trackModel = new TrackRecordService();
    let response = '';
    if (order.route.startLocation === station) {
      // Scanned at start location
      if (order.state === OrderState.ACCEPTED) {
        order.state = OrderState.SCANNED;
        await trackModel.createTrackRecord(TrackRecordType.SCANNED_AT_START, order);
        response = 'ok';
      } else if (order.state === OrderState.NEW_ORDER) {
        response = 'order is not accepted yet';
      } else if (order.state === OrderState.IN_TRANSIT) {
        response = 'already scanned, should be on the way';
      } else {
        response = 'bad state';
      }
    } else if (order.route.endLocation === station) {
      // Scanned at end location
      if (order.state === OrderState.IN_TRANSIT) {
        order.state = OrderState.ARRIVED;
        await trackModel.createTrackRecord(TrackRecordType.SCANNED_AT_END, order);
        response = 'ok';
      } else if (order.state === OrderState.ARRIVED) {
        response = 'already scanned, the client should be here';
      } else {
        response = 'bad state';
      }
    } else {
      // Do nothing
      response = 'Where did you scan it from? Check location';
    }

    return response;
  }

  async cancelOrder(orderId: number) {
    let order = await this.orderRepository.findOneOrFail({
      where: {
        id: orderId,
      },
    });

    //Cancel Order
    order.state = OrderState.CANCELLED;
    order.cancelled = true;

    let totalWeight = 0;
    order.packages.forEach((p) => (totalWeight = totalWeight + p.weight));

    // Get route and alter its space
    const routeModel = new RouteService();
    let route = order.route;
    route.availableCapacity = route.availableCapacity + totalWeight;
    await routeModel.routeRepository.save(route);
  }
}
