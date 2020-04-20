import React from 'react';
import ReactDOM from 'react-dom';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.refreshFlickity = this.refreshFlickity.bind(this);
    this.state = {
      flickityReady: false,
    };    
  }

  componentDidMount() {
    this.flickity = new Flickity(this.flickityNode, this.props.options || {});

    this.setState({
      flickityReady: true,
    });
  }

  refreshFlickity() {
    this.flickity.reloadCells();
    this.flickity.resize();
    this.flickity.updateDraggable();
  }

  componentWillUnmount() {
    this.flickity.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const flickityDidBecomeActive = !prevState.flickityReady && this.state.flickityReady;
    const childrenDidChange = prevProps.children.length !== this.props.children.length;

    if (flickityDidBecomeActive || childrenDidChange) {
      this.refreshFlickity();
    }
  }

  renderPortal() {
    if (!this.flickityNode) {
      return null;
    }

    const mountNode = this.flickityNode.querySelector('.flickity-slider');

    if (mountNode) {
      return ReactDOM.createPortal(this.props.children, mountNode);
    }
  }

  render() {
    return [
      <div className={'test'} key="flickityBase" ref={node => (this.flickityNode = node)} />,
      this.renderPortal(),
    ].filter(Boolean);
  }
}