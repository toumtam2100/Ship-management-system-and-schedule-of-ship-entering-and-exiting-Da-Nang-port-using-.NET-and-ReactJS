import React, { useEffect, useState } from 'react';
import day from '@app/assets/animated/day.svg';
import rainy2 from '@app/assets/animated/rainy-2.svg';
import rainy3 from '@app/assets/animated/rainy-4.svg';
import rainy4 from '@app/assets/animated/rainy-5.svg';
import rainy5 from '@app/assets/animated/rainy-6.svg';
import { useResponsive } from '@app/hooks/useResponsive';
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

export const WeeklyWeather: React.FC<Record<string, never>> = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rain1, setRain1] = useState<number | null>(null);
  const [rain2, setRain2] = useState<number | null>(null);
  const [rain3, setRain3] = useState<number | null>(null);
  const [rain4, setRain4] = useState<number | null>(null);
  const [image, setImage] = useState(day);
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
          setRain1(data.daily.rain_sum[1] * 10);
          if (data.daily.rain_sum[1] * 10 > 60) {
            setImage(rainy5);
          } else if (data.daily.rain_sum[1] * 10 > 40) {
            setImage(rainy4);
          } else if (data.daily.rain_sum[1] * 10 > 20) {
            setImage(rainy3);
          } else if (data.daily.rain_sum[1] * 10 > 0) {
            setImage(rainy2);
          } else {
            setImage(day);
          }
        }
        if (data) {
          setRain2(data.daily.rain_sum[1] * 10);
          if (data.daily.rain_sum[1] * 10 > 60) {
            setImage(rainy5);
          } else if (data.daily.rain_sum[1] * 10 > 40) {
            setImage(rainy4);
          } else if (data.daily.rain_sum[1] * 10 > 20) {
            setImage(rainy3);
          } else if (data.daily.rain_sum[1] * 10 > 0) {
            setImage(rainy2);
          } else {
            setImage(day);
          }
        }
        if (data) {
          setRain3(data.daily.rain_sum[1] * 10);
          if (data.daily.rain_sum[1] * 10 > 60) {
            setImage(rainy5);
          } else if (data.daily.rain_sum[1] * 10 > 40) {
            setImage(rainy4);
          } else if (data.daily.rain_sum[1] * 10 > 20) {
            setImage(rainy3);
          } else if (data.daily.rain_sum[1] * 10 > 0) {
            setImage(rainy2);
          } else {
            setImage(day);
          }
        }
        if (data) {
          setRain4(data.daily.rain_sum[1] * 10);
          if (data.daily.rain_sum[1] * 10 > 60) {
            setImage(rainy5);
          } else if (data.daily.rain_sum[1] * 10 > 40) {
            setImage(rainy4);
          } else if (data.daily.rain_sum[1] * 10 > 20) {
            setImage(rainy3);
          } else if (data.daily.rain_sum[1] * 10 > 0) {
            setImage(rainy2);
          } else {
            setImage(day);
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
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(0,0,0,0.20)',
                  margin: '0 10px 10px 10px',
                }}
              >
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{data.daily.time[1].slice(0, 4)}</div>
                  <div style={{ fontSize: '0.88em', color: 'rgba(255,255,255,0.6)' }}>
                    {data.daily.time[1].slice(-5)}
                  </div>
                </div>
                <img src={image} alt="Ảnh hiện tượng" style={{ width: '4.5em', scale: '1.6' }} />
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.temperature_2m_min[1])}&deg;</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Thấp nhất</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.temperature_2m_max[1])}&deg;</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Cao nhất</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{rain1} mm</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Lượng mưa</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.windspeed_10m_max[1])}mph</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Tốc độ gió</div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(0,0,0,0.20)',
                  margin: '0 10px 10px 10px',
                }}
              >
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{data.daily.time[2].slice(0, 4)}</div>
                  <div style={{ fontSize: '0.88em', color: 'rgba(255,255,255,0.6)' }}>
                    {data.daily.time[2].slice(-5)}
                  </div>
                </div>
                <img src={image} alt="Ảnh hiện tượng" style={{ width: '4.5em', scale: '1.6' }} />
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.temperature_2m_min[2])}&deg;</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Thấp nhất</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.temperature_2m_max[2])}&deg;</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Cao nhất</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{rain2} mm</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Lượng mưa</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.windspeed_10m_max[2])}mph</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Tốc độ gió</div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(0,0,0,0.20)',
                  margin: '0 10px 10px 10px',
                }}
              >
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{data.daily.time[3].slice(0, 4)}</div>
                  <div style={{ fontSize: '0.88em', color: 'rgba(255,255,255,0.6)' }}>
                    {data.daily.time[3].slice(-5)}
                  </div>
                </div>
                <img src={image} alt="Ảnh hiện tượng" style={{ width: '4.5em', scale: '1.6' }} />
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.temperature_2m_min[3])}&deg;</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Thấp nhất</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.temperature_2m_max[3])}&deg;</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Cao nhất</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{rain3} mm</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Lượng mưa</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.windspeed_10m_max[3])}mph</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Tốc độ gió</div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(0,0,0,0.20)',
                  margin: '0 10px 10px 10px',
                }}
              >
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{data.daily.time[4].slice(0, 4)}</div>
                  <div style={{ fontSize: '0.88em', color: 'rgba(255,255,255,0.6)' }}>
                    {data.daily.time[4].slice(-5)}
                  </div>
                </div>
                <img src={image} alt="Ảnh hiện tượng" style={{ width: '4.5em', scale: '1.6' }} />
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.temperature_2m_min[4])}&deg;</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Thấp nhất</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.temperature_2m_max[4])}&deg;</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Cao nhất</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{rain4} mm</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Lượng mưa</div>
                </div>
                <div style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div>{Math.round(data.daily.windspeed_10m_max[4])}mph</div>
                  <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.6)' }}>Tốc độ gió</div>
                </div>
              </div>
            </>
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <div>Thời tiết 4 ngày sẽ cập nhật sớm nhất</div>
          )}
        </>
      )}
    </>
  );
};
