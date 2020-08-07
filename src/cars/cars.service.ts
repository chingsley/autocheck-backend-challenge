import { Car, NewCarDto, carUpdateDto } from './car.model';
import {
  Injectable,
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from '../sales/sale.model';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car) private carModel: typeof Car) {}

  async create(payload: NewCarDto): Promise<Car> {
    await this.ensureUniqueVin(payload.vin, undefined);
    const car = new this.carModel(payload);
    await car.save();
    return car;
  }

  findAll(): Promise<Car[]> {
    return this.carModel.findAll({ where: {}, include: [Sale] });
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.findBy('id', id);
    if (!car) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `a car matches the id of ${id}`,
        },
        HttpStatus.CONFLICT,
      );
    }

    return car;
  }

  async update(id: number, payload: carUpdateDto): Promise<Car> {
    const car = await this.findOne(id);
    if (payload.vin) {
      await this.ensureUniqueVin(payload.vin, id);
    }
    car.update(payload);
    return car;
  }

  async remove(id: number): Promise<void> {
    const car = await this.findOne(id);
    await car.destroy();
  }

  private findBy(field: string, value: number | string) {
    return this.carModel.findOne({
      where: { [field]: value },
      include: [Sale],
    });
  }

  private async ensureUniqueVin(vin: string, id: any): Promise<any> {
    const car = await this.findBy('vin', vin);
    if (car && car.id !== id) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `a car with vin: ${vin} already exists. Duplicate vin is not allowed`,
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
