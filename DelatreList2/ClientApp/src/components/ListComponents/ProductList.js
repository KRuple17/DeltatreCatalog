import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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
        this.getItemData = this.getItemData.bind(this);
    }

    componentWillMount() {
        this.getItemData();
    }

    getItemData() {
        fetch('/getAllItems', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .catch((error) =>{
            alert(error);
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                allItems: responseJson
            })
            this.hideEditPage();
            return responseJson;
        })
    }

    clearList() {
        fetch('/clearList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/text'
            },
            body: JSON.stringify(true)
        })
        .catch((error) => {
            alert(error);
        })
        .then((response) => response.json())
        .then((responseJson) => {
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
                id="addItemButton" 
                variant="outlined" 
                color="primary" 
                onClick={() => this.showEditPage()}>
                Add New Product
            </Button>
        </div> 

        var cancelEditButton =
        <div>
            <AddItemForm
                currentItems={allItems} 
                clickFn={this.hideEditPage}
                updateItemsFn={() => this.getItemData()} />
        </div>
        
        var clearListButton = 
        <div>
            <Button
                id="clearListButton"
                variant="outlined" 
                color="primary" 
                onClick={() => this.clearList()}>
                Clear Entire Catalog
            </Button>
        </div>

        return (
            <div id ="productList">
                {state.allItems.length < 1 && !state.showEditPage ?
                    <p>Sorry there are no items in the catalog.</p>: ''}
                {state.showAllItems ? 
                    listedItems : ''}
                <div id="editButtons">
                    {!state.showEditPage ?
                        addItemButton :
                        cancelEditButton}
                    {state.allItems.length && state.showAllItems ?
                        clearListButton: ''}
                </div>
            </div>
        );
    }
}