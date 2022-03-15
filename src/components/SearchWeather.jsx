import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
import CardWeather from "./CardWeather";
moment.locale("es");
const now = moment();
const now_current = moment();

function SearchWeather() {
  const [search, setSearch] = useState("Monterrey");
  const [dataList, setdataList] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const instance = axios.create({
        baseURL: `https://search.reservamos.mx/api/v2/places?q=${input}`,
      });

      const resp = await instance.get();

      if (componentMounted) {
        const lat = resp.data[0].lat;
        const lon = resp.data[0].long;
        //const appid = "5f530e3abd64193a00da67391d0a0f24";
        const appid = "a5a47c18197737e8eeca634cd6acb581";
        const lang = "es";
        const units = "metric";

        const instance = axios.create({
          baseURL: `https://api.openweathermap.org/data/2.5/onecall`,
          params: { appid, lat, lon, lang, units },
        });
        const response = await instance.get();
        console.log(response);

        const arr_weather = [];
        let ob = {};
        //fechas iterables
        for (const t of response.data.daily) {
          ob = {
            date: now.add(1, "days").format("L"),
            temp_min: t.temp.min,
            temp_max: t.temp.max,
            humidity: t.humidity
          };
          arr_weather.push(ob);
        }
        //current
        const weather_info = {
          city: input,
          current_date: now_current.format("LLLL"),
          current_temp: response.data.current.temp,
          weather_icon: setIcon(response.data.current.weather[0].main),
          weather_info: response.data.current.weather[0].main,
          description: response.data.current.weather[0].description,
          last_weathers: arr_weather,
        };

        setdataList([...dataList, weather_info]);
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };

  const setIcon = (weather_icon) => {
    switch (weather_icon) {
      case 'Clouds':
        weather_icon = 'fa-cloud';
        break;
      case 'Thunderstorm':
        weather_icon = 'fa-bolt';
        break;
      case 'Drizzle':
        weather_icon = 'fa-cloud-rain';
        break;
      case 'Rain':
        weather_icon = 'fa-cloud-shower-heavy';
        break;
      case 'Snow':
        weather_icon = 'fa-snow-flake';
        break;
      default:
        weather_icon = 'fa-smog';
    }
    return weather_icon
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4 w-75 mx-auto">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search city"
                  aria-label="Search city"
                  aria-describedby="basic-addon2"
                  name="search"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="input-group-text"
                  id="basic-addon2"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-center">
          {dataList.map((card, index) => {
            return <CardWeather key={index} {...card} isLoading={isLoading} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchWeather;
