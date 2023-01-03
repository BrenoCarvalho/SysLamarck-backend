import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const data = await this.userRepository.findOneBy({ username: username });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = data;

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async delete(id: number): Promise<number> {
    return (await this.userRepository.delete(id)).affected;
  }

  async create(data: UserCreateDto): Promise<string> {
    const user = new User();

    user.fullName = data.fullName;
    user.username = data.username;
    user.email = data.email;
    user.password = bcrypt.hashSync(data.password, 8);

    return this.userRepository
      .save(user)
      .then(() => {
        return 'User created as successfully.';
      })
      .catch(() => {
        return 'Error creating user.';
      });
  }
}
