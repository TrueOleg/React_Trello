import React from 'react';   
import { connect } from 'react-redux';

import * as actions from '../../redux/actions/boardsActions'; 
import * as styles from '../style/Home'; 
import close from '../../img/cross-script.png';


class NewBoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newBoard: {title: ''},
        
      };
    this.addBoard = this.addBoard.bind(this);
    this.onChange = this.onChange.bind(this);
    this.hideList = this.hideList.bind(this);
  }

  componentDidMount() {
    
   
  }

  hideList(event) {
    event.preventDefault();
    this.setState({ newTask: {title: '', content: ''}});
    this.props.hideForm();
  }

  onChange(event) {
    const field = event.target.name;
    const newBoard = this.state.newBoard;
    newBoard[field] = event.target.value;
    return this.setState({newBoard: newBoard});
  }

  addBoard(event) {
    event.preventDefault();
    this.props.writeBoard(this.state.newBoard);
    this.setState({ newBoard: {title: ''}});
    this.props.hide(event);
  }

  render() {
    return (
      <form style={styles.form} id='form'>
        <input
          style={styles.inputForm}
          placeholder="enter title"
          name="title"
          label="title"
          autocomplete='off'
          value={this.state.newBoard.title}
          onChange={this.onChange}
          />
        <br />
        <input
          style={styles.btnAddBoard}
          type="submit"
          className="btn btn-primary"
          value="+Add board"
          onClick={this.addBoard}
          />
        <input
          style={styles.btnGenLink}
          type="submit"
          className="btn btn-primary"
          value='✖'
          onClick={this.hideList}
          />  
      </form>  
    );    
  };
};

const mapDispatchToProps = (dispatch) => ({
  writeBoard: (data) => dispatch(actions.writeBoard(data))
});

export default connect(null, mapDispatchToProps)(NewBoardForm);