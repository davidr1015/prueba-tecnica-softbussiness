import { Controller, Get, Post, Body, Patch, Param, UseGuards, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Listado de usuarios', description: 'Retorna un listado de usuarios paginados' })
  @ApiResponse({ status: 200, description: 'Listado de usuarios' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiBearerAuth()
  @ApiSecurity('bearer') 
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.usersService.findAll(paginationDto);
  }


  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Crear usuario', description: 'Crea un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado', type: User })
  @ApiResponse({ status: 400, description: 'Error en la solicitud' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiBearerAuth()
  @ApiSecurity('bearer') 
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'Inicia sesion en la aplicacion' })
  @ApiResponse({ status: 200, description: 'Usuario logueado', type: User })
  @ApiResponse({ status: 400, description: 'Error en la solicitud' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.usersService.login(LoginUserDto);
  }

  @Get('check-auth-status')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Estado de autenticacion', description: 'Retorna el estado de autenticacion del usuario y renueva el token' })
  @ApiBearerAuth()
  @ApiSecurity('bearer') 
  checkAuthStatus(
    @Getuser() user: User
  ){

    return this.usersService.checkAuthStatus(user); 
  }

  @Patch('update-data')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Actualizar datos', description: 'Actualiza los datos del usuario logueado' })
  @ApiBearerAuth()
  @ApiSecurity('bearer') 
  updateData(
    @Getuser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateData(user, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Eliminar usuario', description: 'Elimina un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiBearerAuth()
  @ApiSecurity('bearer') 
  delete(
    @Param('id', ParseUUIDPipe) id: string
  ){
    return this.usersService.delete(id);
  }

}
