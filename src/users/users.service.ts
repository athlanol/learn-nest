import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);

    return this.repo.save(user);
  }

  findAll(email: string) {
    return this.repo.find({ where: { email } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException();

    Object.assign(user, updateUserDto);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    this.repo.remove(user);
    return this.repo.save(user);
  }
}
