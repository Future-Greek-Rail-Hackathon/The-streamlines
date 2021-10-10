import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../entity/Order';
import { TrackRecord, TrackRecordType } from '../entity/TrackRecord';
moment.tz.setDefault('Europe/Athens');

export class TrackRecordService {
  trackRecordRepository: Repository<TrackRecord>;

  constructor() {
    this.trackRecordRepository = getRepository(TrackRecord);
  }

  async createTrackRecord(type: TrackRecordType, order: Order): Promise<TrackRecord> {
    let trackRecord = this.trackRecordRepository.create();
    trackRecord.order = order;
    trackRecord.type = type;
    return await this.trackRecordRepository.save(trackRecord);
  }
}
