import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../entity/Order';
import { Package } from '../entity/Package';
import { Train, TrainType } from '../entity/Trains';
import { RouteService } from './route';
import { TrainService } from './train';
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
    // const userModel = new UserService();
    // const user = userModel.findById(userId);

    const trainModel = new TrainService();
    const assignedTrain = await trainModel.findById(trainId);

    let newOrder = this.orderRepository.create();
    newOrder.user = user;
    newOrder.assignToTrain = assignedTrain;
    newOrder.requestedPickupDate = pickupDate;
    newOrder.eta = assignedTrain.currenRoute.endTime;

    let totalPrice = 0;
    packages.forEach((p) => (totalPrice = totalPrice + p.price));
    newOrder.totalPrice = totalPrice;

    return await this.orderRepository.save(newOrder);
  }

  findById(orderId: number) {
    return this.orderRepository.find({ id: orderId });
  }
}
