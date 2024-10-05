import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { Merch } from '../merch/merch.schema';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Merch' }],
  })
  merches: Merch[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
