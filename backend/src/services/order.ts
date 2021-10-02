import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../entity/Order';
import { Package } from '../entity/Package';
import { Train, TrainType } from '../entity/Trains';
import { PackageService } from './pacakge';
import { RouteService } from './route';
import { TrainService } from './train';
import { UserService } from './user';
moment.tz.setDefault('Europe/Athens');

export class OrderService {
  orderRepository: Repository<Order>;

  constructor() {
    this.orderRepository = getRepository(Order);
  }

  async createOrder(
    userId: number,
    packages: Package[],
    trainId: number,
    pickupDate: Date,
  ): Promise<Order> {
    const userModel = new UserService();
    const user = await userModel.findById(userId);

    const trainModel = new TrainService();
    const assignedTrain = await trainModel.findById(trainId);

    let newOrder = this.orderRepository.create();
    newOrder.user = user;
    newOrder.assignToTrain = assignedTrain;
    newOrder.requestedPickupDate = pickupDate;
    newOrder.eta = assignedTrain.currenRoute.endTime;

    let packageModel = new PackageService();
    let totalPrice = 0;
    for (let i = 0, l = packages.length; i < l; i++) {
      let newp = await packageModel.createPackage(packages[i], newOrder);
      if (newp) {
        totalPrice = totalPrice + newp.price;
      }
    }
    newOrder.totalPrice = totalPrice;

    return await this.orderRepository.save(newOrder);
  }

  findById(orderId: number) {
    return this.orderRepository.find({ id: orderId });
  }
}
