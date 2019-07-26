import React, { Component } from 'react';
export class EditListButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAllItems:true,
            showEditPage:false
        }
    }

    render() {
        var state = this.state;
        var button = 
        <div id="editButtons">
            <button type="button"
                className="btn"
                onClick={this.showEditPage}>
                Add New Product
            </button>
        </div>
        return (
            <div>
                {!state.showEditPage ? 
                button : ''}
            </div>
        );
    }
}

