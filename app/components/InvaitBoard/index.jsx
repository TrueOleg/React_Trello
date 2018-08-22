import React from 'react';   
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';  
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import * as styles from '../style/Home'; 
import * as Token from '../../servises/Token';
import * as actions from '../../redux/actions/authAction'; 
import * as tasksActions from '../../redux/actions/tasksAction';  
import NewBoardForm from '../NewBoardForm';
import BackLogList from '../BackLogList';
import ToDoList from '../ToDoList';
import DoneList from '../DoneList';

class InvaitBoard extends React.Component {
    static propTypes = {
        getAllTasks: PropTypes.func,
        changeTask: PropTypes.func,
        getInvaitTasks: PropTypes.func,
        board: PropTypes.object,
        myTasks: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            
            tasks: {
                backLog: [],
                toDo: [],
                done: []
            } 
        };   
    };

    getAllTasks(boardId) {
        this.props.getInvaitTasks(boardId, 'backLog');
        this.props.getInvaitTasks(boardId, 'todo');
        this.props.getInvaitTasks(boardId, 'done');
    };

    componentDidMount() {
        this.getAllTasks(this.props.board);
    };

    onDragEnd = (result, index) => {
        const { draggableId, source, destination} = result;
        
       
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId 
            && source.index === destination.index) {
                return;
        }        
        if ((source.droppableId === destination.droppableId && source.index !== destination.index)
            ||(source.droppableId !== destination.droppableId && source.index !== destination.index)
            ||(source.droppableId !== destination.droppableId && source.index === destination.index)) {

            const newIndex = destination.index;
            
            let newPosition;

            switch (destination.droppableId) {
                case 'backLog':   if (this.props.myTasks.backLogTasks.length === 0) {
                    newPosition = 1000;
                } else {       
                    newPosition = this.props.myTasks.backLogTasks[newIndex].position-1;
                }
                    break;
                case 'todo': if (this.props.myTasks.toDoTasks.length === 0) {
                    newPosition =  1000;
                } else {              
                    newPosition =  this.props.myTasks.toDoTasks[newIndex].position-1;
                }
                    break;
                case 'done': if (this.props.myTasks.doneTasks.length === 0) {
                    newPosition =  1000;
                } else {
                    newPosition =  this.props.myTasks.doneTasks[newIndex].position-1;
                }
                    break;
            }
            this.props.changeTask(this.props.board.id, draggableId, destination.droppableId, newPosition); 
        }
    };
    
    
    render () {
        
      
      return (
          <div style={styles.board}>
              <h3 style={styles.boardTitle}>{this.props.board.title}</h3>
              <div style={styles.boardTasksLists}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <BackLogList boardId={this.props.board.id}/>
                    <ToDoList boardId={this.props.board.id}/>
                    <DoneList boardId={this.props.board.id}/>
                </DragDropContext>
              </div>  
          </div>
      );
        
    };
};


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        myTasks: state.tasks
    };
};

const mapDispatchToProps = (dispatch) => ({
    getTasks: (boardId, status) => dispatch(tasksActions.getTasks(boardId, status)),
    changeTask: (boardId, taskId, status, position) => dispatch(tasksActions.changeTask(boardId, taskId, status, position))
});

export default connect(mapStateToProps, mapDispatchToProps)(InvaitBoard);