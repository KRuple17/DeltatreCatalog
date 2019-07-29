import React, { Component } from 'react';
import AddItemDialog from '../DialogComponents/AddItemDialog';

export class AddItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemToAdd: {},
            isAdding: false
        }
        this.handleSubmitItem = this.handleSubmitItem.bind(this);
    }

    handleSubmitItem() {
        var formData = document.getElementById('itemForm');
        var newItem = {
            itemName: formData.itemNameInput.value,
            itemDescription: formData.itemDescInput.value,
            itemQuantity: formData.itemQtyInput.value
        }
        var itemIsInList = this.checkItemName(newItem.itemName);
        if(itemIsInList) {
            this.setState({
                showPrompt: true
            })
            return itemIsInList;
        }
        this.props.clickFn();
        this.submitItem(newItem);
    };

    checkItemName(newItemName) {
        var currentItems = this.props.currentItems;
        var isNewName = currentItems
            .some(item => item.itemName === newItemName);
        return isNewName;
    }

    submitItem(item) {
        fetch('/submitItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(() => {this.props.updateItemsFn()})
        .catch((error) => {
            alert(error);
        })
    }

    hideEditForm() {
        this.props.clickFn();
    }

    render() {
        return (
            <div>
                <label><h2>Here you can add a new item to the list</h2></label>
                <form id="itemForm" onSubmit={this.handleSubmitItem}>
                    <label>New Item Name:</label><br/>
                    <input id="itemNameInput" type="text" required/><br/>
                    <br/>
                    <label>New Item Description (optional):</label><br/>
                    <textarea id="itemDescInput"></textarea><br/>
                    <br/>
                    <label>New Item Quantity:</label><br/>
                    <input id="itemQtyInput" type="number" min="1" required /><br/>
                    <br/>
                    {/* <input type="submit" value="Submit"/> */}
                    <AddItemDialog 
                        submitItemFn={() => this.submitItem}
                        handleSubmitFn={() => this.handleSubmitItem()}
                        hideFormFn={() => this.hideEditForm()} />
                </form>
            </div>
        );
    }
}
