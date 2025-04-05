import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { Model, Types } from 'mongoose';
import { Appointment, AppointmentDocument } from './schema/appoinment.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>
  ) {}


  async createAppointment(userId:string, /*resourceType: string*/ createAppointmentDto: CreateAppointmentDto) {
    const { doctorId,  startDateTime,endDateTime,  reason,type } = createAppointmentDto;
    // const user = await this.userModel.findById(userId).exec();
    // if (!user || user.resourceType !== 'patient') {
    //     throw new ForbiddenException('Only patients can book appointments');
    // }

    // Check if the user is a valid patient
    const user = await this.userModel.findById(userId).exec();
    console.log(user);  // Log the user object
    if (!user || user.resourceType !== 'patient') {
      throw new ForbiddenException('Only patients can book appointments');
    }

  // Ensure the doctor is a valid practitioner (doctor)
  const doctor = await this.userModel.findById(doctorId).exec();
  if (!doctor || doctor.resourceType !== 'practitioner') {
    throw new BadRequestException('The selected doctor is not a valid practitioner');
  }
   
  // if (resourceType !== 'patient') {
  //   throw new ForbiddenException('Only patients can book appointments');
  // }

  // // Ensure the doctor is a valid practitioner (doctor)
  // const doctor = await this.userModel.findById(createAppointmentDto.doctorId);
  // if (!doctor || doctor.resourceType !== 'practitioner') {
  //   throw new BadRequestException('The selected doctor is not a valid practitioner');
  // }
    const appointment = new this.appointmentModel({
     patient: userId,    // Assign userId to patient
     practitioner: doctorId,                 // The doctor for the appointment
     startDateTime,             // The start time of the appointment
     endDateTime,               // The end time of the appointment
     reason,                    // Reason for the appointment
     type,                      // Type of the appointment
     status: 'pending', 
    });
  
     await appointment.save();
     // Optionally, link the appointment to the patient and doctor (if required)
  await this.userModel.findByIdAndUpdate(userId, {
    $push: { appointments: appointment._id },
  });
  await this.userModel.findByIdAndUpdate(doctorId, {
    $push: { appointments: appointment._id },
  });
  return appointment;
  
  }

  
  
  /*async getAppointments(user) {
    return this.appointmentModel.find({ patientId: user._id }).populate("doctorId", "name email");
  }*/

    async getAppointments(userId) {
      return await this.appointmentModel.find({ patientId: userId }).populate("practitioner", "name email");
    }
  

  create(createPatientDto: CreatePatientDto) {
    return 'This action adds a new patient';
  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
