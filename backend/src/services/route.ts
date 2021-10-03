import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Route } from '../entity/Routes';
import { Train, TrainType } from '../entity/Trains';
import { TrainStop } from '../entity/TrainStop';
import { TrainStopService } from './trainStop';
moment.tz.setDefault('Europe/Athens');

export class RouteService {
  routeRepository: Repository<Route>;

  constructor() {
    this.routeRepository = getRepository(Route);
  }

  async createRoute(
    startLocationId: number,
    endLocationId: number,
    estimatedTime: Date,
    startTime: Date,
  ): Promise<Route> {
    const trainStopModel = new TrainStopService();
    const start = await trainStopModel.findById(startLocationId);
    const end = await trainStopModel.findById(endLocationId);
    let newRoute = this.routeRepository.create();

    newRoute.startLocationId = start.id;
    newRoute.endLocationId = end.id;
    newRoute.estimatedTime = moment(estimatedTime).toDate();
    newRoute.startTime = moment(startTime).toDate();
    newRoute.endTime = moment(startTime).add(moment(estimatedTime).hours()).toDate();
    return await this.routeRepository.save(newRoute);
  }

  findById(routeId: number) {
    return this.routeRepository.findOne({
      where: {
        id: routeId,
      },
      relations: ['trains_tops'],
    });
  }
}