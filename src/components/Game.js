import React, { Component } from 'react';
import FoundBox from './FoundBox'
import MissionBox from './MissionBox'
import DummyTimer from './DummyTimer'
import Timer from './Timer'
import ImageContainer from './ImageContainer'

class Game extends Component {
  state = {
    imgs: [],
    found: [],
    mission: [],
    won: false,
    time: 0,
    started: false,
    top: [],
    bottom: [],
    leaderboard: false,
  }

  startGame = () => {
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(imgs => {
      const mission = imgs.slice(0, 3)
      const rand = Math.floor(Math.random() * (imgs.length - 5))
      const top = imgs.slice(rand, rand + 6)
      let bottom = imgs.slice(0, rand)
      bottom = [...bottom, ...imgs.slice(rand + 6)]
      this.setState({ imgs, mission, top, bottom, won: false, found: [], started: true })
    })
  }

  handleItemClick = (img) => {
    let foundImgs = this.state.found
    let filteredTopImgsLeft = this.state.top
    let filteredBottomImgsLeft = this.state.bottom

    if (this.state.mission.includes(img)) {
      filteredTopImgsLeft = filteredTopImgsLeft.filter((item) => item.name !== img.name)
      filteredBottomImgsLeft = filteredBottomImgsLeft.filter((item) => item.name !== img.name)
    }
    if (!this.state.found.includes(img) && this.state.mission.includes(img)) foundImgs = [...this.state.found, img]
    // const uniqFoundImgs = foundImgs.filter((item, index) => foundImgs.indexOf(item) === index)
    this.setState({ found: foundImgs, top: filteredTopImgsLeft, bottom: filteredBottomImgsLeft}, () => this.handleWin())
  }

  handleWin = () => {
    if (this.state.mission.length === this.state.found.length) {
      this.setState({ won: true, started: false }, () => {
        //POST game to /games
        const options = {
          method: 'post',
          headers: {
            "Content-Type": 'application/json',
            Accepts: 'application/json'
          },
          body: JSON.stringify({ "game": {"username": this.props.currentUser.username, "time": this.state.time} })
        }

        fetch('http://localhost:3000/games', options)
      }
    )}
  }

  setFinalTime = (seconds) => {
    this.setState({time: seconds})
  }

  render() {
    return (
      <div id="game">
        <div id="game-status">
          { (this.state.started) ? <Timer won={this.state.won} handleFinalTime={this.setFinalTime}/>
             : <DummyTimer won={this.state.won} time={this.state.time}/>
          }
          <MissionBox  mission={this.state.mission} />
          <FoundBox  found={this.state.found} won={this.state.won} user={this.props.currentUser}/>

        </div>
        <ImageContainer started={this.state.started}
                        startGame={this.startGame}
                        won={this.state.won}
                        currentUser={this.props.currentUser}
                        top={this.state.top}
                        bottom={this.state.bottom}
                        handleClick={this.handleItemClick}/>
      }
    </div>
    )
  }
}

export default Game
