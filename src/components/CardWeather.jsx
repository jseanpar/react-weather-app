const CardWeather = ({city, current_date, current_temp, weather_icon, weather_info, description, last_weathers, isLoading, maxHumidity}) => {
  
  const arr_humidity = [];
  for (const i of last_weathers){
    arr_humidity.push(i.humidity);
  }
  const max_humidity = Math.max(...arr_humidity)

  
  return (
    <div className="col-md-4">
    <div className="card text-white text-center bordder-0">
      <img
        src={`https://source.unsplash.com/600x900/?${weather_info}`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-img-overlay">
        <div className="bg-dark bg-opacity-50 py-3">
          <h2 className="card-title">
            {city === "" ? "Monterrey" : city}
          </h2>
          <p className="card-text lead">{ current_date }</p>
          <hr />
          <i className={`fas ${weather_icon} fa-4x`}></i>
          <h1 className="fw-bolder mb-3">{current_temp} &deg;C</h1>
          <p className="lead fw-bolder mb-3">{description}</p>
          {isLoading ? (
            <div className="text-blue">Cargando... </div>
          ) : (
            <ul>
              {last_weathers.map((item) => {
                const red = item.humidity === max_humidity ? 'text-danger' : '';
  
              return <li className={`small ${red}` } key={item.date}>
                  {item.date} |
                  Min : {item.temp_min} &deg;C 
                  |
                  Max : {item.temp_max} &deg;C
                  <br />
                  Humidity : {item.humidity} %
                  Max_week: {max_humidity}
                </li>
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardWeather