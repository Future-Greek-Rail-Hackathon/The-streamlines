import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Package } from '../entity/Package';
moment.tz.setDefault('Europe/Athens');

export class PackageService {
  packageRepository: Repository<Package>;

  constructor() {
    this.packageRepository = getRepository(Package);
  }

  findById(packageId: number) {
    return this.packageRepository.findOne({
      where: {
        id: packageId,
      },
      relations: ['orders'],
    });
  }
}
