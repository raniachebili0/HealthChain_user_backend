import { IsEmail, IsEnum, IsObject, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Resource } from 'src/roles/enums/resource.enum';
import { Roles } from 'src/roles/enums/roles.enum';


enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class SignupDto {
  @IsString()
  email: string;
  @IsOptional()
  @IsEnum(Gender, {
    message: 'Gender must be one of the following values: male or female',
  })
  gender: string;
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  birthDate :string;
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
  password: string;
  @IsString()
  telecom: string;
  @IsOptional()
  @IsString()
  address:string

  /*@IsString()
  photo : string;*/


 // @IsEnum(Roles) 
  @IsOptional()
  role: string;


  @IsOptional()
  specialization: string;
  @IsOptional()
  licenseNumber: string;
    
 
}
