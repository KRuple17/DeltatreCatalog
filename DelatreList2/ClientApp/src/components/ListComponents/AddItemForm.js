import React, { Component } from 'react';
import AddItemDialog from '../DialogComponents/AddItemDialog';

export class AddItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemToAdd: {},
            isAdding: false,
            itemNameValue: '',
            itemNameError: false
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
        var nameIsValid = this.validateItemName(newItem.itemName);
        var itemIsInList = this.checkForItemName(newItem.itemName);
        if(itemIsInList) {
            this.setState({
                showPrompt: true
            })
            return itemIsInList;
        }
        this.props.clickFn();
        this.submitItem(newItem);
    };

    checkForItemName(newItemName) {
        var currentItems = this.props.currentItems;
        var isNewName = currentItems
            .some(item => item.itemName === newItemName);
        return isNewName;
    }

    validateItemName(newItemName) {
        if(newItemName === '') {
            this.setState({
                itemNameError: true
            })
            return false;
        }
        return true;
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

    validateNameInput(e) {
        var nameInput = e.target;
        if(nameInput.value === '') {
            this.setState({
                itemNameError: true,
                itemNameValue: nameInput.value
            })
        }
        else {
            this.setState({
                itemNameError: false,
                itemNameValue: nameInput.value
            })
        }
    }

    render() {
        var state = this.state;

        const nameErrorLabel =
            <div id="errorLabelDiv">
                <br/>   
                <div className="errorIcon">
                    <i className="material-icons error-bullet">error</i>
                </div>
                <div className="errorLabel">
                    <h5 className="errorLabelText">A new item cannot have a blank name.</h5>
                    <h5 className="errorLabelText">Please enter an item name</h5>
                </div>
            </div>

        return (
            <div id="addItemRoot">
                <label><h2>Here you can add a new item to the list</h2></label>
                {state.itemNameError ?
                     nameErrorLabel : ''}
                <form id="itemForm" onSubmit={this.handleSubmitItem}>
                    <label>New Item Name:</label><br/>
                    <input id="itemNameInput"
                        className={state.itemNameError ? "has-error" :''}
                        onChange={(event) => this.validateNameInput(event)}
                        value={state.itemNameValue}
                        type="text" required/><br/>
                    <br/>
                    <label>New Item Description (optional):</label><br/>
                    <textarea id="itemDescInput"></textarea><br/>
                    <br/>
                    <label>New Item Quantity:</label><br/>
                    <input id="itemQtyInput" 
                        type="number"
                        min="1" required /><br/>
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
