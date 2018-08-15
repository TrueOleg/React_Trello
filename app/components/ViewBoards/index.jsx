import React from 'react';   
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
import NewBoardForm from '../NewBoardForm';
import Board from '../Board';


    
const ViewBoards = (props) => {
    
    
    
    
        
      const { boards } = props;
      const comp = boards.map( 
                      (item) => 
                        <li key={item.title}><Route exact to={{
                                                        pathname: '/boards',
                                                        search: `?id=${item.id}`    
                                                        }}
                                                         component={Board } 
                                                        
                                            />
                                            
                        </li> );
      return (
          <div>
              <ul>{comp}</ul>
              
          </div>
      );
        
    
}




export default ViewBoards;