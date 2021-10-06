import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Order, OrderState } from '../entity/Order';
import { Package } from '../entity/Package';
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
    newOrder.assignedToTrain = assignedTrain;
    newOrder.requestedPickupDate = pickupDate;
    if (assignedTrain.currenRoute) {
      newOrder.eta = assignedTrain.currenRoute.endTime;
    }
    newOrder.state = OrderState.NEW_ORDER;
    newOrder.packages = packages;

    let totalPrice = 0;
    for (let i = 0, l = packages.length; i < l; i++) {
      totalPrice = totalPrice + packages[i].price;
    }
    newOrder.totalPrice = totalPrice;

    return await this.orderRepository.save(newOrder);
  }

  findById(orderId: number) {
    return this.orderRepository.findOne({ id: orderId });
  }

  async updateOrderStatus(order: Order, status: OrderState) {
    order.state = status;
    order = await this.orderRepository.save(order);
    return order;
  }
}
