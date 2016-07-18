import React from 'react';

export default React.createClass({

  getInitialState() {
    return {
      autocomplete: null
    }
  },

  componentDidMount() {
    const autocomplete = new google.maps.places.Autocomplete(this.refs.input);
    google.maps.event.addListener(autocomplete, 'place_changed', this.onPlaceChange);
    this.setState({ autocomplete });
  },

  onPlaceChange() {
    const { autocomplete } = this.state;
    const place = autocomplete.getPlace();
    if(place.hasOwnProperty('geometry')) {
      this.props.onSelect(place);
    }
  },

  render() {
    const { inputClass, placeholder } = this.props;
    const className = `u-1/1 ${inputClass}`;
    const _placeholder = placeholder || "Choose a city";
    return <div className="google-autocomplete">
      <input ref="input" type="text" className={className} placeholder={_placeholder} />
    </div>
  }
});