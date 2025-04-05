import { Type } from "class-transformer";
import { IsNotEmpty, IsMongoId, IsString, IsDate } from "class-validator";

export class CreateAppointmentDto {
  // @IsMongoId()
  @IsNotEmpty()
  doctorId: string;

  @Type(() => Date) // Converts incoming string to Date
  @IsDate({ message: "startDateTime must be a Date instance" }) 
  @IsNotEmpty()
  startDateTime: Date;  // Start date-time of the appointment

  @Type(() => Date) // Converts incoming string to Date
  @IsDate({ message: "endDateTime must be a Date instance" }) 
  @IsNotEmpty()
  endDateTime: Date;    // End date-time of the appointment

  @IsString()
  @IsNotEmpty()
  reason: string;  // Reason for the appointment

  @IsString()
  @IsNotEmpty()
  type: string;    // Type of the appointment (e.g., 'consultation', 'checkup')
}
