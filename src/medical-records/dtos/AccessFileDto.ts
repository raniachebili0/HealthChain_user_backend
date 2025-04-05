import { Type } from "class-transformer";
import { IsNotEmpty, IsMongoId, IsString, IsDate } from "class-validator";

export class AccessFileDto{
 
  fileName: string;  
 
 
  patient: string; 

 
  doctor: string; 
 

  description: string; 

  DebuitAccessDate: Date; 

  FinAccessDate: Date; 
  
  fileUrl : string;

  fileType: string;
}
