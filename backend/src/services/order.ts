import moment from 'moment-timezone';
import { getRepository, Repository } from 'typeorm';
import { Order, OrderState } from '../entity/Order';
import { Package } from '../entity/Package';
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
    routeId: number,
    pickupDate: Date,
  ): Promise<Order> {
    const userModel = new UserService();
    const user = await userModel.findById(userId);

    const routeModel = new RouteService();
    const route = await routeModel.findById(routeId);

    let newOrder = this.orderRepository.create();
    newOrder.user = user;
    newOrder.route = route;
    newOrder.requestedPickupDate = pickupDate;
    newOrder.eta = route.endTime ? route.endTime : null;
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
  async updateOrdersStatus(orders: Order[], status: OrderState) {
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      order.state = status;
      await this.orderRepository.save(order);
    }

    return orders;
  }
}
