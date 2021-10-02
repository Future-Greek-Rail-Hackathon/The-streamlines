import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { GeoLocation } from '../entity/Trains';
import { TrainStop, TrainStopType } from '../entity/TrainStop';
moment.tz.setDefault('Europe/Athens');

export class TrainStopService {
  trainStopRepository: Repository<TrainStop>;

  constructor() {
    this.trainStopRepository = getRepository(TrainStop);
  }

  async createTrainStop(type: TrainStopType, location: GeoLocation): Promise<TrainStop> {
    let newStop = this.trainStopRepository.create();
    newStop.type = type;
    newStop.latitude = location.latitude;
    newStop.longitude = location.longitude;

    if (type === TrainStopType.TERMINAL) {
      newStop.canLoad = true;
      newStop.canUnLoad = true;
    } else {
      //TODO: handle non terminal stations
    }
    return await this.trainStopRepository.save(newStop);
  }

  findById(trainStopId: number) {
    return this.trainStopRepository.findOne({ id: trainStopId });
  }
}
