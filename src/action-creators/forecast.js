export function setWeatherData(data) {
  return {
    type: 'SET_WEATHER_DATA',
    data
  }
}

export function setIsFetchingWeather(isFetchingWeather) {
  return {
    type: 'SET_IS_FETCHING_WEATHER',
    isFetchingWeather
  }
}

export function fetchWeather(lat, lng) {
  return dispatch => {
    dispatch(setIsFetchingWeather(true));
    const url = `/api/v1/weather?lat=${lat}&lng=${lng}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(setWeatherData(json));
        // simulate latency for better UX
        setTimeout(() => dispatch(setIsFetchingWeather(false)), 1000);
      });
  }
}