import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/v1/user/user.module';
import { ShopModule } from './modules/v1/shop/shop.module';
import { ENVIRONMENT } from './common/configs/environment';
import { AuthModule } from './modules/v1/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchModule } from './modules/v1/merch/merch.module';

@Module({
  imports: [
    MongooseModule.forRoot(ENVIRONMENT.DB.URL),
    AuthModule,
    UserModule,
    ShopModule,
    MerchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
