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

    handleSubmitItem(e) {
        e.preventDefault();
        this.setState({
            isAdding: true
        })
        var formData = e.target;
        var newItem = {
            itemName: formData.itemNameInput.value,
            itemDescription: formData.itemDescInput.value,
            itemQuantity: formData.itemQtyInput.value
        }
        this.props.clickFn(newItem);
        this.submitItem(newItem);
    };

    submitItem(item) {
        fetch('/submitItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(() => {this.props.updateItemsFn();})
        .catch((error) => {
            alert(error);
        })
    }

    render() {
        var state = this.state;
        return (
            <div>
                <label><h2>Here you can add a new item to the list</h2></label>
                <form onSubmit={this.handleSubmitItem}>
                    <label>New Item Name:</label><br/>
                    <input id="itemNameInput" type="text" /><br/>
                    <br/>
                    <label>New Item Description (optional):</label><br/>
                    <textarea id="itemDescInput"></textarea><br/>
                    <br/>
                    <label>New Item Quantity:</label><br/>
                    <input id="itemQtyInput" type="number" /><br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                {!state.isAdding ? <AddItemDialog /> : ''}
            </div>
        );
    }
}
