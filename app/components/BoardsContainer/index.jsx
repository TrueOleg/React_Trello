import React from 'react';   
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    IndexRoute,
    Link
  } from 'react-router-dom';  

import * as styles from '../style/Home'; 
import * as Token from '../../servises/Token';
import * as actions from '../../redux/actions/authAction'; 
import * as boardsActions from '../../redux/actions/boardsActions';  
import NewBoardForm from '../NewBoardForm';
import ListBoards from '../ListBoards';
import Board from '../Board';
import Invait from '../Invait';


class BoardsContainer extends React.Component {
    static propTypes = {
        showNewBoardForm: PropTypes.func,
        hideForm: PropTypes.func,
        getBoards: PropTypes.func,
        myBoards: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {
            
            isOpen: false
        };
        this.showNewBoardForm = this.showNewBoardForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    componentDidMount() {
        this.props.getBoards();
    }
    
    hideForm() {
        this.setState({
        isOpen: false
        });
    }

    showNewBoardForm(event) {
        event.preventDefault();
        
        this.setState({ isOpen: !this.state.isOpen});
    }
    
    
    render () {
        
        const form = this.state.isOpen 
                     ? <NewBoardForm  
                        hideForm={this.hideForm} 
                        hide={this.showNewBoardForm}
                        /> 
                     : <button onClick={this.showNewBoardForm} style={styles.btnAdd}>+ Add Board</button>;

        if (this.props.myBoards === 0) {
            return (
                <div style={styles.boardsCont}>
                    <div style={styles.boardsList}>
                        <div style={styles.h2}>List Boards</div>
                        <div style={styles.list}>
                            {form}
                        </div>
                    </div>    
                </div> 
            );    
        } else {
            return (
                <div style={styles.boardsCont}>
                    <div style={styles.boardsList}>
                        <div style={styles.h2}>List Boards</div>
                        <div style={styles.list}>
                            <ListBoards boards={this.props.myBoards} {...this.props}/> 
                            {form}
                        </div>
                    </div>    
                    <Route path="/boards" render={() => <Board board={this.props.location.state}/>}/>
                    <Route path="/invait" render={() => <Invait board={this.props.location.hash}/>}/>     
                </div> 
            );    
        }
        
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        myBoards: state.boards.myBoards
    };
  };

const mapDispatchToProps = (dispatch) => ({
    
    getBoards: () => dispatch(boardsActions.getBoards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsContainer);