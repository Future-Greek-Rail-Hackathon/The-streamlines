import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Train, TrainType } from '../entity/Trains';
import { User } from '../entity/User';
moment.tz.setDefault('Europe/Athens');

export class UserService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: ['orders'],
    });
  }

  findById(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['orders'],
    });
  }
}
