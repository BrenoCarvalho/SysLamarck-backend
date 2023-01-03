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
    bail.fullNameG2 = data.fullNameG2;
    bail.birthDateG2 = data.birthDateG2;
    bail.rgG2 = data.rgG2;
    bail.cpfG2 = data.cpfG2;
    bail.nationalityG2 = data.nationalityG2;
    bail.maritalStatusG2 = data.maritalStatusG2;
    bail.professionG2 = data.professionG2;
    bail.emailG2 = data.emailG2;
    bail.contact1G2 = data.contact1G2;
    bail.contact2G2 = data.contact2G2;
    bail.cepG2 = data.cepG2;
    bail.cityG2 = data.cityG2;
    bail.districtG2 = data.districtG2;
    bail.addressG2 = data.addressG2;
    bail.SpouseFullNameG2 = data.SpouseFullNameG2;
    bail.SpouseBirthDateG2 = data.SpouseBirthDateG2;
    bail.SpouseRgG2 = data.SpouseRgG2;
    bail.SpouseCpfG2 = data.SpouseCpfG2;
    bail.SpouseNationalityG2 = data.SpouseNationalityG2;
    bail.SpouseProfessionG2 = data.SpouseProfessionG2;
    bail.SpouseContact1G2 = data.SpouseContact1G2;
    bail.BailPropertyCepG2 = data.BailPropertyCepG2;
    bail.BailPropertyCityG2 = data.BailPropertyCityG2;
    bail.BailPropertyDistrictG2 = data.BailPropertyDistrictG2;
    bail.BailPropertyAddressG2 = data.BailPropertyAddressG2;
    bail.BailPropertyRegistrationNumberG2 =
      data.BailPropertyRegistrationNumberG2;

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
