import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bail } from './bail.entity';
import { BailCreateDto } from './dto/bail.create.dto';

@Injectable()
export class BailService {
  constructor(
    @Inject('BAIL_REPOSITORY')
    private bailRepository: Repository<Bail>,
  ) {}

  async findAll(): Promise<Bail[]> {
    return this.bailRepository.find();
  }

  async delete(bailCode: number): Promise<number> {
    const response = await this.bailRepository.delete(bailCode);
    console.log('bail deleted as successfully');

    return response.affected;
  }

  async findBy(by: object): Promise<Bail[]> {
    return await this.bailRepository.findBy(by);
  }

  async findOne(bailCode: number): Promise<Bail> {
    return this.bailRepository.findOneBy({ bailCode: bailCode });
  }

  async update(bailCode: number, data: BailCreateDto): Promise<string> {
    const bail = await this.bailRepository.findOneBy({
      bailCode: bailCode,
    });

    if (!bail) {
      throw new NotFoundException(`Bail ${bailCode} not found`);
    }

    return this.bailRepository
      .update({ bailCode: bailCode }, data)
      .then(() => {
        const msg = `Bail ${bailCode} updated as successfuly`;
        console.log(msg);

        return msg;
      })
      .catch((error) => {
        console.log(error.driverError.sqlMessage);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async generateBailCode(): Promise<number> {
    const response = await this.bailRepository.find({
      select: { bailCode: true },
    });

    const bailsCode = [];

    response.map((value) => {
      bailsCode.push(value.bailCode);
    });

    let code = null;
    let stop = false;

    if (Math.min(...bailsCode) > 1) {
      code = 1;
    } else {
      bailsCode.map((value, index) => {
        if (!stop && bailsCode[index + 1] != value + 1) {
          code = value + 1;
          stop = true;
        }
      });
    }

    return code;
  }

  async create(data: BailCreateDto): Promise<Bail> {
    const bail = new Bail();

    bail.bailCode = await this.generateBailCode();
    bail.type = data.type;
    bail.escrowValue = data.escrowValue;
    bail.militaryInsurance = data.militaryInsurance;
    bail.fullName = data.fullName;
    bail.birthDate = data.birthDate;
    bail.rg = data.rg;
    bail.cpf = data.cpf;
    bail.nationality = data.nationality;
    bail.maritalStatus = data.maritalStatus;
    bail.profession = data.profession;
    bail.email = data.email;
    bail.contact1 = data.contact1;
    bail.contact2 = data.contact2;
    bail.cep = data.cep;
    bail.city = data.city;
    bail.district = data.district;
    bail.address = data.address;
    bail.SpouseFullName = data.SpouseFullName;
    bail.SpouseBirthDate = data.SpouseBirthDate;
    bail.SpouseRg = data.SpouseRg;
    bail.SpouseCpf = data.SpouseCpf;
    bail.SpouseNationality = data.SpouseNationality;
    bail.SpouseProfession = data.SpouseProfession;
    bail.SpouseContact1 = data.SpouseContact1;
    bail.BailPropertyCep = data.BailPropertyCep;
    bail.BailPropertyCity = data.BailPropertyCity;
    bail.BailPropertyDistrict = data.BailPropertyDistrict;
    bail.BailPropertyAddress = data.BailPropertyAddress;
    bail.BailPropertyRegistrationNumber = data.BailPropertyRegistrationNumber;
    bail.G2fullName = data.G2fullName;
    bail.G2birthDate = data.G2birthDate;
    bail.G2rg = data.G2rg;
    bail.G2cpf = data.G2cpf;
    bail.G2nationality = data.G2nationality;
    bail.G2maritalStatus = data.G2maritalStatus;
    bail.G2profession = data.G2profession;
    bail.G2email = data.G2email;
    bail.G2contact1 = data.G2contact1;
    bail.G2contact2 = data.G2contact2;
    bail.G2cep = data.G2cep;
    bail.G2city = data.G2city;
    bail.G2district = data.G2district;
    bail.G2address = data.G2address;
    bail.G2SpouseFullName = data.G2SpouseFullName;
    bail.G2SpouseBirthDate = data.G2SpouseBirthDate;
    bail.G2SpouseRg = data.G2SpouseRg;
    bail.G2SpouseCpf = data.G2SpouseCpf;
    bail.G2SpouseNationality = data.G2SpouseNationality;
    bail.G2SpouseProfession = data.G2SpouseProfession;
    bail.G2SpouseContact1 = data.G2SpouseContact1;
    bail.G2BailPropertyCep = data.G2BailPropertyCep;
    bail.G2BailPropertyCity = data.G2BailPropertyCity;
    bail.G2BailPropertyDistrict = data.G2BailPropertyDistrict;
    bail.G2BailPropertyAddress = data.G2BailPropertyAddress;
    bail.G2BailPropertyRegistrationNumber =
      data.G2BailPropertyRegistrationNumber;

    return this.bailRepository
      .save(bail)
      .then(() => {
        const msg = `Bail ${bail.bailCode} created as succesfily`;
        console.log(msg);

        return bail;
      })
      .catch((error) => {
        console.log(error.driverError.sqlMessage);

        throw new HttpException(
          error.driverError.sqlMessage,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
