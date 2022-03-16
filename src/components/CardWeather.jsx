const CardWeather = ({
  city,
  current_date,
  current_temp,
  weather_icon,
  weather_info,
  description,
  last_weathers,
  isLoading,
  maxHumidity,
}) => {
  const maxHumidityFunc = () => {
    const arr_humidity = [];

    last_weathers.forEach((w) => {
      arr_humidity.push(w.humidity);
    });

    const max_humidity = Math.max(...arr_humidity);

    return max_humidity;
  };

  return (
    <div className="col-md-4 h-100 mb-5">
      <div className="card text-white text-center bordder-0 h-100">
        <div
          style={{
            backgroundImage: `url(https://source.unsplash.com/600x900/?${weather_info})`,
            backgroundSize: '100%'
          }}
        >
          <div className="bg-dark bg-opacity-50 py-3 border-primary">
            <h2 className="card-title">{city === "" ? "Monterrey" : city}</h2>
            <p className="card-text lead">{current_date}</p>
            <hr />
            <i className={`fas ${weather_icon} fa-4x`}></i>
            <h1 className="fw-bolder mb-3">{current_temp} &deg;C</h1>
            <p className="lead fw-bolder mb-3">{description}</p>
            {isLoading ? (
              <div className="text-blue">Cargando... </div>
            ) : (
              <ul>
                {last_weathers.map((item) => {
                  const red =
                    item.humidity === maxHumidityFunc() ? "text-warning" : "";

                  return (
                    <li className={`small ${red}`} key={item.date}>
                      {item.date} | Min : {item.temp_min} &deg;C | Max :{" "}
                      {item.temp_max} &deg;C
                      <br />
                      Humidity : {item.humidity} % Max_week: {maxHumidityFunc()}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWeather;
