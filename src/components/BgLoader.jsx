import React from 'react';

export default React.createClass({

  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const { blur, imgId, tint } = this.props;
    const imgQuery = imgId? `image=${imgId}` : 'random';
    const src = `https://unsplash.it${tint? '/g/':'/'}${width}/${height}/?${imgQuery}${ blur? '&blur' : ''}`;
    const img = new Image();
    img.src = src;
    img.className = "bg-loader__img bg-loader__img--hidden";

    const onLoad = e => {
      const img = e.currentTarget;
      const { bg } = this.refs;
      bg.style.backgroundImage = `url(${src})`;
      bg.classList += ' bg-loader__bg--showing';
      img.remove();
      img.removeEventListener('load', onLoad);
    };

    img.addEventListener('load', onLoad.bind(this), false);
    this.refs.container.appendChild(img);
  },

  render() {
    const { tint } = this.props;
    const className = `bg-loader__bg ${tint? 'bg-loader__bg--tint' : ''}`
    return <div ref="container" className="bg-loader">
      <div ref="bg" className={className}></div>
      {this.props.children}
    </div>
  }
});