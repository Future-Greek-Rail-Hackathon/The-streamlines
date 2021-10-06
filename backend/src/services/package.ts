import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Package } from '../entity/Package';
moment.tz.setDefault('Europe/Athens');

export class PackageService {
  packageRepository: Repository<Package>;

  constructor() {
    this.packageRepository = getRepository(Package);
  }

  async createPackage(pckg: Package): Promise<Package> {
    let newPackage = this.packageRepository.create(pckg);

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
