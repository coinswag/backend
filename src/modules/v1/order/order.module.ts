import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from '../shop/shop.schema';
import { Cart, CartSchema } from '../cart/cart.schema';
import { Customer, CustomerSchema } from '../customer/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: Cart.name, schema: CartSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
