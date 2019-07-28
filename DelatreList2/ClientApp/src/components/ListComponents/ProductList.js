import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ListItem } from "./ListItem";
import { AddItemForm } from "./AddItemForm";
import DuplicateItemPrompt from '../DialogComponents/DuplicateItemPrompt';

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
            <Button 
                variant="outlined" 
                color="primary" 
                onClick={this.showEditPage}>
                Add New Product
            </Button>
        </div> 

        var cancelEditButton =
        <div>
            <AddItemForm
                currentItems={allItems} 
                clickFn={() => this.hideEditPage()}
                updateItemsFn={() => this.getItemData()} />
            <Button 
                variant="outlined" 
                color="primary" 
                onClick={this.hideEditPage}>
                Cancel
            </Button>
        </div> 

        return (
            <div id ="productList">
                {state.showAllItems ? 
                    listedItems : ''}
                <div id="editButtons">
                    {!state.showEditPage ?
                        addItemButton : ''}    
                    {state.showEditPage ? 
                        cancelEditButton : ''}
                </div>
            </div>
        );
    }
}