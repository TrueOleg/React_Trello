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
import NewTaskForm from '../NewTaskForm';
import Task from '../Task';


class DoneList extends React.Component {
    static propTypes = {
        showNewTaskForm: PropTypes.func,
        doneTasks: PropTypes.array,
        hideForm: PropTypes.func,
        boardId: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
           isOpen: false, 
           status: 'done',
           lastPosition: 0
        };
        this.showNewTaskForm = this.showNewTaskForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    };

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (this.props.doneTasks.length !== 0) {
                const last = this.props.doneTasks.length;
                const lastTask = this.props.doneTasks[last-1];
                const lastPos = +lastTask.position;
                this.setState({
                    lastPosition: lastPos
                });
            }
        }   
    };

    hideForm() {
        this.setState({
        isOpen: false
        });
    };

    showNewTaskForm(event) {
        event.preventDefault();
        this.setState({ isOpen: !this.state.isOpen});
    };
    
    
    render () {
        
        const form = this.state.isOpen 
                    ? <NewTaskForm 
                        hideForm={this.hideForm}
                        hide={this.showNewTaskForm} 
                        status={this.state.status} 
                        boardId={this.props.boardId}
                        lastPosition={this.state.lastPosition}
                    /> 
                    : <button onClick={this.showNewTaskForm} style={styles.btnAdd}>+Add Task</button>;
        const tasks = this.props.doneTasks !== 0 
                    ? this.props.doneTasks.map(
                                            (item, index) => 
                                                <Draggable  
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div 
                                                            key={item.id} 
                                                            style={styles.task} 
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Task 
                                                                task={item}
                                                                boardId={this.props.boardId} 
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                    : null;  
        return (
            <Droppable droppableId={this.state.status}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={styles.tasksList}>
                        <div style={styles.h2}>Done</div>
                        <div style={styles.scrollDiv}>
                        {tasks}
                        {form}
                        {provided.placeholder} 
                        </div>  
                    </div>
                )}
            </Droppable>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        doneTasks: state.tasks.doneTasks
    };
};

const mapDispatchToProps = (dispatch) => ({
    getTasks: (boardId, status) => dispatch(tasksActions.getTasks(boardId, status)),    
});

export default connect(mapStateToProps, mapDispatchToProps)(DoneList);