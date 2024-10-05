import { Module } from '@nestjs/common';
import { MerchService } from './merch.service';
import { MerchController } from './merch.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Merch, MerchSchema } from './merch.schema';
import { Shop, ShopSchema } from '../shop/shop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Merch.name, schema: MerchSchema },
      { name: Shop.name, schema: ShopSchema },
    ]),
  ],
  controllers: [MerchController],
  providers: [MerchService],
})
export class MerchModule {}
