import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import { convertStringToInt } from './../utils/utils';
import iconMap from './../utils/icons';

import { fetchWeather, setIsFetchingWeather } from '/src/action-creators/forecast';
import { setSelectedPlace } from './../action-creators/google-maps';

//components
import GoogleAutocomplete from './GoogleAutocomplete.jsx!';
import BgLoader from './BgLoader.jsx!';

export const Result = React.createClass({

  componentWillMount() {
    const { selectedPlace } = this.props;
    if(!selectedPlace.size) {
      this.props.push('/weather/location');
    } else {
      const location = selectedPlace.getIn(['geometry', 'location']);
      this.props.fetchWeather(location.lat(), location.lng());
    }
  },

  render() {
    return <div className="weather">
      {this.props.isFetchingWeatherData ? this.renderLoadingScreen() : null}
      {this.props.weatherData.size ? this.renderWeatherData() : null}
    </div>
  },

  renderLoadingScreen() {
    return <div className="loading-screen">
      <i className="icon-sun icon-huge color-orange anim-rotate"></i>
    </div>
  },

  renderWeatherData() {
    const { weatherData } = this.props;
    const days = weatherData.getIn(['daily', 'data']);
    return <div>
      <div className="section-main">
        <GoogleAutocomplete onSelect={this.setSelectedPlace} inputClass="u-p- u-b0" />
      </div>
      <section className={`current bg-container u-pv++ text-center`}>
        <BgLoader blur={true} imgId="607" tint={true}>
          {this.renderCurrent()}
        </BgLoader>
      </section>
      <section className="section-main days">
        <ul className="list-bare">
          {days.take(5).map(day => this.renderDay(day))}
        </ul>
      </section>
    </div>
  },

  renderCurrent() {
    const { weatherData, selectedPlace } = this.props;
    const city = selectedPlace.getIn(['address_components', 0, 'long_name']);
    const state = selectedPlace.getIn(['address_components', 2, 'short_name']);
    const current = weatherData.get('currently');
    const icon = current.get('icon');

    return <div className="current__body">
      <div className="current__location">
        {city}, {state}
      </div>
      <div className="current__temp">
        <i className={`current__icon u-pr- ${iconMap[icon]}`} />
        {convertStringToInt(current.get('apparentTemperature'))} 
        <i className="current__degree-icon icon-degree-fahrenheit"></i>
      </div>
      <div className="current__summary">
        {current.get('summary')}
      </div>
    </div>
  },

  renderDay(day) {
    const time = day.get('time');
    const date = moment.unix(time);
    return <li key={time} className="day">
      <div className="day__of-week">
        {date.format('dddd')}
      </div>
      <div className="cf">
        <div className="float-left">
          <div className="cal-day cal-day--main">
            <div className="cal-day__header">
              {date.format('MMM')}
            </div>
            <div className="cal-day__body">
              {date.format('DD')}
            </div>
          </div>
        </div>
        <div className="float-left u-ml u-pr-- u-pv--">
          <i className="day__ hi-low-icon icon-caret-up"></i>
          {convertStringToInt(day.get('apparentTemperatureMax'))} 
          <i className="day__degree-icon icon-degree-fahrenheit"></i>
        </div>
        <div className="float-left u-pl-- u-pv--">
          <i className="day__ hi-low-icon icon-caret-down"></i>
          {convertStringToInt(day.get('apparentTemperatureMin'))}
          <i className="day__degree-icon icon-degree-fahrenheit"></i>
        </div>
        <div className="float-right">
          <i className={`day__icon ${iconMap[day.get('icon')]}`} />
        </div>
      </div>

    </li>
  },

  setSelectedPlace(place) {
    this.props.setIsFetchingWeather(true);
    this.props.setSelectedPlace(place);
    this.fetchWeather();
  },

  fetchWeather() {
    const { selectedPlace } = this.props;
    const location = selectedPlace.getIn(['geometry', 'location']);
    this.props.fetchWeather(location.lat(), location.lng());
  }
});

function mapStateToProps(state) {
  return {
    selectedPlace: state.googleMaps.get('selectedPlace'),
    weatherData: state.forecast.get('data'),
    isFetchingWeatherData: state.forecast.get('isFetchingWeather')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    fetchWeather,
    setIsFetchingWeather,
    setSelectedPlace
  }, dispatch);
}

export const ResultContainer = connect(mapStateToProps, mapDispatchToProps)(Result);