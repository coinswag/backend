import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { MerchService } from './merch.service';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  cloudinaryStorage,
  uploadImage,
} from 'src/common/utils/cloudinary.config';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';

@Controller('merch')
export class MerchController {
  constructor(private readonly merchService: MerchService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 5, { storage: cloudinaryStorage }),
  )
  async createMerch(
    @Body() createMerchDto: CreateMerchDto,
    @UploadedFiles() files,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one image is required');
    }

    const uploadedImages = await Promise.all(
      files.map((file) => uploadImage(file)),
    );

    const merch = {
      ...createMerchDto,
      images: uploadedImages.map((img) => img.secure_url),
    };
    return await this.merchService.create(merch);
  }

  @Get()
  findAll() {
    return this.merchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMerchDto: UpdateMerchDto) {
    return this.merchService.update(id, updateMerchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchService.remove(id);
  }
}
