import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { sendDomainEmail } from 'src/common/utils/resend';
import { ResponseTransformerInterceptor } from 'src/common/interceptors/response.interceptor';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { SendWaitlistEmailTemplate } from 'src/common/templates/waitlist.email';

@UseInterceptors(ResponseTransformerInterceptor)
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post()
  @ResponseMessage(RESPONSE_CONSTANT.MAIL.SENT)
  async create(@Body() createWaitlistDto: CreateWaitlistDto) {
    const waitlist = await this.waitlistService.create(createWaitlistDto);
    await sendDomainEmail(
      createWaitlistDto.email,
      'Uptions Waitlist',
      SendWaitlistEmailTemplate(),
    );
    return waitlist;
  }
}
