import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioService } from './formulario.service';
import { FormularioController } from './formulario.controller';
import { Formulario } from './formulario.entity/formulario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formulario])],
  providers: [FormularioService],
  controllers: [FormularioController],
})
export class FormularioModule {}
