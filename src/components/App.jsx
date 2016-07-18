import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


export const App = React.createClass({
  render() {
    //do not render the app until google maps API has loaded
    if(!this.props.hasLoadedMaps) {
      return null;
    }
    
    return <main className="app-container">
      <header className="header"></header>
      <section className="main">
        {this.props.children}
      </section>
      <footer className="footer"></footer>
    </main>
  }
});

function mapStateToProps(state) {
  return {
    hasLoadedMaps: state.googleMaps.get('hasLoadedMaps')
  };
}

export const AppContainer = connect(mapStateToProps)(App);