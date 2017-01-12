import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Review from './Review';

class ReviewsByUser extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <Review review={this.props.review}/>
            </div>
        )
    }


}


const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        review: [{
            id: 2,
            stars: 2,
            text: 'Not Great',
            reservation_id: 1
        }]
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsByUser);

