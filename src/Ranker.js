import React, { Component } from 'react';
import './Ranker.css';

class Ranker extends Component {
  state = {
    rounds: [],
    roundsTransfers: [],
    eliminated: [],
  }

  componentDidMount(){
    this.updateVoteTotals(this.props.candidates,
                          this.props.votes);
  }
  
  componentDidUpdate(prevProps, prevState){
    if( prevProps.votes.length !== this.props.votes.length ){
      this.updateVoteTotals(this.props.candidates,
                            this.props.votes);
    }
  }

  updateVoteTotals = (cs, votes)=> {
    let rounds = [];
    let candidates = cs.map(({id})=> id);
    let eliminated = [];
    let roundsTransfers = [];
    
    while( candidates.length > 1 ){
      const round = {};
      const roundTransfers = {};

      // calculate vote totals for the round
      votes.forEach(vote=>{
        // find the first candidate uneliminated
        let v = 0;
        while( eliminated.indexOf(vote[v]) > -1 ) v++;

        // vote for him
        const voteFor = vote[v];
        if(typeof voteFor === 'number')
          round[voteFor] = (round[voteFor] ||0) + 1;
      });

      // determine the loser
      let loser = candidates[0];
      for( let i=1; i<candidates.length; i++)
        if( (round[ candidates[i]] ||0) < round[loser] )
          loser = candidates[i];


      // record the transfers
      // for this loser, any vote that was his
      // has a new voteFor
      votes.forEach(vote=> {
        let v = 0;
        while( eliminated.indexOf(vote[v]) > -1 ) v++;
        const voteFor = vote[v];

        if( voteFor === loser ){
          let nv = 0;
          const ne = eliminated.concat( loser );
          while( ne.indexOf(vote[nv]) > -1 ) nv++;

          const nf = vote[nv];
          roundTransfers[nf] = (roundTransfers[nf]||0) + 1
        }
      });
      
      // eliminate the loser
      eliminated.push(loser);
      candidates = candidates.filter( id => id !== loser );

      
      // record the result
      rounds.push(round);

      if( candidates.length > 1 )
        roundsTransfers.push(roundTransfers);
      else
        roundsTransfers.push({});
    }

    this.setState({
      rounds,
      eliminated,
      roundsTransfers,
      winner: candidates[0],
    })
  }

  
  render() {
    const {
      rounds,
      winner,
      eliminated,
      roundsTransfers,
    } = this.state;
    
    const { candidates=[] } = this.props;

    return (
      <div className="ranker">
        <div className='candidates'>
          {candidates.map( ({ id, name, imgSrc })=> (
             <div className='candidate' key={id}>
               <div className='avatar-container'
                    style={{
                      backgroundColor: id === winner?
                                       'gold' : ''
                    }}>
                 <img src={imgSrc}/>
               </div>
             </div>
           ) )}
        </div>

        <div className='results-rounds'>
          {rounds.map( (round, ri)=> [
             <div className='round' key={'v'+ri}>
               {candidates.map(({ id })=> (
                  <div className={(
                      eliminated[ri] === id ? 'loser ':''
                    )+(
                      winner === id ? 'winner':''
                    )}
                       key={'v'+ri+' '+id}>
                    {round[id] || 0}
                  </div>
                ) )}
             </div>,
             <div className='round-transfers' key={'rt'+ri}>
               {candidates.map(({ id })=>(
                  <div className={'transfer '+(
                      roundsTransfers[ri][id] ? 'has':'not'
                    )}
                       key={'rt'+ri+' '+id}>
                    +{roundsTransfers[ri][id] || 0}
                  </div>
                ))}
             </div>
           ] )}
        </div>
      </div>
    );
  }
}

export default Ranker;
