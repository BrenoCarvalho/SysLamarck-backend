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
    return this.userRepository.findOneBy({ username: username });
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
    user.birthDate = data.birthDate;
    user.rg = data.rg;
    user.cpf = data.cpf;
    user.nationality = data.nationality;
    user.maritalStatus = data.maritalStatus;
    user.contact1 = data.contact1;
    user.contact2 = data.contact2;
    user.cep = data.cep;
    user.city = data.city;
    user.district = data.district;
    user.address = data.address;
    user.bank = data.bank;
    user.accountType = data.accountType;
    user.agency = data.agency;
    user.accountNumber = data.accountNumber;

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
