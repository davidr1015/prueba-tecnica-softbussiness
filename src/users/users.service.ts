import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto


      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      return {
        message: 'Usuario creado correctamente',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if (!user) {
      throw new UnauthorizedException('El usuario no existe');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }

    delete user.password;

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  async findAll(paginationDto: PaginationDto) {
    try {

      const { limit = 10, offset = 0, searchTerm } = paginationDto;

      const where = searchTerm
        ? [
          { nombre: ILike(`%${searchTerm}%`) },
          { primerApellido: ILike(`%${searchTerm}%`) },
          { segundoApellido: ILike(`%${searchTerm}%`) }
        ]
        : undefined;

      const [users, total] = await this.userRepository.findAndCount(
        {
          where,
          take: limit,
          skip: offset,
          order: {
            nombre: 'ASC',
            primerApellido: 'ASC'
          }
        }
      );


      return {
        data: users,
        totalCount: total,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.ceil(offset / limit) + 1, 
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async updateData(user: User, updateUserDto: UpdateUserDto) {
    try {

      const { password, ...userData } = updateUserDto;

      const updateData = {
        ...userData,
        ...(password && { password: await bcrypt.hashSync(password, 10) })
      }

      if (Object.keys(updateData).length === 0) {
        return {
          message: 'No hay campos para actualizar'
        }
      }

      await this.userRepository.update(user.id, updateData);

      return {
        message: 'Usuario actualizado correctamente'
      }


    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      message: 'Usuario eliminado correctamente'
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }


  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Ha ocurrido un error inesperado');
  }
}
