import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'
import {map, without, find} from 'lodash';

const DropdownItemOrder = ({orderItem, warehouse, product, productsOrder }) => {

    return (
        <div>
            {map(productsOrder,(productsOrderItem, key) => {
                console.log("productsOrderItem", productsOrderItem)
                return (
                        <div key={key} className="d-flex">
                            <div className="mr-2">{productsOrderItem.title}</div>
                            <div>{orderItem.count}</div>
                        </div>

                )
            })}
        </div>
    );


};
export default DropdownItemOrder;




