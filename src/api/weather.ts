import { ResponseJson } from '@/config/request';
import { request } from '@/utils/request';

export interface WeatherInfoProps {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
  temperature_float: string;
  humidity_float: string;
}

export function getWeatherInfo(): Promise<ResponseJson<WeatherInfoProps>> {
  return request({
    url: '/common/weatherInfo',
    method: 'get'
  });
}
