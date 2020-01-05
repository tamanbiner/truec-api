import { Controller, Get } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('businesses')
  getHello(): string {
    return this.businessService.getHello();
  }
}
