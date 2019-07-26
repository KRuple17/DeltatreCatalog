import React, { Component } from 'react';

export class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemName: props.name,
            itemDescription: props.description,
            itemQuantity: props.quantity
        }
    }

    render() {
        var state = this.state;
        return (
            <div id="listItem">
                {/* Add a picture to Item */}
                <h4 id="itemName">{state.itemName}</h4>
                <label id="itemDesc">
                    {state.itemDescription ?
                        state.itemDescription : 
                        'No Description' }
                </label><br/>
                <label id="itemQty">Quantity: {state.itemQuantity}</label>
            <br/>
            </div>
        );
    }

}