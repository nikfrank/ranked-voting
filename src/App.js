import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Ranker from './Ranker';
import Ballot from './Ballot';

import kennyPic from './imgs/kenny.png';
import kylePic from './imgs/kyle.png';
import ericPic from './imgs/eric.png';
import stanPic from './imgs/stan.png';
import ericsMomPic from './imgs/ericsMom.png';

const sampleVotes = [
  [ 1, 0, 3, 2, 4 ],
  [ 3, 2, 4, 1, 0 ],
  [ 2, 3, 1, 4, 0 ],
  [ 1, 3, 2, 4, 0 ],
  [ 2, 1, 3, 0, 4 ],
  [ 3, 4, 2, 1, 0 ],
  [ 1, 4, 3, 0, 2 ],
  [ 4, 2, 0, 1, 3 ],
  [ 3, 4, 1, 0, 2 ],
  [ 1, 0, 4, 2, 3 ],
  [ 3, 2, 1, 4, 0 ],
];


class App extends Component {
  state = {

    candidates: [
      { id: 0, name: 'kenny', imgSrc: kennyPic, },
      { id: 1, name: 'kyle', imgSrc: kylePic, },
      { id: 2, name: 'eric', imgSrc: ericPic, },
      { id: 3, name: 'stan', imgSrc: stanPic, },
      { id: 4, name: 'eric\'s mom', imgSrc: ericsMomPic, },
    ],

    votes: [],
  }

  onVote = vote =>
    this.setState(state=> ({ votes: state.votes.concat([vote]) }))
  
  render() {
    const { candidates, votes } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">

          <Ranker candidates={candidates} votes={votes}/>

          <Ballot candidates={candidates} onVote={this.onVote}/>
        </header>
      </div>
    );
  }
}

export default App;
