import { fromJS } from 'immutable';

const initialState = fromJS({
  hasLoadedMaps: false,
  selectedPlace: {},
  locationSearchResult: []
});

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'HAS_LOADED_MAPS':
      return state.set('hasLoadedMaps', true);
    case 'SET_SELECTED_PLACE':
      return state.set('selectedPlace', fromJS(action.place));
    default:
      return state;
  }
};