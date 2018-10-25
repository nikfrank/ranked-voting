import React, { Component } from 'react';
import './Ballot.css';

class Ballot extends Component {
  state = {
    order: this.props.candidates.map((c, i)=> i),
  }

  up = oi=> oi && this.setState(state=> ({
    order: state.order.slice(0, oi-1)
                .concat( state.order[oi] )
                .concat( state.order[oi-1] )
                .concat( state.order.slice(oi+1) )
  }) )

  dn = oi=> (this.state.order.length -1 -oi) && this.setState(state=> ({
    order: state.order.slice(0, oi)
                .concat( state.order[oi+1] )
                .concat( state.order[oi] )
                .concat( state.order.slice(oi+2) )
  }) )

  vote = ()=> {
    this.props.onVote(
      this.state.order.map( o => this.props.candidates[o].id )
    );
  }
  
  render() {
    const { order } = this.state;
    const { candidates=[] } = this.props;
    
    return (
      <div className="ballot">
        {order.map( (o, oi)=> (
           <div key={candidates[o].id} className='candidate'>
             <button onClick={()=> this.up(oi)}>/\</button>
             {candidates[o].name}
             <button onClick={()=> this.dn(oi)}>\/</button>
           </div>
         ))}
           <button onClick={this.vote}> VOTE </button>
      </div>
    );
  }
}

export default Ballot;
