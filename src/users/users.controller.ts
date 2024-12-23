import { Controller, Get, Post, Body, Patch, Param, UseGuards, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { use } from 'passport';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  @UseGuards(AuthGuard())
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.usersService.findAll(paginationDto);
  }


  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.usersService.login(LoginUserDto);
  }

  @Get('check-auth-status')
  @UseGuards(AuthGuard())
  checkAuthStatus(
    @Getuser() user: User
  ){

    return this.usersService.checkAuthStatus(user); 
  }

  @Patch('update-data')
  @UseGuards(AuthGuard())
  updateData(
    @Getuser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateData(user, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(
    @Param('id', ParseUUIDPipe) id: string
  ){
    return this.usersService.delete(id);
  }

}
