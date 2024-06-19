import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { Formulario } from './formulario.entity/formulario.entity';
import { CreateFormularioDto } from './datos/create.dto';
import { UpdateFormularioDto } from './datos/update.dto';

@Controller('formulario')
export class FormularioController {
  constructor(private readonly formularioService: FormularioService) {}

  @Get()
  findAll(): Promise<Formulario[]> {
    return this.formularioService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Formulario> {
    const formulario = await this.formularioService.findById(id);
    if (!formulario) {
      throw new NotFoundException('Formulario no encontrado');
    }
    return formulario;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createFormularioDto: CreateFormularioDto,
  ): Promise<Formulario> {
    return this.formularioService.create(createFormularioDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: number,
    @Body() updateFormularioDto: UpdateFormularioDto,
  ): Promise<Formulario> {
    // eslint-disable-next-line prettier/prettier
    const formulario = await this.formularioService.update(
      id,
      updateFormularioDto,
    );
    if (!formulario) {
      throw new NotFoundException('Formulario no encontrado');
    }
    return formulario;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ success: boolean }> {
    const success = await this.formularioService.delete(id);
    return { success }; // Devuelve un objeto indicando si la eliminación fue exitosa
  }
}
