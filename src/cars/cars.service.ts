import { Car, NewCarDto, carUpdateDto } from './car.model';
import {
  Injectable,
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car) private carModel: typeof Car) {}

  async create(payload: NewCarDto): Promise<Car> {
    await this.ensureUniqueVin(payload.vin, undefined);
    const car = new this.carModel(payload);
    await car.save();
    return car;
  }

  async findAll(): Promise<Car[]> {
    return this.carModel.findAll();
  }

  async findOne(id: number): Promise<Car> {
    return this.findById(id);
  }

  async update(id: number, payload: carUpdateDto): Promise<Car> {
    const car = await this.findById(id);
    if (payload.vin) {
      await this.ensureUniqueVin(payload.vin, id);
    }
    car.update(payload);
    return car;
  }

  async remove(id: number): Promise<void> {
    const car = await this.findById(id);
    await car.destroy();
  }

  private async findCarByVin(vin: string): Promise<Car> {
    const car = await this.carModel.findOne({ where: { vin } });
    return car;
  }

  private async ensureUniqueVin(vin: string, id: any): Promise<any> {
    const car = await this.findCarByVin(vin);
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

  private async findById(id: number): Promise<Car> {
    const car = await this.carModel.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException();
    }

    return car;
  }
}
