import React from 'react';   
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';  

import * as actions from '../../redux/actions/tasksAction'; 
import * as styles from '../style/Home'; 


class Task extends React.Component {
    static propTypes = {
        deleteTask: PropTypes.func,
        boardId: PropTypes.string,
        task: PropTypes.object
    };

    constructor(props) {
        super(props);
        
        this.deleteTask = this.deleteTask.bind(this);
    };

    deleteTask() {
        this.props.deleteTask(this.props.task.id, this.props.boardId);
    };
    
    render () {
        
        
            return (
                <div style={styles.task}>
                    <input
                        style={styles.btnDelTask}
                        type="submit"
                        value="✖"
                        onClick={this.deleteTask}
                    />
                    <p style={styles.taskText}>{this.props.task.title}</p>
                    <p style={styles.taskText}>{this.props.task.content}</p>
                    
                </div>  
            )
        
        
    }
};


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.user.isAuthenticated,
    
});

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (taskId, boardId) => dispatch(actions.deleteTask(taskId, boardId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));