import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'
import {map, without, find} from 'lodash';

const DropdownItemOrder = ({orderItem, warehouse, product, productsOrder }) => {
    console.log("productsOrder", productsOrder)
    console.log("product", product)

    return (
        <div>
            {map(productsOrder,(productsOrderItem, key) => {
                return (
                        <div key={key} className="d-flex">
                            <div className="mr-2">{productsOrderItem.title}</div>
                            <div>{productsOrderItem.products_count}</div>
                        </div>

                )
            })}
        </div>
    );


};
export default DropdownItemOrder;




