import { fromJS } from 'immutable';

const initialState = fromJS({
  isFetchingWeather: false,
  data: {}
});

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_WEATHER_DATA':
      return state.set('data', fromJS(action.data));
    case 'SET_IS_FETCHING_WEATHER':
      return state.set('isFetchingWeather', action.isFetchingWeather);
    default:
      return state;
  }
};