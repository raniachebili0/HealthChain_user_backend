import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Practitioner, PractitionerDocument } from './schema/practitioner.schema';
import { User } from 'src/users/schemas/users.schema';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from 'src/patient/schema/appoinment.schema';

@Injectable()
export class PractitionerService {
  constructor(
    @InjectModel(Practitioner.name)
    private readonly practitionerModel: Model<PractitionerDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  // Créer un praticien
  // async create(userId: string, createPractitionerDto: CreatePractitionerDto) {
  //   const user = await this.userModel.findById(userId).exec();
  //   if (!user || user.resourceType !== 'practitioner') {
  //     throw new UnauthorizedException('User is not a valid practitioner');
  //   }

  //   const practitioner = new this.practitionerModel(createPractitionerDto);
  //   await practitioner.save();
  //   return practitioner;
  // }

  // Obtenir tous les praticiens
  async findAll() {
    return this.practitionerModel
      .find()
      .populate('practitioner', 'name email specialty')
      .exec();
  }

  // // Obtenir un praticien par ID
  // async findOne(id: string) {
  //   const practitioner = await this.practitionerModel
  //     .findById(id)
  //     .populate('practitioner', 'name email specialty')
  //     .exec();
  //   if (!practitioner) {
  //     throw new NotFoundException('Practitioner not found');
  //   }
  //   return practitioner;
  // }

  // Obtenir les rendez-vous d'un praticien
  async getPractitionerAppointments(practitionerId: string) {
    const appointments = await this.appointmentModel
      .find({ practitioner: practitionerId })
      .populate('patient', 'name email')
      .select('-practitioner')
      .exec();
  
    if (!appointments.length) {
      throw new NotFoundException('No appointments found');
    }
  
    return appointments;
  }
  
}
