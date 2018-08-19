import React from 'react';  
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux'; 
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'; 
import Board from '../Board';
import * as styles from '../style/Home'; 
import * as actions from '../../redux/actions/boardsActions'; 



class ListBoards extends React.Component {
    constructor(props) {
        super(props);
        
        this.deleteBoardClick = this.deleteBoardClick.bind(this);
        
        
    }
  
    deleteBoardClick(event) {
        const boardId = event.target.id;
        this.props.deleteBoard(boardId);
        const id = window.location.search.substr(4);
        console.log('id', id);
        console.log('boardId', boardId);
        if (id === boardId) {
            window.location="/";
        }
    }

    render() {
        const { boards } = this.props;
        const comp = boards.map( 
                        (item) =>   <div key={item.id} style={styles.linkCont}>
                                    <Link  
                                        style={styles.linkBoard}
                                        key={item.id}
                                        to={{
                                            pathname: '/boards',
                                            search: `?id=${item.id}`, 
                                            state: {...item}
                                            }}
                                    >
                                    {item.title}
                                    </Link>
                                    <input
                                        
                                        id={item.id}
                                        style={styles.btnDelBoard}
                                        type="submit"
                                        value="✖"
                                        onClick={this.deleteBoardClick}
                                    />
                                    </div>
                        );
        return (
            
                <React.Fragment>
                    {comp}
                </React.Fragment>    
            
        );  
    }
    
};

const mapDispatchToProps = (dispatch) => ({
    deleteBoard: (boardId) => dispatch(actions.deleteBoard(boardId))
});

export default connect(null, mapDispatchToProps)(ListBoards);