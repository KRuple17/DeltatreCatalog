import React, { Component } from 'react';
import { ListItem } from "./ListItem";
import { AddItemForm } from "./AddItemForm";

export class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allItems: [],
            showAllItems:true,
            showEditPage:false
        }
        this.showEditPage = this.showEditPage.bind(this);
        this.hideEditPage = this.hideEditPage.bind(this);
    }

    componentWillMount() {
        this.getItemData();
    }

    getSampleData () {
        this.setState({
            allItems: [
                {
                    name: 'Item 1',
                    description: 'This is optional!',
                    quantity: 10
                },
                {
                    name: 'Item 2',
                    description: 'Describing the item!',
                    quantity: 0
                }
            ]
        })
    }

    getItemData() {
        fetch('/getAllItems', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .catch((error) =>{
            alert(error);
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.setState({
                allItems: responseJson
            })
            return responseJson;
        })
    }

    showEditPage() {
        this.setState(prevState => ({
            showEditPage: true,
            showAllItems: false
        }))
    }

    hideEditPage() {
        this.setState(prevState => ({
            showEditPage: false,
            showAllItems: true
        }))
    }

    render() {
        var state = this.state;
        var allItems = state.allItems;

        var listedItems = allItems.map((item, index) =>
            <ListItem
                name={item.itemName}
                description={item.itemDescription}
                quantity={item.itemQuantity}
                key={index}
            />
        );
        var addItemButton =
        <div>
            <button type="button"
                className="btn"
                onClick={this.showEditPage}>
                Add New Product
            </button>
        </div> 

        var cancelEditButton =
        <div>
            <button type="button"
                className="btn"
                onClick={this.hideEditPage}>
                Cancel
            </button>
            <AddItemForm 
                clickFn={() => this.hideEditPage()}
                updateItemsFn={() => this.getItemData()} />
        </div> 

        return (
            <div id ="productList">
                <div id="editButtons">
                    {!state.showEditPage ?
                        addItemButton : ''}    
                    {state.showEditPage ? 
                        cancelEditButton : ''}
                </div>
                {state.showAllItems ? 
                    listedItems : ''}
            </div>
        );
    }
}