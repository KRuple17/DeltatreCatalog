import React, { Component } from 'react';
import AddItemDialog from '../DialogComponents/AddItemDialog';
import errorNames from '../Constants/ErrorConstants.js';

export class AddItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemToAdd: {},
            isAdding: false,
            itemNameValue: '',
            itemNameError: false,
            itemQuantityError: false,
            invalidNumberRegex: 'D|^$',
            quantityErrorMessage: 'An item must have a numeric quantity.',
            serverQuantityErrorMsg: ''
        }
        this.handleSubmitItem = this.handleSubmitItem.bind(this);
    }

    async handleSubmitItem() {
        var formData = document.getElementById('itemForm');
        var newItem = {
            itemName: formData.itemNameInput.value,
            itemDescription: formData.itemDescInput.value,
            itemQuantity: formData.itemQtyInput.value
        }
        var nameIsValid = this.validateItemName(newItem.itemName);
        if(nameIsValid) {
            var itemIsInList = this.checkForItemName(newItem.itemName);
            if(itemIsInList) {
                this.setState({
                    showPrompt: true
                })
                return itemIsInList;
            }
            else {
                var shouldClose = await this.submitItem(newItem);
            }
        }
        return false;
    };

    checkForItemName(newItemName) {
        var currentItems = this.props.currentItems;
        var isNewName = currentItems
            .some(item => item.itemName === newItemName);
        return isNewName;
    }

    /* This function is child Dialog component 
    to determine if it should open its dialog.*/
    validateItemName(newItemName) {
        if(newItemName === '') {
            this.setState({
                itemNameError: true
            })
            return false;
        }
        return true;
    }

    async submitItem(item) {
        var shouldClose = null;
        const response = await fetch('/submitItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        const responseJson = await response.json();
        this.parseErrorResponse(responseJson);
        if(responseJson.message) {
            this.props.updateItemsFn();
        }
    }

    parseErrorResponse(errorObject) {
        if(errorObject !== null &&
            errorObject.errorName) {
                switch(errorObject.errorName) {
                    case errorNames.itemQty:
                        this.setState({
                            itemQuantityError: true,
                            serverQuantityErrorMsg: errorObject.errorMessage
                        })
                        return false;

                    case errorNames.itemName:
                        this.setState({
                            itemNameError: true
                        })
                        return false;
                    default:
                        return true;
                }
            }
    }

    hideEditForm() {
        this.props.clickFn();
    }

    validateNameInput(e) { //Fires after onChange event.
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

    validateQuantityInput(e) {
        var elementValue = e.target.value;
        if(elementValue.match(this.state.invalidNumberRegex)) {
            this.setState({
                itemQuantityError: true,
                serverQuantityErrorMsg: ''
            })
        }
        else {
            this.setState({
                itemQuantityError: false,
                serverQuantityErrorMsg: '' 
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
        
        const quantityErrorLabel =
            <div id="errorLabelDiv">
                <br/>   
                <div className="errorIcon">
                    <i className="material-icons error-bullet">error</i>
                </div>
                <div className="errorLabel">
                    <h5 className="errorLabelText">
                        { this.state.serverQuantityErrorMsg ? 
                            this.state.serverQuantityErrorMsg : 
                            this.state.quantityErrorMessage }
                    </h5>
                </div>
            </div>

        return (
            <div id="addItemRoot">
                <label><h2>Here you can add a new item to the list</h2></label>
                {state.itemNameError ?
                    nameErrorLabel : ''}
                {state.itemQuantityError ?
                    quantityErrorLabel : ''}
                <form id="itemForm" onSubmit={this.handleSubmitItem}>
                    <label>New Item Name:</label><br/>
                    <input
                        id="itemNameInput"
                        className={state.itemNameError ? "has-error" :''}
                        onChange={(event) => this.validateNameInput(event)}
                        value={state.itemNameValue}
                        type="text" required/><br/>
                    <br/>
                    <label>New Item Description (optional):</label><br/>
                    <textarea id="itemDescInput"></textarea><br/>
                    <br/>
                    <label>New Item Quantity:</label><br/>
                    <input 
                        id="itemQtyInput" 
                        onInput={(event) => this.validateQuantityInput(event)}
                        type="number"
                        /*min="1"*/ required /><br/>
                    <br/>
                    <AddItemDialog 
                        submitItemFn={() => this.submitItem()}
                        handleSubmitFn={() => this.handleSubmitItem()}
                        hideFormFn={() => this.hideEditForm()} />
                </form>
            </div>
        );
    }
}
