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
    bail.warrantyTerm = data?.warrantyTerm;
    bail.capitalizationTitle = data?.capitalizationTitle;
    bail.fullNameG1 = data.fullNameG1;
    bail.birthDateG1 = data.birthDateG1;
    bail.rgG1 = data.rgG1;
    bail.cpfG1 = data.cpfG1;
    bail.nationalityG1 = data.nationalityG1;
    bail.maritalStatusG1 = data.maritalStatusG1;
    bail.professionG1 = data.professionG1;
    bail.emailG1 = data.emailG1;
    bail.contact1G1 = data.contact1G1;
    bail.contact2G1 = data.contact2G1;
    bail.cepG1 = data.cepG1;
    bail.cityG1 = data.cityG1;
    bail.districtG1 = data.districtG1;
    bail.addressG1 = data.addressG1;
    bail.spouseFullNameG1 = data.spouseFullNameG1;
    bail.spouseBirthDateG1 = data.spouseBirthDateG1;
    bail.spouseRgG1 = data.spouseRgG1;
    bail.spouseCpfG1 = data.spouseCpfG1;
    bail.spouseNationalityG1 = data.spouseNationalityG1;
    bail.spouseProfessionG1 = data.spouseProfessionG1;
    bail.spouseContact1G1 = data.spouseContact1G1;
    bail.bailPropertyCepG1 = data.bailPropertyCepG1;
    bail.bailPropertyCityG1 = data.bailPropertyCityG1;
    bail.bailPropertyDistrictG1 = data.bailPropertyDistrictG1;
    bail.bailPropertyAddressG1 = data.bailPropertyAddressG1;
    bail.bailPropertyRegistrationNumberG1 =
      data.bailPropertyRegistrationNumberG1;
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
    bail.spouseFullNameG2 = data.spouseFullNameG2;
    bail.spouseBirthDateG2 = data.spouseBirthDateG2;
    bail.spouseRgG2 = data.spouseRgG2;
    bail.spouseCpfG2 = data.spouseCpfG2;
    bail.spouseNationalityG2 = data.spouseNationalityG2;
    bail.spouseProfessionG2 = data.spouseProfessionG2;
    bail.spouseContact1G2 = data.spouseContact1G2;
    bail.bailPropertyCepG2 = data.bailPropertyCepG2;
    bail.bailPropertyCityG2 = data.bailPropertyCityG2;
    bail.bailPropertyDistrictG2 = data.bailPropertyDistrictG2;
    bail.bailPropertyAddressG2 = data.bailPropertyAddressG2;
    bail.bailPropertyRegistrationNumberG2 =
      data.bailPropertyRegistrationNumberG2;

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
