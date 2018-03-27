import React from 'react'

export default class Leaderboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      leaders: []
    }
    this.fetchGames()
  }

  componentDidMount() {
    this.fetchGames()
  }


  fetchGames = () => {
    fetch('http://localhost:3000/games')
    .then(res => res.json())
    .then(leaders => this.setState({ leaders }) )
  }

  buildBoard = () => {
    if (this.state.leaders.length > 0) {
      return (
              <div id="leaderboard-table" style={{display: 'table'}}>

                <div className='row'>
                  <div className="column header" id="left">
                    <h1>{"PLAYER"}</h1>
                  </div>
                  <div className="column header" id="right">
                    <h1>{"SECONDS"}</h1>
                  </div>
                </div>
                {this.state.leaders.map((leader, index) => {
                  return (
                  (index === (this.state.leaders.length - 1)) ?
                    <div className='row'>
                      <div className="column cell bottom left">{leader.username}</div>
                      <div className="column cell bottom right">{leader.time}</div>
                    </div>
                  :
                    <div className='row'>
                      <div className="column cell">{leader.username}</div>
                      <div className="column cell">{leader.time}</div>
                    </div>
                  )
                })}
              </div>
              )
    }
  }

  buildUsernameCell = (username) => {

  }

  render() {
    return(
      <div id='leaderboard-container'>
        <p id="leaderboard-title">{"LEADERBOARD"}</p>
          {this.buildBoard()}
          <button id={'back'} onClick={this.props.handleBack}>PLAY</button>
      </div>
    )
  }
}
