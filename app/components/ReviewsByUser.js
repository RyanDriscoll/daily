import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Review from './Review';

class ReviewsByUser extends Component{
    constructor(props){
        super(props)
        this.ratingChanged = this.ratingChanged.bind(this);
    }

    ratingChanged(newRating){
        console.log(newRating)
    }

    render(){
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <Review review={this.props.review} edit='false' color1={'#ffd700'} ratingChanged={this.ratingChanged}/>
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
