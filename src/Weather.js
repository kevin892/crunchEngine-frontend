import React from 'react'
import './Weather.css'

class Weather extends React.Component {

  state = {
    options: {
      timeout: 10000,
      maximumAge: 0,
      enableHighAccuracy: true
    },
    lat: '',
    long: '',
    details: [],
    icon: '',
    weather: '',
    temp: '',
    city: ''
  }

  handleTemp = (temp) => {
    return Math.round(1.8 * (temp - 273) + 32)
  }
  setUp = (details) => {

    return (<div>
      <span>{this.handleTemp(details.main.temp)}
       <span className='degree-icon'>𝇈</span></span>
      <br/> {details.name}
    </div>)
  }

  handleDisplay = (details) => {
    if (details.length !== 0) {
      switch (details.weather[0].description) {
        case 'scattered clouds':
        case 'broken clouds':
        case 'few clouds':
          return <div><span className='weather-icon'>🌥</span>{this.setUp(details)}
          </div>
          break;
        case 'clear sky':
          return <div><span className='weather-icon'>☀️</span><span>{this.setUp(details)}</span>
          </div>
          break;
        case 'shower rain' || 'rain' || 'mist':
          return <div><span className='weather-icon'>🌧</span>{this.setUp(details)}
          </div>
          break;
        case 'snow':
          return <div><span className='weather-icon'>❄️</span>{this.setUp(details)}
          </div>
          break;
        case 'thunderstorm':
          return <div><span className='weather-icon'>🌩</span>{this.setUp(details)}
          </div>
          break;
        default:
          return <div>"Location Unavailable"</div>

      }
    } else {
      return <span uk-spinner="ratio: 2"></span>
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.success, this.error, this.state.options)
  }

  async getWeather(lat, long) {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=a86199c36da2becc90412a9cfee0f89c`, {method: 'GET'})
      const result = await response.json()
      this.setState({details: result})

    } catch (error) {
      console.log(error.message);
    }
  }

  success = (pos) => {
    let crd = pos.coords;
    this.setState({lat: crd.latitude})
    this.setState({long: crd.longitude})
    this.getWeather(this.state.lat, this.state.long)
  }

  error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  render() {

    return (<div className="weather-div">
      {this.handleDisplay(this.state.details)}
    </div>)
  }

}

export default Weather
