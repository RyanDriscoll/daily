import React, {  Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { postReview } from '../../reducers/userProfile'




class SingleReviewContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            stars: 5,
            text: ''
        }

        this.selectRating = this.selectRating.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    selectRating(e){
        this.setState({stars: e.target.value});
    }

    handleTextInput(e){
        this.setState({text: e.target.value});

    }

    handleSubmit(e){
        if(this.state.text.length < 10){
            alert('Your review is too short, please write a longer review');
        }
        else {

            this.props.postReview({
                reservationId: this.props.transaction.id,
                stars: this.state.stars,
                text: this.state.text,
            type: this.props.type}, this.props.userInfo.id);
        }
    }

    render(){
        return (
            <div>
                 <li className="list-group-item"><div>
                                    <div> Date: {moment(this.props.transaction.date).format('MM-DD-YYYY')} </div>
                                    <div>Product Name: {this.props.transaction.product.name} </div>
                                    <div>Product description: {this.props.transaction.product.description}</div>
                                    <div>Address: {this.props.transaction.product.address},{this.props.transaction.product.city},
                                    {this.props.transaction.product.state}, {this.props.transaction.product.zip}  </div>
                                    <div> Price: ${this.props.transaction.product.price} </div>
                                    <div>
                                    <img src={this.props.transaction.product.img_url}/>
                                    </div>
                                    <label> Rating </label>
                                    <span>
                                     <select value={this.state.stars} className="ratingSelector" onChange={this.selectRating}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                    </span>
                                    <div>
                                     <textarea onChange={this.handleTextInput} rows={4} cols={50} />
                                     </div>

                                     <button className="btn button-default" onClick={this.handleSubmit}>Submit</button>
                            </div>
                </li>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {};
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postReview: (review, userId) => dispatch(postReview(review, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleReviewContainer);