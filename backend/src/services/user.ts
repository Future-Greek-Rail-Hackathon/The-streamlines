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
    let newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
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
