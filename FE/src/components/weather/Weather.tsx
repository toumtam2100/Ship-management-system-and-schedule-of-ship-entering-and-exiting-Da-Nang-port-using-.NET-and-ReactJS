import React, { useEffect, useState } from 'react';
import day from '@app/assets/animated/day.svg';
import rainy2 from '@app/assets/animated/rainy-2.svg';
import rainy3 from '@app/assets/animated/rainy-4.svg';
import rainy4 from '@app/assets/animated/rainy-5.svg';
import rainy5 from '@app/assets/animated/rainy-6.svg';
import night from '@app/assets/animated/night.svg';
import { useResponsive } from '@app/hooks/useResponsive';
import { WeeklyWeather } from './WeeklyWeather';

interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    rain: number[];
    is_day: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    rain_sum: number[];
    windspeed_10m_max: number[];
  };
}

export const Weather: React.FC<Record<string, never>> = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rain, setRain] = useState<number | null>(null);
  const [image, setImage] = useState(day);
  const [text, setText] = useState('Nắng to');

  const { isDesktop } = useResponsive();

  useEffect(() => {
    // Fetch weather data
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=16.0678&longitude=108.2208&hourly=temperature_2m,rain,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,windspeed_10m_max&current_weather=true&windspeed_unit=mph&timezone=auto',
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        // Calculate rain state based on fetched data
        if (data) {
          setRain(data.daily.rain_sum[0] * 10);
          if (data.daily.rain_sum[0] * 10 > 60) {
            setImage(rainy5);
            setText('Sấm sét');
          } else if (data.daily.rain_sum[0] * 10 > 40) {
            setImage(rainy4);
            setText('Nhiều mây');
          } else if (data.daily.rain_sum[0] * 10 > 20) {
            setImage(rainy3);
            setText('Nhiều mưa');
          } else if (data.daily.rain_sum[0] * 10 > 0) {
            setImage(rainy2);
            setText('Nắng nhẹ');
          } else {
            setImage(day);
            setText('Nắng to');
          }
          if (data.current_weather.is_day === 0) {
            setImage(night);
            setText('Tối');
          }
        }
      })
      .catch((error) => {
        setError('Lỗi truyền data. Vui lòng thử lại lần nữa');
        setLoading(false);
      });
    console.log(data);
  }, []);

  return (
    <>
      {isDesktop && (
        <>
          {data ? (
            <>
              <div
                style={{
                  background: 'linear-gradient(to bottom, rgb(43,50,178) 0%, rgb(20,136,204) 100%)',
                  color: 'white',
                  borderRadius: '1rem',
                }}
              >
                <div style={{ flexDirection: 'column' }}>
                  <h1 style={{ textTransform: 'uppercase', marginBottom: '0', color: 'white', marginLeft: '1rem' }}>
                    Đà Nẵng
                  </h1>
                  <text style={{ fontSize: '0.95rem', marginLeft: '1rem' }}>
                    {data.current_weather.time.slice(0, 10)}
                  </text>
                </div>
                <div style={{ justifyContent: 'space-between', display: 'flex', marginRight: '1rem' }}>
                  <img src={image} alt="Ảnh hiện tượng" style={{ width: '7.5em', scale: '1.8' }} />
                  <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '0', color: 'white', fontSize: '2.5em' }}>
                      {Math.round(data.current_weather.temperature)}&deg;
                    </h2>
                    <text style={{ textAlign: 'center' }}>{text}</text>
                  </div>
                  <div style={{ flexDirection: 'column' }}>
                    <div style={{ flexDirection: 'column', marginBottom: '0.5em', textAlign: 'center' }}>
                      <div>{Math.round(data.daily.temperature_2m_max[0])}&deg;</div>
                      <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Cao nhất</div>
                    </div>
                    <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                      <div>{Math.round(data.daily.temperature_2m_min[0])}&deg;</div>
                      <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Thấp nhất</div>
                    </div>
                  </div>
                  <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                    <div style={{ flexDirection: 'column', marginBottom: '0.5em' }}>
                      <div>{rain} mm</div>
                      <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Lượng mưa</div>
                    </div>
                    <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                      <div>{Math.round(data.current_weather.windspeed)}mph</div>
                      <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Tốc độ gió</div>
                    </div>
                  </div>
                  <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                    <div style={{ flexDirection: 'column', marginBottom: '0.5em' }}>
                      <div>{data.daily.sunrise[0].slice(-5)}</div>
                      <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Bình minh</div>
                    </div>
                    <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                      <div>{data.daily.sunset[0].slice(-5)}</div>
                      <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Hoàng hôn</div>
                    </div>
                  </div>
                </div>
                <div style={{ paddingBottom: '0.5rem' }}>
                  <h4
                    style={{
                      textTransform: 'uppercase',
                      marginBottom: '0',
                      color: 'rgba(255,255,255,0.6)',
                      marginLeft: '1rem',
                    }}
                  >
                    Trong 4 ngày tới
                  </h4>
                  <WeeklyWeather />
                </div>
              </div>
            </>
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <div>Đang tải thời tiết...</div>
          )}
        </>
      )}
    </>
  );
};
