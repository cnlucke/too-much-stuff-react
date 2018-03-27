import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

const Types = {
  ITEM: 'item'
};

const itemSource = {
  beginDrag(props) {
    return props.img
  },
  endDrag(props, monitor, component) {
    console.log(monitor)
    return props.handleClick(props.img)
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}


class Item extends Component {
  constructor (props) {
    super(props)

    this.state = {
      left: props.coordinates.left,
      top: props.coordinates.right,
    }

  }

  componentDidMount() {
    const img = new Image();
    img.src = `${this.props.img.src}`
    img.style.height = '20px';
    img.style.width = '20px';
    img.onload = () => this.props.connectDragPreview(img);

  }

  render() {
    const { isDragging, connectDragSource } = this.props
    return connectDragSource(
      <img
        style={{left: this.state.left,
          top: this.state.top,
          cursor: isDragging ? 'zoom-in' : 'grab'
        }}
        src={this.props.img.src}
        alt={this.props.img.name}
        className={this.props.className}
        id={this.props.id}
        />
    )
  }
}

Item.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(Types.ITEM, itemSource, collect)(Item)

// onClick={() => (this.props.handleClick ? this.props.handleClick(this.props.img) : null )}
