import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { RolesService } from 'src/roles/roles.service';




@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel : Model <User>,
    private rolesService: RolesService,){}

  async getUserPermissions(userId: string) {
    const user = await this.usersModel.findById(userId);
    if (!user) throw new BadRequestException();
    const role = await this.rolesService.getRoleById(user.roleId.toString());
    return role.permissions;
  }
  
  async findOnebyemail(email: string): Promise<User> {
      const user = await this.usersModel.findOne({email}).exec();
      return user; 
  }

  async create(createUserDto: CreateUserDto) {
    const createUser = new this.usersModel(createUserDto);
    return createUser.save();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user; 
  }

  





  findAll() {
    return `This action returns all users`;
  }

 
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
