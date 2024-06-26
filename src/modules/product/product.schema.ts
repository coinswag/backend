import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Store } from '../store/store.schema';
import { CryptoMerchType } from './product.enum';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  tokenId: string;

  @Prop({ required: true })
  sizes: string[];

  @Prop({ enum: CryptoMerchType })
  type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true })
  images: string[];
  @Prop()
  imageUri: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true })
  store: Store;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
