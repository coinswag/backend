import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Shop } from '../shop/shop.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  did: string;

  @Prop({ required: true })
  pubKey: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  })
  shops: Shop[];
}

export const UserSchema = SchemaFactory.createForClass(User);
