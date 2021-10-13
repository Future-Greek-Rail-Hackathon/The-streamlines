import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../entity/Order';
import { Train, TrainType } from '../entity/Trains';
import { Wagon } from '../entity/Wagon';
import { RouteService } from './route';
import { WagonService } from './wagons';
moment.tz.setDefault('Europe/Athens');

export class TrainService {
  trainRepository: Repository<Train>;

  constructor() {
    this.trainRepository = getRepository(Train);
  }

  async createTrain(type: TrainType, canGoAboard: boolean, maxWeight: number): Promise<Train> {
    let newTrain = this.trainRepository.create();
    newTrain.type = type;
    newTrain.canGoAboard = canGoAboard;
    newTrain.maxWeight = type === TrainType.FULL_TRAIN ? parseInt('750') : parseInt('0');

    return await this.trainRepository.save(newTrain);
  }

  async findById(trainId: number): Promise<Train> {
    return await this.trainRepository.findOne({
      where: {
        id: trainId,
      },
      relations: ['wagons'],
      loadRelationIds: true,
    });
  }

  async getCurrentRoutesOrder(train: Train): Promise<Order[]> {
    let ordersQuery = this.trainRepository
      .createQueryBuilder('train')
      .select('orders.*')
      .leftJoinAndSelect('trains.id', 'routes', 'trains.id = routes.currentTrainID')
      .leftJoinAndSelect('routes.id', 'orders', 'routes.id = orders.routeId')
      .where('routes.id = :id', { id: train.id });
    return ordersQuery.getRawMany();
  }

  async findAll(): Promise<Train[]> {
    return await this.trainRepository.find({ relations: ['wagons'], loadRelationIds: true });
  }

  async addWagon(trainId: number, wagonId: number): Promise<Wagon> {
    const trainModel = new TrainService();
    const train = await trainModel.findById(trainId);

    const wagonModel = new WagonService();
    const wagon = await wagonModel.findById(wagonId);

    if (train.currenRoute) {
      train.currenRoute.totalCapacity = train.maxWeight;
      const routeModel = new RouteService();
      await routeModel.routeRepository.save(train.currenRoute);
    }

    wagon.currentTrain = train;
    let newWagon = await wagonModel.wagonRepository.save(wagon);

    return newWagon;
  }

  async getWagons(train: Train) {
    const wagonModel = new WagonService();
    return await wagonModel.wagonRepository.find({
      where: {
        currentTrain: train,
      },
    });
  }
  async findAvailable(): Promise<Train[]> {
    return await this.trainRepository.find({
      where: { currenRoute: null },
      relations: ['wagons'],
      loadRelationIds: true,
    });
  }
}
