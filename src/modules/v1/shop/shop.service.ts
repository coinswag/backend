import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Model } from 'mongoose';
import { Shop, ShopDocument, ShopSchema } from './shop.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createShopDto: CreateShopDto) {
    const newShop = await this.shopModel.create({
      ...createShopDto,
      name: createShopDto.name.toLowerCase(),
    });
    await this.userModel.findByIdAndUpdate(createShopDto.owner, {
      $push: { shops: newShop.id },
    });
    return newShop;
  }

  async findAll(userId: string) {
    return (await this.shopModel.findById(userId)).populate('shops');
  }

  async findOne(id: string) {
    return await this.shopModel.findById(id);
  }
  async findOneByName(name: string) {
    const shops = this.shopModel
      .findOne({
        name,
      })
      .populate('merches');
    return shops;
  }
  async getAllMerches(id: string) {
    return await (
      await this.shopModel.findById(id).populate('merches').select('merches')
    ).merches;
  }

  async getAllCustomers(id: string) {
    return await (
      await this.shopModel
        .findById(id)
        .populate('customers')
        .select('customers')
    ).customers;
  }

  async getAllOrders(id: string) {
    return await (
      await this.shopModel.findById(id).populate('orders').select('orders')
    ).orders;
  }
  async update(id: string, updateShopDto: UpdateShopDto) {
    return await this.shopModel.findByIdAndUpdate(id, updateShopDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.shopModel.findByIdAndDelete(id);
  }
}
