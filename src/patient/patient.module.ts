import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { Appointment, AppointmentSchema } from './schema/appoinment.schema';

@Module({
  imports:[
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([{
      name: Appointment.name,
      schema: AppointmentSchema
    }])],
  controllers: [PatientController],
  providers: [PatientService],
  exports:[MongooseModule]
})
export class PatientModule {}
