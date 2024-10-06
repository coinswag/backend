import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Merch } from '../merch/merch.schema';
import { Shop } from '../shop/shop.schema';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shop: Shop;

  @Prop({ required: true, unique: true })
  walletAddress: string;

  @Prop(
    raw([
      {
        merch: { type: mongoose.Schema.Types.ObjectId, ref: 'Merch' },
        size: String,
        quantity: { type: Number, default: 1 },
      },
    ]),
  )
  items: Record<string, any>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
