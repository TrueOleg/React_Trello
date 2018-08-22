import React from 'react';   
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { Redirect} from 'react-router'; 

import * as styles from '../style/SignUpPage';
import * as actions from '../../redux/actions/authAction';


class SignUpPage extends React.Component {  
  static propTypes = {
    registrationUser: PropTypes.func,
    isAuthenticated: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {credentials: {regLogin: '', regPass: '', regEmail: ''}}
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
    if ((this.state.credentials.regLogin!=='')||(this.state.credentials.regPass!=='')||(this.state.credentials.regEmail!=='')) {
      this.props.registrationUser(this.state.credentials);
    } 
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>;
    }
    return (
      <div style={styles.classicBody}>
        <h1 style={styles.h1}>Trello</h1>
        <form style = {styles.form}>
          <h3 style={styles.h3}>Sign-up</h3>
          <p style={styles.p}>Enter login</p>
          <input
            style = {styles.input}
            name  = "regLogin"
            label = "regLogin"
            autoComplete='off'
            value={this.state.credentials.regLogin}
            onChange={this.onChange}
            />
          <br />
          <p style={styles.p}>Enter password</p>
          <input
            style = {styles.input}
            name  = "regPass"
            label = "regPass"
            type  = "regPass"
            autoComplete='off'
            value={this.state.credentials.regPass}
            onChange={this.onChange}
            />
          <br />
          <p style={styles.p}>Enter email</p>
          <input
            style = {styles.input}
            name  = "regEmail"
            label = "regEmail"
            type  = "regEmail"
            autoComplete='off'
            value={this.state.credentials.regEmail}
            onChange={this.onChange}
            />
          <br />
          <input
            style     = {styles.btn}
            type      = "submit"
            className = "btn btn-primary"
            value     = "Registration"
            onClick={this.onSave}
            />
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
        registrationUser: (data) => dispatch(actions.registrationUser(data))
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);