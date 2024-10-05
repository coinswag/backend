import { Injectable } from '@nestjs/common';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merch } from './merch.schema';
import { Shop } from '../shop/shop.schema';

@Injectable()
export class MerchService {
  constructor(
    @InjectModel(Merch.name) private merchModel: Model<Merch>,
    @InjectModel(Shop.name) private shopModel: Model<Shop>,
  ) {}
  async create(createMerchDto: CreateMerchDto) {
    const variants = this.matchSizeAndQuantity(
      createMerchDto.sizes.trim().split(','),
      createMerchDto.quantities.trim().split(',').map(Number),
    );
    const merchData = {
      ...createMerchDto,
      price: Number(createMerchDto.price),
      colors: createMerchDto.colors.trim().split(','),
      variants,
    };
    const newMerch = await this.merchModel.create(merchData);
    await this.shopModel.findByIdAndUpdate(createMerchDto.shopId, {
      $push: { merch: newMerch._id },
    });
    return newMerch;
  }
  matchSizeAndQuantity(
    sizes: string[],
    quantities: number[],
  ): Array<{ size: string; quantity: number }> {
    const minLength = Math.min(sizes.length, quantities.length);
    const result: Array<{ size: string; quantity: number }> = [];

    for (let i = 0; i < minLength; i++) {
      result.push({ size: sizes[i], quantity: quantities[i] });
    }

    return result;
  }

  async findAll() {
    return await this.merchModel.find();
  }

  async findOne(id: string) {
    return await this.merchModel.findById(id);
  }

  async update(id: string, updateMerchDto: UpdateMerchDto) {
    return await this.merchModel.findByIdAndUpdate(id, updateMerchDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.merchModel.findByIdAndDelete(id);
  }
}
