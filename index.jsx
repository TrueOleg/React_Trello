import React from 'react';
import { connect } from 'react-redux';

import RowHero from '../RowHero';
import * as actions from '../../redux/actions';

class ListHeroes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      stateOfHeroes: {},
      input: ''
     };
     
    this.isOpen = this.isOpen.bind(this);
    this.isChange = this.isChange.bind(this);
    this.isClear = this.isClear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let stateOfHeroes = {};
    nextProps.heroes.forEach(hero => {
      stateOfHeroes[hero.name] = false;
    });
    this.setState({ stateOfHeroes });

  }

  isOpen(name, value) {
    this.setState({ stateOfHeroes: {...this.state.stateOfHeroes, [name]: value} })
    this.props.addName(name);
  }

  isChange(e) {
    this.setState({ input: e.target.value })
  }

  isClear(e) {
    this.setState({ input: ''})

  }

  render() {
    const { heroes } = this.props;
    const comp = heroes.map((item) => {
      return (<RowHero key={item.name} hero={item} state={this.state.isOpen} isOpen={this.isOpen}/>)
    });
    return (
      <div>
        <ul>
          { comp }
        </ul>
        <input onChange={this.isChange} onBlur={this.isClear} value={this.state.input} type='text' />
        <p>{this.state.input}</p>
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
      heroes: state.items.results,
      hasErrored: state.itemsHasErrored,
      isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      addName: (data) => dispatch(actions.addName(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListHeroes);
