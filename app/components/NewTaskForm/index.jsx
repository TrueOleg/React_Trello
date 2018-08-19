import React from 'react';   
import { connect } from 'react-redux';

import * as actions from '../../redux/actions/tasksAction'; 
import * as styles from '../style/Home'; 
import close from '../../img/cross-script.png';


class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newTask: {title: '', content: ''},
        
      };
    this.addTask = this.addTask.bind(this);
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
    const newTask = this.state.newTask;
    newTask[field] = event.target.value;
    return this.setState({newTask: newTask});
  }

  addTask(event) {
    event.preventDefault();
    const position = (this.props.lastPosition + 1000);
    this.props.writeTask(this.state.newTask, this.props.status, this.props.boardId, position);
    this.setState({ newTask: {title: '', content: ''}});
    this.props.hideForm();
  }
  

  render() {
    return (
    <form style={styles.form} id='formTask'>
      <input
        style={styles.inputForm}
        name="title"
        label="title"
        placeholder="enter title"
        autoComplete='off'
        value={this.state.newTask.title}
        onChange={this.onChange}
        />
      <br />
      <input
        style={styles.inputForm}
        name="content"
        label="content"
        placeholder="enter content"
        autoComplete='off'
        value={this.state.newTask.content}
        onChange={this.onChange}
        />
      <br />
      <div style={styles.btnCont}>
        <input
          style={styles.btnAddTask}
          type="submit"
          className="btn btn-primary"
          value="+Add Task"
          onClick={this.addTask}
        />
        <input
            style={styles.btnGenLink}
            type="submit"
            className="btn btn-primary"
            value='✖'
            onClick={this.hideList}
        /> 
      </div>   
    </form>  
    )
      
  };
}
const mapStateToProps = (state) => {
    
  };

const mapDispatchToProps = (dispatch) => ({
  writeTask: (data, status, boardId, position) => dispatch(actions.writeTask(data, status, boardId, position))
});

export default connect(null, mapDispatchToProps)(NewTaskForm);