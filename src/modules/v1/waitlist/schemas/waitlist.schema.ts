import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WaitlistDocument = Waitlist & Document;

@Schema()
export class Waitlist {
  @Prop()
  email: string;
}

export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);
