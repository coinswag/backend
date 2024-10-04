import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { UpdateWaitlistDto } from './dto/update-waitlist.dto';
import { Waitlist } from './schemas/waitlist.schema';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectModel(Waitlist.name) private waitlistModel: Model<Waitlist>,
  ) {}

  async create(createWaitlistDto: CreateWaitlistDto) {
    const existingWaitlist = await this.waitlistModel.findOne({
      email: createWaitlistDto.email,
    });
    if (existingWaitlist) {
      throw new ConflictException('Email has been used');
    }
    return await this.waitlistModel.create(createWaitlistDto);
  }

  async findAll() {
    return await this.waitlistModel.find().exec();
  }

  async findOne(id: string) {
    return await this.waitlistModel.findById(id).exec();
  }

  async update(id: string, updateWaitlistDto: UpdateWaitlistDto) {
    return await this.waitlistModel
      .findByIdAndUpdate(id, updateWaitlistDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.waitlistModel.findByIdAndDelete(id).exec();
  }
}
