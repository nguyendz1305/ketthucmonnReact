import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import "./Weather.css";

interface WeatherData {
  name: string;
  weather: Array<{ icon: string; description: string }>;
  main: { temp: number; humidity: number };
}

const Weather = () => {
  const [city, setCity] = useState<string>(""); // Thành phố người dùng chọn
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Dữ liệu thời tiết
  const [error, setError] = useState<string>(""); // Thông báo lỗi
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải dữ liệu
  const [unit, setUnit] = useState<"metric" | "imperial">("metric"); // Đơn vị Celsius (metric) hoặc Fahrenheit (imperial)
  const [isWeatherFetched, setIsWeatherFetched] = useState<boolean>(false); // Kiểm tra dữ liệu đã được lấy chưa

  const API_KEY = "973fff3498ae9327464ee9d4138e5f7c";
  const cities = [
    "Athens", // Hy Lạp
    "Bangkok", // Thái Lan
    "Barcelona", // Tây Ban Nha
    "Beijing", // Trung Quốc
    "Berlin", // Đức
    "Buenos Aires", // Argentina
    "Cairo", // Ai Cập
    "Cape Town", // Nam Phi
    "Chicago", // Mỹ
    "Dubai", // UAE
    "Hanoi", //VietNam
    "Hong Kong", // Hồng Kông
    "Istanbul", // Thổ Nhĩ Kỳ
    "Jakarta", // Indonesia
    "Kuala Lumpur", // Malaysia
    "Lagos", // Nigeria
    "London", // Anh
    "Los Angeles", // Mỹ
    "Madrid", // Tây Ban Nha
    "Mexico City", // Mexico
    "Moscow", // Nga
    "Mumbai", // Ấn Độ
    "New York", // Mỹ
    "Paris", // Pháp
    "Rio de Janeiro", // Brazil
    "Rome", // Ý
    "San Francisco", // Mỹ
    "Seoul", // Hàn Quốc
    "Shanghai", // Trung Quốc
    "Singapore", // Singapore
    "Sydney", // Úc
    "Tokyo", // Nhật Bản
    "Toronto", // Canada
  ];

  // Hàm làm tròn kết quả đến 1 chữ số thập phân
  const roundToOneDecimal = (value: number) => {
    return Math.round(value * 10) / 10;
  };

  // Hàm để lấy dữ liệu thời tiết từ API
  const fetchWeather = async () => {
    if (!city) {
      setError("Vui lòng chọn một thành phố!");
      return;
    }

    setLoading(true);
    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}&lang=vi`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Không tìm thấy thành phố! Vui lòng kiểm tra lại.");
        }
        throw new Error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }

      const data = await response.json();
      setWeatherData(data);
      setIsWeatherFetched(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
      setWeatherData(null);
      setIsWeatherFetched(false);
    } finally {
      setLoading(false);
    }
  };

  // Hàm chuyển đổi đơn vị khi nhấn vào "Chuyển sang °F" hoặc "Chuyển sang °C"
  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  // Hàm lấy biểu tượng thời tiết tương ứng
  const getIcon = (icon: string) => {
    switch (icon) {
      case "01d":
        return <FontAwesomeIcon icon={faSun} className="weather-icon" />;
      case "02d":
      case "02n":
        return <FontAwesomeIcon icon={faCloudSun} className="weather-icon" />;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <FontAwesomeIcon icon={faCloud} className="weather-icon" />;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return <FontAwesomeIcon icon={faCloudRain} className="weather-icon" />;
      case "13d":
      case "13n":
        return <FontAwesomeIcon icon={faSnowflake} className="weather-icon" />;
      default:
        return <FontAwesomeIcon icon={faCloud} className="weather-icon" />;
    }
  };

  // Hàm xử lý khi thay đổi thành phố
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setWeatherData(null); // Reset dữ liệu thời tiết
    setIsWeatherFetched(false); // Reset trạng thái đã lấy dữ liệu
  };

  useEffect(() => {
    // Khi người dùng chọn thành phố, mặc định sẽ lấy dữ liệu với Celsius (°C)
    if (city) {
      fetchWeather();
    }
  }, [city, unit]); // Khi thay đổi city hoặc unit, sẽ cập nhật lại dữ liệu thời tiết

  return (
    <div className="weather-container">
      <h1>Ứng Dụng Thời Tiết</h1>

      <select
        value={city}
        onChange={handleCityChange} // Gọi hàm khi thay đổi thành phố
        className="city-dropdown"
      >
        <option value="">Chọn thành phố</option>
        {cities.map((cityName, index) => (
          <option key={index} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      <div className="button-group">
        <button onClick={fetchWeather} className="weather-button">
          {loading ? "Đang tải..." : "Lấy thời tiết"}
        </button>
        {isWeatherFetched && (
          <button onClick={toggleUnit} className="weather-button">
            Chuyển sang {unit === "metric" ? "°F" : "°C"}
          </button>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <div className="weather-condition">
            {getIcon(weatherData.weather[0].icon)}
            <p>
              Nhiệt độ:{" "}
              <span>
                {unit === "metric"
                  ? roundToOneDecimal(weatherData.main.temp)
                  : roundToOneDecimal(weatherData.main.temp)}{" "}
                {unit === "metric" ? "°C" : "°F"}
              </span>
            </p>
            <p>
              Độ ẩm: <span>{weatherData.main.humidity}%</span>
            </p>
            <p>
              Tình trạng: <span>{weatherData.weather[0].description}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
