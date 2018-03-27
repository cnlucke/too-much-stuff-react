import React from 'react'
import ItemList from './ItemList'
import Leaderboard from './Leaderboard'
import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types';

const Types = {
 ITEM: 'item'
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    currentDragOffset: {},
  };
}

const imageTarget = {
  canDrop(props) {
    return true;
    // return canMoveKnight(props.x, props.y);
  },
  hover(props, monitor, component) {
    console.log("HOVER:", monitor.getClientOffset())
    component.setState({
      currentDragOffset: monitor.getClientOffset()
    })
  }
  // drop(props) {
  //   console.log("DROP:", props.x, props.y)
  //   moveKnight(props.x, props.y);
  // }
};

class ImageContainer extends React.Component {
  state = {
    leaderboard: false,
  }

  showLeaderboard = () => {
    this.setState({leaderboard: true})
  }

  hideLeaderboard = () => {
    this.setState({leaderboard: false})
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div id="image_container">
        { (!this.props.started) ?
          ((this.state.leaderboard) ?
          <Leaderboard handleBack={this.hideLeaderboard}/>
          :
          <div className="buttons-area">
            <button className={'game_button'} onClick={this.props.startGame}>
              <p id="button-start-game-text">START GAME</p> Search through the junk pile and find the requested items!
            </button>
            <button className={'game_button'} onClick={this.showLeaderboard}>
              <p id="button-start-game-text">LEADERBOARD</p>
            </button>
          </div>)
          : null
        }
        { (this.props.won) ?
          <div>
            <div className={'winning'}>{`YOU WON ${this.props.currentUser.username.toUpperCase()}!!!!`}</div>
          </div>
          : null
        }
        <div id="item-location-1">
          <ItemList id="location-1" className="item" list={this.props.bottom} handleClick={this.props.handleClick}/>
        </div>
        <div id="item-location-2">
          <ItemList id="location-2" className="item" list={this.props.top} handleClick={this.props.handleClick}/>
        </div>
      </div>
    )
  }
}

ImageContainer.propTypes = {
  // x: PropTypes.number.isRequired,
  // y: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

export default DropTarget(Types.ITEM, imageTarget, collect)(ImageContainer)
