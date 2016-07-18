export function hasLoadedMaps() {
  return { type: 'HAS_LOADED_MAPS' }
}

export function setSelectedPlace(place) {
  return {
    type: 'SET_SELECTED_PLACE',
    place
  }
}