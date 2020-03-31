// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {UpdateWarehouseModal} from "./UpdateWarehouseModal";
import {map, without, find} from 'lodash';


const WarehousePage = ({warehouse}) => {

    const [page, setPage] = useState([]);


    return (
        <div className='container'>
            <a href={`/warehouse/${warehouse.id}/product`}>Products</a>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td scope="col">{warehouse.title}</td>
                        <td scope="col">{warehouse.number}</td>
                        <td>{warehouse.address}</td>
                        <td><UpdateWarehouseModal warehouse = {warehouse} /></td>
                    </tr>
                    </tbody>
                </table>
        </div>
    )
};
export default (props) => <WarehousePage {...props} />;