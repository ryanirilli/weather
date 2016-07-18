import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import GoogleAutocomplete from './GoogleAutocomplete.jsx!';
import BgLoader from './BgLoader.jsx!';

import { setSelectedPlace } from './../action-creators/google-maps';

const quotes = [
  'Wherever you go, no matter what the weather, always bring your own sunshine.',
  'A change in the weather is sufficient to recreate the world and ourselves.',
  'The storm starts, when the drops start dropping. When the drops stop dropping then the storm starts stopping.',
  'The wizards were good at wind, weather being a matter not of force but of lepidoptery. As Archchancellor Ridcully said, you just had to know where the damn butterflies were.'
];

export const Location = React.createClass({
  render() {
    return <BgLoader imgId="634">
        <section className="section-main u-mt++ palm-mt box u-pv u-ph+ palm-ph">
          <div className="text-center">
            <p className="quote">
              {this.getQuote()}
            </p>
          </div>
          <div className="u-ph u-mt+ u-pb+ palm-ph0">
            <GoogleAutocomplete 
              onSelect={this.setSelectedPlace} 
              inputClass="fancy-field-large"
              placeholder="Check the weather in your city"
            />
          </div>
      </section>
    </BgLoader>
  },

  setSelectedPlace(place) {
    this.props.setSelectedPlace(place);
    this.props.push('/weather');
  },

  getQuote() {
    return quotes[Math.floor(Math.random()*quotes.length)];
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setSelectedPlace
  }, dispatch);
}

export const LocationContainer = connect(mapStateToProps, mapDispatchToProps)(Location);