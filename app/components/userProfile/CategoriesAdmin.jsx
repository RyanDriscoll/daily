import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postCategory, deleteCategory } from '../../reducers/category.jsx';



class CategoriesAdmin extends Component {

    constructor(props){
        super(props);

        this.state = {
            categoryName: ''
        }

        this.inputCategory = this.inputCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    inputCategory(e) {
        this.setState({categoryName: e.target.value});
    }

    addCategory(){
        this.props.postCategory(this.state.categoryName);
    }

    deleteCategory(categoryId){
        this.props.deleteCategory(categoryId);
    }

    render(){
        return (
            <div className="category-admin-container">
                    <table className = "table table-striped">
                        <caption className="category-caption">Categories</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.props.categories.map(category=> {
                             return (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                    <button
                                    onClick={()=> {this.deleteCategory(category.id)}}
                                     className="btn btn-danger">X</button>
                                    </td>
                                </tr>
                             )
                            })}
                        </tbody>

                    </table>
                     <input onChange={this.inputCategory} style={{width:400}}/>
                <button onClick={this.addCategory} className="btn btn-primary">Add</button>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {};
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postCategory: (name) => { dispatch(postCategory(name))},
        deleteCategory: (id) => { dispatch(deleteCategory(id))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesAdmin);