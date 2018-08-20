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
import * as boardActions from '../../redux/actions/boardsActions';
import BoardsContainer from '../BoardsContainer';


class Home extends React.Component {
    static propTypes = {
        generateLink: PropTypes.func,
        isAuthenticated: PropTypes.bool,
        secret: PropTypes.string
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
            }

        this.generateLink = this.generateLink.bind(this);

    };

    componentDidUpdate(prevProps) {
        if (prevProps.secret !== this.props.secret) {
            const secret = this.props.secret;
            const link = document.getElementById('share');
            link.value = `http://localhost:8080/invait#${secret}`;
        };
    };

    generateLink() {
        const id = String(window.location.search);
        if (id) {
            this.props.createHashSecret(id);
        } else {
            const link = document.getElementById('share');
            link.value = `select the board`;
        };
         
    };
   
    logOut() {
        Token.clearToken();
        location.reload();
    };

    render () {
        const token = localStorage.getItem('token');

        if (!this.props.isAuthenticated && !token) {
            return <Redirect to="/sign-in"/>;
        }

        return (
            <React.Fragment>
                
                    <div style={styles.header}>
                        <h1 style={styles.h1}>Trello</h1>
                        <button onClick={this.logOut} style={styles.btnLogOut}>Log-out</button>    
                    </div>
                    <div style={styles.sharing}>
                            <input style={styles.inputSharing} id='share'/>
                            <button onClick={this.generateLink} style={styles.btnGenLink}>Generate Link</button>   
                    </div>
                    <BoardsContainer {...this.props}/>
               
            </React.Fragment>    
        );
    };
};


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        secret: state.invait.secret
    };
};

const mapDispatchToProps = (dispatch) => ({
    setToken: (data) => dispatch(actions.isLogin(data)),
    createHashSecret: (boardId) => dispatch(boardActions.createHashSecret(boardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);