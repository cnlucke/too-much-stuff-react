import React from 'react';
import ItemList from './ItemList'
import { DropTarget } from 'react-dnd'

const Types = {
 ITEM: 'item'
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

const foundTarget = {
  canDrop(props) {
    console.log("CAN DROP props:", props)
    // return canMoveKnight(props.x, props.y);
  },

  drop(props) {
    console.log("DROP props:", props)
    // moveKnight(props.x, props.y);
  }
};

const FoundBox = (props) => {
  const { connectDropTarget } = props
  return connectDropTarget(
    <div id="found-box">
      <div id="inner-found-box">
        <ItemList list={props.found} handleClick={props.handleClick} className={'found-item'}/>
      </div>
    </div>
  )
}

export default DropTarget(Types.ITEM, foundTarget, collect)(FoundBox)
