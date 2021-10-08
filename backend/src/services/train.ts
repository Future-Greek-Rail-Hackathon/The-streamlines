import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../entity/Order';
import { Train, TrainType } from '../entity/Trains';
import { Wagon } from '../entity/Wagon';
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

  async addWagon(train: Train, wagon: Wagon): Promise<Train> {
    train.wagons.push(wagon);
    if (train.type === TrainType.NON_FULL_TRAIN) {
      let trainWeight = parseInt(train.maxWeight.toString());
      train.maxWeight = trainWeight + parseInt(wagon.maxWeight.toString());
    }

    const wagonModel = new WagonService();
    await wagonModel.wagonRepository.save(wagon);
    return train;
  }
}
