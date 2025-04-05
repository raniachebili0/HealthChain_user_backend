import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, SchemaTypes, Types } from "mongoose";


export type AppointmentDocument = HydratedDocument<Appointment>;
@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: 'User' })
  patient: Types.ObjectId;  // Ensure this is for patient

  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: 'User' })
  practitioner: Types.ObjectId;   // Ensure this is for doctor

  @Prop({ required: true })
  startDateTime: Date;        // The start time of the appointment

  @Prop({ required: true })
  endDateTime: Date;          // The end time of the appointment

  @Prop()
  type: string;                // Type of appointment (appointment, consultation, checkup)

  @Prop()
  reason: string;              // Reason for the appointment

  @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'canceled'] })
  status: string;              // Status of the appointment
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
