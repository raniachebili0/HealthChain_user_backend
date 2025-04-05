import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePractitionerDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Name cannot be longer than 50 characters' })
    readonly name: string;
  
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    readonly email: string;
  
    @IsString({ message: 'Specialty must be a string' })
    @IsNotEmpty({ message: 'Specialty is required' })
    readonly specialty: string;
  
    @IsBoolean({ message: 'isActive must be a boolean value' })
    @IsOptional()
    readonly isActive: boolean;
}
