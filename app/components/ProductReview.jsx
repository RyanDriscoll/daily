import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Review from './Review';







const mapStateToProps = (state, ownProps) => {
    return {
      ratings: state.products.reviews


    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAggregator);
