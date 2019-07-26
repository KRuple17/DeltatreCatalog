import React, { Component } from 'react';

export class ProductListPage extends Component {

    render() {
        return (
            <div id="listRoot">
                <AddProductButton />
                <ProductListPage />
            </div>
        );
    }
}