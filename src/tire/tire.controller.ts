import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Tire } from './tire.entity';
import { TireService } from './tire.service';

@Controller('tire')
export class TireController {
  constructor(private tireService: TireService) { }
  
  @Get('/:username')
  getTireInformation(
    @Query('username') username:string 
  ): Promise<Tire[]>{
    return this.tireService.getTireInformation(username);
  }
}
