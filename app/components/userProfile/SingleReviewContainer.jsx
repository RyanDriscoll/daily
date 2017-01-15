import React, {  Component } from 'react';
import moment from 'moment';




export default class SingleReviewContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            rating: 0,
            text: ''
        }

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e){


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
                                    <select>
                                        <option> 1 </option>
                                        <option> 2 </option>
                                         <option> 3 </option>
                                          <option> 4 </option>
                                           <option> 5 </option>
                                    </select>
                                    </span>
                                    <div>
                                     <textarea rows={4} cols={50} />
                                     </div>

                                     <button className="btn button-default">Submit</button>

                            </div>
                </li>
            </div>
        )
    }

}