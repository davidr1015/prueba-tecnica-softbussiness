import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { initialUsers } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async runSeed() {
    try {
      // Vaciar la tabla de usuarios
      await this.userRepository.clear();

      // Insertar nuevos usuarios
      await this.insertUsers();

      return `Seed ejecutado correctamente`;
    } catch (error) {
      throw new InternalServerErrorException(`Error al ejecutar el seed: ${error.message}`);
    }
  }

  private async insertUsers() {
    const seedUsers = initialUsers

    const users: User[] = []

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user))
    })

    await this.userRepository.save(users)
  }
}
