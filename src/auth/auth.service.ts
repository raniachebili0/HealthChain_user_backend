import { BadRequestException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { ResetToken } from './schemas/reset-token.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import { Cache } from 'cache-manager';
import { User } from 'src/users/schemas/users.schema';
import { Role } from 'src/roles/schemas/role.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RolesService } from 'src/roles/roles.service';
import { UploadService } from 'src/services/UploadService';



dotenv.config();
@Injectable()
export class AuthService {
  private readonly emailTransporter;
    constructor(
        @InjectModel(RefreshToken.name)
        private RefreshTokenModel: Model<RefreshToken>,
        @InjectModel(ResetToken.name)
        @InjectModel(Role.name) private readonly roleModel: Model<Role>,
        @InjectModel(User.name) private readonly usersModel : Model <User>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @Inject() private uploadService: UploadService,
        private rolesService:RolesService,
        private jwtService: JwtService) {
          this.emailTransporter = nodemailer.createTransport({
            service: 'gmail',
            port: 578,
            secure: false ,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
        }
      



    //*************signup service*********************//
    async sendOtpToEmail(email: string): Promise<string> {
      const otp = this.generateOtp();
      await this.cacheManager.set(
        `otp:${email}`,
        otp,
        1000 * 60 * 5, // 5 minutes
      );
      try {
        // Send OTP via email
        await this.emailTransporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your OTP Code',
          text: `Your OTP is ${otp}`,
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
  
        return otp; // Return OTP to save it for verification
      } catch (error) {
        console.error('Error sending OTP via email', error);
        throw new Error('Failed to send OTP via email');
      }
    }
  
    // Method to generate and send OTP to both mobile and email
    async sendOtp( email: string): Promise<{ otp: string }> {
      const otp =  await this.sendOtpToEmail(email);
  
      // Store OTP in a cache, database, or memory for verification (with expiry)
      return { otp };
    }

    async verifyOtp(email: string, otp: string): Promise<boolean> {
      const storedOtp = await this.cacheManager.get(`otp:${email}`);
      return storedOtp === otp;  // Check if the OTP is correct
    }

    private generateOtp(): string {
      const otp = randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
      return otp;
    }

    async signupUser(signupData: SignupDto, file?: Express.Multer.File) {
      const { email, password, name, gender, birthDate, telecom,role ,specialization, licenseNumber} = signupData;
  
      // Check if email is already in use
      const emailInUse = await this.usersModel.findOne({email});
      if (emailInUse) {
        throw new BadRequestException('Email already in use');
      }
     
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  

     const userRole = await this.rolesService.findOneByname(role);

     if (!userRole) throw new BadRequestException(`Role ${role} does not exist`);

     let imageUrl = null;
     if (file) {
       imageUrl = this.uploadService.getUploadedFileUrl(file.filename);
     }

     const user = new this.usersModel({
      resourceType: role ,
      email,
      password: hashedPassword,
      name,
      gender,
      birthDate,
      telecom,
      roleId: userRole._id,
      photo: imageUrl,
      specialization,
      licenseNumber
    });
      await user.save();
      return { message: 'success' };
    }


   //*******************signIn service*********************//
   async login(credentials: LoginDto) {
    const { email, password } = credentials;

    // Rechercher l'utilisateur par email
    const user = await this.usersModel.findOne({ email }).populate('roleId');
    Logger.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const roleId = user.roleId._id.toString();
    const userRole = await this.rolesService.getRoleById(roleId) ?? null;
    const userRolename = userRole.name;
    //Generate JWT tokens
    const tokens = await this.generateUserTokens(user._id);
   
    return {
      ...tokens,
      userId: user._id,
      role: userRolename
    };
  }





    async generateUserTokens(userId) {
        const accessToken = this.jwtService.sign({ userId }, { expiresIn: '10h' });
        const refreshToken = uuidv4();
    
        await this.storeRefreshToken(refreshToken, userId);
        return {
          accessToken,
          refreshToken,
        };
      }

    async storeRefreshToken(token: string, userId: string) {
    // Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      {
        upsert: true,
      },
    );
  }



}
