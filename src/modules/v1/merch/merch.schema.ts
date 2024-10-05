import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MerchDocument = Merch & Document;

@Schema()
export class Merch {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, maxlength: 500 })
  description: string;

  @Prop({ required: true, type: [String], maxlength: 5 })
  images: string[];

  @Prop({ required: true, type: [String], maxlength: 5 })
  colors: string[];

  @Prop({ required: true })
  merchandiseType: string;

  @Prop({ type: [{ size: String, quantity: Number }], required: true })
  variants: Variant[];
}
export interface Variant {
  size: string;
  quantity: number;
}
export const MerchSchema = SchemaFactory.createForClass(Merch);
