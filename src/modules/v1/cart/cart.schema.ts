import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
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
