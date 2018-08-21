import React from 'react';   
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../redux/actions/boardsActions'; 
import * as styles from '../style/Home'; 
import close from '../../img/cross-script.png';


class ErrorWindow extends React.Component {
  static propTypes = {
    
  };

  constructor(props) {
    super(props);
    this.state = {
        newBoard: {title: ''},
        
      };
    this.hideError = this.hideError.bind(this);

  };

  hideError(event) {
    event.preventDefault();
    this.props.hideError();
  }

  render() {
    return (
      <div style={styles.errWindow}>
        {this.props.message}
        <input
          style={styles.btnCancelErr}
          type="submit"
          className="btn btn-primary"
          value='✖'
          onClick={this.hideError}
          />  
      </div> 
    );    
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(null, mapDispatchToProps)(ErrorWindow);