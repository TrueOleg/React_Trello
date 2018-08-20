import React from 'react';   
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';  

import * as styles from '../style/Home'; 
import * as Token from '../../servises/Token';
import * as actions from '../../redux/actions/authAction';
import * as boardsActions from '../../redux/actions/boardsActions';
import InvaitBoard from '../InvaitBoard';
import Board from '../Board';


class Invait extends React.Component {
    static propTypes = {
        getBoardId: PropTypes.func,
        board: PropTypes.object
    };

    constructor(props) {
        super(props);
            this.state = {
                isOpen: false
        };
        
        const token   = localStorage.getItem('token');
            if (token) {
                props.setToken({
                    token
                });
            };
    };

    componentDidMount() {
       const hash = window.location.hash;
       this.props.getBoardId(hash); 
    };

    render () {
        let board;
         if (Object.keys(this.props.board).length !== 0) {
            board = <Board board={this.props.board} />;
        } else {
            board = null;
        }
                    
        
        
        return (
            <React.Fragment>    
                <h2>Invait</h2>
                 {board}
             </React.Fragment>    
        );
    }
};


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        board: state.invait.board
    };
};

const mapDispatchToProps = (dispatch) => ({
    setToken: (data) => dispatch(actions.isLogin(data)),
    getBoardId: (hash) => dispatch(boardsActions.getBoardId(hash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invait);