import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteProduct } from '../../reducers/products.jsx';

class PostedProducts extends Component {

    constructor(props){
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);

    }

    componentDidMount(){

    }

    deleteProduct(productId){
        this.props.deleteProduct(productId);
    }

    render(){
        console.log('productsByUser::', this.props.productsByUser);
        return (
            <div>
                    <table className = "table table-striped">
                        <caption>Products</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description </th>
                                <th>Address</th>
                                <th>Price</th>
                                <th>End Date </th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody>

                           {this.props.productsByUser.map(product=> {
                             return (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.address} {product.state} {product.city} {product.zip}</td>
                                    <td>{product.price}</td>
                                    <td>{moment(product.end_date).format('MM-DD-YYYY')}</td>
                                    <td>
                                    <button
                                    onClick={()=> this.deleteProduct(product.id)}
                                    className="btn btn-danger"> X
                                    </button>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>

                    </table>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const { allProducts } = state.products;
    const { userInfo } = state.userProfile;
    const productsByUser = allProducts.filter(product => {
        return product.seller_id === userInfo.id && product.active
    })
    return {
        productsByUser
    };
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteProduct: (productId) => {dispatch(deleteProduct(productId))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostedProducts);