import { Controller, Get, Post, Req, Param, UseGuards, Body } from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { AuthGuard } from 'src/guards/authentication.guard';

@Controller('practitioners')
export class PractitionerController {
  constructor(private readonly practitionerService: PractitionerService) {}

 

  // fetch all 
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req) {
    
    return this.practitionerService.findAll();
  }

  // Obtenir un praticien par ID
  // @UseGuards(AuthGuard)
  // @Get(':id')
  // async findOne(@Req() req, ) {
  //   const userId =  req.userId;
  //   return this.practitionerService.findOne(userId);
  // }

  // Obtenir les rendez-vous d'un 
  @UseGuards(AuthGuard)
  @Get('appointments')
  async getPractitionerAppointments(@Req() req) {
    const practitionerId = req.userId;
    return this.practitionerService.getPractitionerAppointments(practitionerId);
  }
}
