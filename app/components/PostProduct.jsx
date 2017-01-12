import React, {Component}  from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {postProduct} from 'APP/app/reducers/products'
import {getUniqueAndSort} from 'APP/app/reducers/category'



class PostProduct extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            price: '',
            end_date: '',
            img_url: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e){
        this.setState({[e.target.name]:e.target.value});
    }



    render(){
      console.log('@@@@@@@@@@@@',this.props.user);
        return (
            <div className="col-md-10 signup-login">
            <h3>Post a product!</h3>
            <form id="product-form" className="form-group" style={{marginTop: '20px'}} onSubmit={evt => {
                evt.preventDefault();
                this.props.post({
                    name: evt.target.name.value,
                    description: evt.target.description.value,
                    category_id: evt.target.categories.value,
                    address: evt.target.address.value,
                    city: evt.target.city.value,
                    state: evt.target.state.value,
                    zip: evt.target.zip.value,
                    price: evt.target.price.value,
                    end_date: evt.target.end_date.value,
                    img_url: evt.target.img_url.value,
                    seller_id: this.props.user.id
                    });
                // this.logInUser(evt);
                browserHistory.push('/products');
            } }>
                <input
                    id="name-input"
                    name="name"
                    className="form-control"
                    placeholder="Enter product name"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.name}
                />
                <input
                    id="description-input"
                    name="description"
                    className="form-control"
                    placeholder="Enter product description"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.description}
                />
                <select name="categories" form="product-form">
                  {
                    this.props.categories && getUniqueAndSort(this.props.categories).map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                  }
                </select>
                <input
                    id="address-input"
                    name="address"
                    className="form-control"
                    placeholder="Enter product address"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.address}
                />
                <input
                    id="city-input"
                    name="city"
                    className="form-control"
                    placeholder="Enter city"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.city}
                />
                <input
                    id="state-input"
                    name="state"
                    className="form-control"
                    placeholder="Enter state"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.state}
                />
                <input
                    id="zip-input"
                    name="zip"
                    className="form-control"
                    placeholder="Enter zip"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.zip}
                />
                <input
                    id="price-input"
                    name="price"
                    className="form-control"
                    placeholder="Enter price"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.price}
                />
                <input
                    type="date"
                    id="end_date-input"
                    name="end_date"
                    className="form-control"
                    placeholder="Enter product availability end date"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.end_date}
                />
                <input
                    id="img_url-input"
                    name="img_url"
                    className="form-control"
                    placeholder="Enter product image url"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.img_url}
                />
                <button id="product-submit" type="submit" form="product-form" value="Submit"
                        className="btn btn-primary btn-block">
                    <span className="glyphicon glyphicon-plus"></span> Post my product
                </button>
                <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid product</div>
            </form>
            </div>
        )
    }

    logInUser(e){
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password_digest: e.target.password_digest.value
        }

        // this.props.login(user);

        this.setState({
            email: '',
            password_digest: ''
        })
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
      user: state.auth,
      categories: state.categories.categories
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        post: function(product){
          console.log('$$$$$$$$$$$$', product)
            dispatch(postProduct(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProduct);


