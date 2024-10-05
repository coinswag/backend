import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/user.schema';
import { Model } from 'mongoose';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { Public } from 'src/common/decorators/public.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { uploadImage } from 'src/common/utils/cloudinary.config';
import { ENVIRONMENT } from 'src/common/configs/environment';

@Controller('shop')
@UseGuards(JwtAuthGuard)
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @UseInterceptors(FilesInterceptor('images'))
  @ResponseMessage(RESPONSE_CONSTANT.SHOP.CREATE_SHOP_SUCCESS)
  @Post()
  async create(@Body() createShopDto: CreateShopDto, @UploadedFiles() files) {
    console.log(ENVIRONMENT.CLOUDINARY.CLOUDINARY_URL);
    const uploadedImages = await Promise.all(
      files.map((file) => uploadImage(file)),
    );
    const shopData = {
      ...createShopDto,
      logo: uploadedImages[0].secure_url,
    };
    return await this.shopService.create(shopData);
  }

  @ResponseMessage(RESPONSE_CONSTANT.SHOP.GET_ALL_SHOPS_SUCCESS)
  @Get()
  findAllUserShops(@LoggedInUserDecorator() user: { id: string }) {
    return this.shopService.findAll(user.id);
  }
  @Public()
  @ResponseMessage(RESPONSE_CONSTANT.SHOP.GET_ALL_SHOPS_SUCCESS)
  @Get('/name')
  findOneByName(@Body('name') name: string) {
    return this.shopService.findOneByName(name);
  }

  @Public()
  @ResponseMessage(RESPONSE_CONSTANT.SHOP.GET_SHOP_SUCCESS)
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(id);
  }
}
