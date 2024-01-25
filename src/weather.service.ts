
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

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

  @Injectable()
  export class WeatherService {
    private readonly apiKey: string = process.env.WEATHER_KEY;
    private readonly apiURL: string = 'https://api.openweathermap.org/data/2.5/weather';
    private readonly logger = new Logger(WeatherService.name)
    constructor(private readonly httpService: HttpService) {}

    async getCurrentWeather(city: string, units: string): Promise<WeatherResponse> {
      const params = { q: city, units: units, appid: this.apiKey };
      const { data } = await firstValueFrom(
        this.httpService.get<WeatherResponse>(this.apiURL, {params}).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
      );
      return data;
    }
  }