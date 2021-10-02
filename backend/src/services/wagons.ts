import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Wagon } from '../entity/Wagon';
moment.tz.setDefault('Europe/Athens');

export class WagonService {
  wagonRepository: Repository<Wagon>;

  constructor() {
    this.wagonRepository = getRepository(Wagon);
  }

  async createWagon(wagon: Wagon): Promise<Wagon> {
    let newWagon = this.wagonRepository.create(wagon);
    return await this.wagonRepository.save(newWagon);
  }

  findById(wagonId: number) {
    return this.wagonRepository.findOne({
      where: {
        id: wagonId,
      },
      relations: ['trains'],
    });
  }
}
