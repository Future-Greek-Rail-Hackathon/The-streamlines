import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Train, TrainType } from '../entity/Trains';
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
    newTrain.maxWeight = type === TrainType.FULL_TRAIN ? 750 : 0;

    return await this.trainRepository.save(newTrain);
  }

  async findById(trainId: number): Promise<Train> {
    return await this.trainRepository.findOne({
      where: {
        id: trainId,
      },
      relations: ['wagons'],
    });
  }

  async findAll(): Promise<Train[]> {
    return await this.trainRepository.find({ relations: ['wagons'] });
  }
}
