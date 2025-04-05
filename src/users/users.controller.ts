import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, UnauthorizedException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import { AuthGuard } from 'src/guards/authentication.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(AuthGuard)
  @Get('getbyId')
  findOne( @Req() req) {
    const userId =  req.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }  
    return this.usersService.findOne(userId);
  }


  @Get('doctors')
  async findDoctors(): Promise<User[]> {
    return this.usersService.findDoctors();
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const userId =  req.userId;
    return await this.usersService.update(userId, updateUserDto);
  }

/*
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }




  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
    
  */
}
