import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './shop.schema';
import { UserModule } from 'src/modules/v1/user/user.module';
import { UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shop.name, schema: ShopSchema },
      { name: 'User', schema: UserSchema },
    ]),
    UserModule,
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
