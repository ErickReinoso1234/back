import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formulario } from './formulario.entity/formulario.entity';
import { CreateFormularioDto } from './datos/create.dto';
import { UpdateFormularioDto } from './datos/update.dto';

@Injectable()
export class FormularioService {
  constructor(
    @InjectRepository(Formulario)
    private readonly formularioRepository: Repository<Formulario>,
  ) {}

  async create(createFormularioDto: CreateFormularioDto): Promise<Formulario> {
    // Validar datos adicionales si es necesario
    if (await this.emailExists(createFormularioDto.correo)) {
      throw new BadRequestException('El correo ya está en uso');
    }

    const formulario = this.formularioRepository.create(createFormularioDto);
    return await this.formularioRepository.save(formulario);
  }

  async findAll(): Promise<Formulario[]> {
    return await this.formularioRepository.find();
  }

  async findById(id: number): Promise<Formulario | null> {
    return await this.formularioRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateFormularioDto: UpdateFormularioDto,
  ): Promise<Formulario> {
    const formulario = await this.formularioRepository.findOne({
      where: { id },
    });
    if (!formulario) {
      throw new NotFoundException('Formulario no encontrado');
    }

    Object.assign(formulario, updateFormularioDto);
    return await this.formularioRepository.save(formulario);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.formularioRepository.delete(id);
    return result.affected > 0; // Devuelve true si se eliminó al menos un registro
  }

  private async emailExists(correo: string): Promise<boolean> {
    const count = await this.formularioRepository.count({ where: { correo } });
    return count > 0;
  }
}
