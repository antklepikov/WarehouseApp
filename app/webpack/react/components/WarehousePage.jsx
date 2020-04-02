// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {UpdateWarehouseModal} from "./UpdateWarehouseModal";
import {map, without, find} from 'lodash';


const WarehousePage = ({warehouse, products}) => {

    const [productData, setProductData] = useState({title: ''});

    const createProduct = () => {
        axios.post(`/warehouse/${warehouse.id}/product`, {
            product: {
                title: productData.title,
            }
        }, {
            headers: ReactOnRails.authenticityHeaders()
        })
            .then((result) => {
                console.log(result);
                setProductData(concat(productData, result.data));
            })
            .catch((result) => {
                console.log(result)
            })
    };



    return (
        <div className='container'>
            {/*<a href={`/warehouse/${warehouse.id}/product`}>Products</a>*/}
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
            <div>
                {map(products, (productItem, key) => {
                    return (
                        <div key={`productItem-${productItem.id}-${key}`}>
                            Product: {productItem.title}
                        </div>
                    )
                })

                }
            </div>
            <div>
                <input name="title" type="text" value={productData.title} onChange={(e) => setProductData({...productData, title: e.target.value})}/>
                <input className="btn btn-warning" type="submit" value="Отправить" onClick={createProduct}/>
            </div>
        </div>
    )
};
export default (props) => <WarehousePage {...props} />;