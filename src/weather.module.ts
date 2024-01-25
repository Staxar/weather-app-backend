import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [WeatherService]
})
export class WeatherModule {}