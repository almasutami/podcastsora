import Head from "next/head";
import Toolbar from "./toolbar";
import styles from "../styles/Home.module.css";
import conditionCodes from "./conditionCode.json";
import { useState, useEffect, lazy, Suspense } from "react";

const corsProxy = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://api.weatherapi.com/v1/";

export default function Home() {
  const [query, setQuery] = useState("");
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [locationListLoading, setLocationListLoading] = useState(false);

  const defaultLocation = "Bandung";

  useEffect(() => {
    const delay = 500;
    const timerId = setTimeout(() => {
      if (query !== "") {
        fetchAutocompleteData(query);
      } else {
        fetchData(defaultLocation);
        fetchForecastData(defaultLocation);
      }
    }, delay);

    return () => clearTimeout(timerId);
  }, [query, defaultLocation]);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const handleLocationSelect = (locationLatLong: string) => {
    if (locationLatLong === "") {
      fetchData(defaultLocation);
      fetchForecastData(defaultLocation);
    } else {
      fetchData(locationLatLong);
      fetchForecastData(locationLatLong);
    }
  };

  const fetchData = async (location: string) => {
    setLoading(true);
    const response = await fetch(
      `${corsProxy}${apiUrl}current.json?key=77392728de4d437791691053231810&q=${location}`
    );
    const data = await response.json();
    setCurrentWeatherData(data);
    setLoading(false);
  };

  const fetchAutocompleteData = async (query: string) => {
    setLocationListLoading(true);
    const response = await fetch(
      `${corsProxy}${apiUrl}search.json?key=77392728de4d437791691053231810&q=${query}`
    );
    const data = await response.json();
    setLocationList(data);
    setLocationListLoading(false);
  };

  const fetchForecastData = async (location: string) => {
    setForecastLoading(true);
    const response = await fetch(
      `${corsProxy}${apiUrl}forecast.json?key=77392728de4d437791691053231810&q=${location}&days=3`
    );
    const data = await response.json();
    if (!data?.error) {
      setForecastWeatherData(data);
    }
    setForecastLoading(false);
  };

  const today = new Date();
  const day = () => {
    switch (today.getDay()) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "";
    }
  };
  const date = () => {
    if (today.getDate() < 10) {
      return "0" + today.getDate();
    } else {
      return today.getDate();
    }
  };
  const month = () => {
    if (today.getMonth() + 1 < 10) {
      return "0" + today.getMonth() + 1;
    } else {
      return today.getMonth() + 1;
    }
  };
  const year = today.getFullYear();
  const hour = () => {
    if (today.getHours() < 10) {
      return "0" + today.getHours();
    } else {
      return today.getHours();
    }
  };
  const minute = () => {
    if (today.getMinutes() < 10) {
      return "0" + today.getMinutes();
    } else {
      return today.getMinutes();
    }
  };
  const greetings = () => {
    if (today.getHours() < 12) {
      return "Morning";
    } else if (today.getHours() < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  };

  const renderIconPathAndMessage = (conditionCode: string) => {
    let dayNight = "day";
    if (today.getHours() > 18 || today.getHours() < 6) {
      dayNight = "night";
    }

    let iconPath = "";
    let message = "";
    if (dayNight === "day") {
      iconPath = conditionCodes.find(
        (condition) => condition.code.toString() === conditionCode?.toString()
      )?.dayIconPath;
      message = conditionCodes.find(
        (condition) => condition.code.toString() === conditionCode?.toString()
      )?.dayMessage;
    } else if (dayNight === "night") {
      iconPath = conditionCodes.find(
        (condition) => condition.code.toString() === conditionCode?.toString()
      )?.nightIconPath;
      message = conditionCodes.find(
        (condition) => condition.code.toString() === conditionCode?.toString()
      )?.nightMessage;
    }
    return { icon: iconPath, message: message };
  };

  const reformatyyyy_mm_dd = (date: string) => {
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return `${day}/${month}`;
  };

  const renderForecast = () => {
    if (forecastLoading)
      return <div className={styles.loading}>Loading...</div>;
    const threeDaysForecastData = forecastWeatherData?.forecast?.forecastday;

    return (
      <div className={styles.forecastContainer}>
        {threeDaysForecastData?.map((item, index) => (
          <div key={index} className={styles.forecastRow}>
            <div>{reformatyyyy_mm_dd(item?.date)}</div>
            <div>
              <img
                className={styles.forecastIcon}
                src={renderIconPathAndMessage(item?.day?.condition?.code)?.icon}
                alt={item?.day?.condition?.text}
              />
            </div>
            <div>
              {item?.day?.mintemp_c?.toFixed(0)}&deg;C /{" "}
              {item?.day?.maxtemp_c?.toFixed(0)}&deg;C
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGreetings = () => {
    if (loading) {
      return (
        <>
          <div className={styles.greetings}>
            <div
              className={styles.skeleton}
              style={{ width: "100px", height: "20px" }}
            ></div>
          </div>
          <div className={styles.words}>
            <div
              className={styles.skeleton}
              style={{ width: "100px", height: "20px" }}
            ></div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className={styles.greetings}>
          <div>Good</div>
          <div>{greetings()}!</div>
        </div>
        <div className={styles.words}>
          {
            renderIconPathAndMessage(
              currentWeatherData?.current?.condition?.code
            )?.message
          }
        </div>
      </>
    );
  };

  const renderIcon = () => {
    if (loading)
      return (
        <div>
          <div
            className={styles.skeleton}
            style={{ width: "100px", height: "200px" }}
          ></div>
        </div>
      );
    return (
      <div>
        <img
          className={styles.landingIcon}
          src={
            renderIconPathAndMessage(
              currentWeatherData?.current?.condition?.code
            )?.icon
          }
          alt={currentWeatherData?.current?.condition?.text}
        />
      </div>
    );
  };

  const renderTemperature = () => {
    if (loading)
      return (
        <>
          <div>
            <div className={styles.currentTemperature}>
              <div
                className={styles.skeleton}
                style={{ width: "100px", height: "20px" }}
              ></div>
            </div>
            <div className={styles.condition}>
              <div
                className={styles.skeleton}
                style={{ width: "100px", height: "20px" }}
              ></div>{" "}
              <div
                className={styles.skeleton}
                style={{ width: "100px", height: "20px" }}
              ></div>
            </div>
          </div>
          <div>
            <div
              className={styles.skeleton}
              style={{ width: "100px", height: "20px" }}
            ></div>{" "}
            <div
              className={styles.skeleton}
              style={{ width: "100px", height: "20px" }}
            ></div>
          </div>
        </>
      );
    return (
      <>
        <div>
          <div className={styles.currentTemperature}>
            {currentWeatherData?.current?.temp_c?.toFixed(0)}&deg;C
          </div>
          <div className={styles.condition}>
            <div>
              {"Feels like "}
              {currentWeatherData?.current?.feelslike_c?.toFixed(0)}&deg;C
            </div>
            <div>{currentWeatherData?.current?.condition?.text}</div>
          </div>
        </div>
        <div>
          <div>
            {currentWeatherData?.location?.name},{" "}
            {currentWeatherData?.location?.country}
          </div>
          <div>
            {day()}, {date()}/{month()}/{year} {hour()}:{minute()}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Podcastsora</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main>
        <div className={styles.toolbarContainer}>
          <Toolbar
            onSearch={handleSearch}
            onLocationSelect={handleLocationSelect}
            locationList={locationList}
            locationListLoading={locationListLoading}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.greetingsContainer}>{renderGreetings()}</div>
          <div className={styles.landingIconContainer}>{renderIcon()}</div>
          <div className={styles.sideContainer}>
            <div className={styles.temperatureLocation}>
              {renderTemperature()}
            </div>
            <div className={styles.forecast}>
              <div className={styles.forecastTitle}>
                {forecastLoading ? "" : "3 Days Forecast"}
              </div>
              <div>{renderForecast()}</div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          height: 100%;
          width: 100%;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
