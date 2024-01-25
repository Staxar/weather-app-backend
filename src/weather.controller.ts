import { Controller, Get, Param, Query } from "@nestjs/common";
import { WeatherService } from "./weather.service";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}


@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get(':city')
  getCityWeather(@Param('city') city: string, @Query('units') units?: string): Promise<WeatherResponse> {
    return this.weatherService.getCurrentWeather(city, units)
  }
}