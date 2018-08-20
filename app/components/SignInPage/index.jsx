import React from 'react';  
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { Redirect} from 'react-router'; 
import { Link } from 'react-router-dom';

import * as styles from '../style/SignInPage';
import * as actions from '../../redux/actions/authAction';


class SignInPage extends React.Component {  
  static propTypes = {
    logInUser: PropTypes.func,
    isAuthenticated: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {credentials: {login: '', password: ''}};
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  };

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  };

  onSave(event) {
    event.preventDefault();
    this.props.logInUser(this.state.credentials);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>;
    }
    return (
      <div style={styles.classicBody}>
        <h1 style={styles.h1}>Trello</h1>
        <form style={styles.formLogin}>
          <h3 style={styles.h3}>Sign-in</h3>
          <p style={styles.p}>Enter login</p>
          <input
            style={styles.input}
            name  = "login"
            label = "login"
            autoComplete='off'
            value={this.state.credentials.login}
            onChange={this.onChange}
          />
          <p style={styles.p}>Enter password</p>
          <input
            style={styles.input}
            name  = "password"
            label = "password"
            type  = "password"
            value={this.state.credentials.password}
            onChange={this.onChange}
          />
          <input
            style={styles.btnLogin}
            type      = "submit"
            className = "btn btn-primary"
            value     = "Login"
            onClick={this.onSave}
          />
          <div style={styles.linkCont}>
          <Link to="/sign-up" style={styles.link}>Sign-up</Link> 
          </div>
        </form>  
      </div>   
    );
  }
};

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.user.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logInUser: (data) => dispatch(actions.logInUser(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);