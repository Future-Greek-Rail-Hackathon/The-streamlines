import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../entity/Order';
import { Package } from '../entity/Package';
import { Train, TrainType } from '../entity/Trains';
import { RouteService } from './route';
import { TrainService } from './train';
import { UserService } from './user';
moment.tz.setDefault('Europe/Athens');

export class PackageService {
  packageRepository: Repository<Package>;

  constructor() {
    this.packageRepository = getRepository(Package);
  }

  async createPackage(pckg: Package, order: Order): Promise<Package> {
    let newPackage = this.packageRepository.create(pckg);
    newPackage.order = order;

    return await this.packageRepository.save(newPackage);
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
