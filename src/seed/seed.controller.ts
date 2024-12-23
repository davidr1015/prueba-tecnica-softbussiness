import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Seed') 
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Ejecutar seed', description: 'Agrega usuarios iniciales de prueba. Ejecutar solo al inicio antes de agregar nuevos usaurios ya que cada vez que se ejecute se borraran los usuarios agregados' })
  @ApiResponse({ status: 200, description: 'Seed ejecutado correctamente' })
  runSeed() {
    return this.seedService.runSeed();
  }

}
