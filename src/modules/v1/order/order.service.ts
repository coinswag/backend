import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Order, OrderDocument } from './order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/order.dto';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from '../shop/shop.schema';
import { Cart, CartDocument } from '../cart/cart.schema';
import { Customer, CustomerDocument } from '../customer/customer.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(payload: CreateOrderDto): Promise<OrderDocument> {
    const {
      shopId,
      totalAmount,
      customer,
      shippingInfo,
      priceBreakdown,
      cart,
    } = payload;

    try {
      const shop = await this.shopModel.findById(shopId);

      if (!shop) throw new BadRequestException('shop not found');

      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      const status = 'pending';
      const orderDate = new Date();
      const existingCustomer = await this.customerModel.findOne({
        email: customer.email,
      });
      const newCustomer =
        existingCustomer ?? (await this.customerModel.create(customer));

      // Calculate the total amount of the cart items
      const createdOrder = await this.orderModel.create({
        orderId,
        totalAmount,
        status,
        currency: 'SOL', // Default currency
        customer: newCustomer._id,
        shippingInfo,
        priceBreakdown,
        cart,
        orderDate,
        shop: shopId,
      });

      await this.shopModel.findByIdAndUpdate(shop.id, {
        $push: { orders: createdOrder._id, customers: newCustomer._id },
      });

      return createdOrder;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Order already exists');
      }
    }
  }

  async findAll(): Promise<OrderDocument[]> {
    return await this.orderModel.find();
  }

  async findOne(id: string): Promise<OrderDocument | null> {
    return await this.orderModel.findById(id);
  }

  async findByshopId(shopId: string): Promise<OrderDocument[]> {
    return await this.orderModel.find({ shop: shopId });
  }

  async delete(id: string): Promise<OrderDocument | null> {
    return await this.orderModel.findByIdAndDelete(id);
  }
}
