import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { AuthGuard } from 'src/guards/authentication.guard';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { User } from 'src/users/schemas/users.schema';
import { Appointment } from './schema/appoinment.schema';

@Controller('patient')

export class PatientController {
  constructor(private readonly patientService: PatientService) {}

 /* @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }*/
  @UseGuards(AuthGuard)
  @Post('appointment')
  //@UseGuards(AuthorizationGuard)
  async createAppointment(
    @Req() req,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) : Promise<Appointment>{
    // console.log(req.headers);  // Log headers to check Authorization token
     
    console.log(req.userId);
    
    // console.log('User ID:', userId);  // Log the userId to verify it's received correctly
    console.log('Appointment Data:', createAppointmentDto);  // Log the appointment data to verify it
  
    // Check if userId is provided
    // if (!userId) {
    //   throw new UnauthorizedException("User ID is missing.");
    // }

  //  if (!req.user || !req.user.id) {
  //     throw new UnauthorizedException("User not authenticated");
  //   }
   
    return await this.patientService.createAppointment(req.userId, createAppointmentDto);
  }
    // return await this.patientService.createAppointment(userId, createAppointmentDto);


  @Get('appointments')
  //@UseGuards(AuthorizationGuard)
  async getAppointments(@Req() req) {
    return this.patientService.getAppointments(req.userId);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}

