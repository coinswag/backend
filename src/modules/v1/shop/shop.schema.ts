import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { Merch } from '../merch/merch.schema';
import { Order } from '../order/order.schema';
import { Customer } from '../customer/customer.schema';

export type ShopDocument = Shop & Document;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  displayName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: true, unique: true })
  logo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  payoutAddress: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Merch' }],
  })
  merches: Merch[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
  })
  customers: Customer[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  })
  orders: Order[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
