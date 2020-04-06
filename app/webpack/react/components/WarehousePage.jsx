// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {UpdateWarehouseModal} from "./UpdateWarehouseModal";
import {map, without, find} from 'lodash';
import concat from 'lodash/concat';

const WarehousePage =({warehouse, products}) => {

    const [productData, setProductData] = useState({title: '', products_count: ''});

    // useEffect( () => {
    //    concat(products, productData)
    // }, []);

    const createProduct = () => {
        axios.post(`/warehouse/${warehouse.id}/product`, {
            product: {
                title: productData.title,
                products_count: productData.products_count
            },
        }, {
            headers: ReactOnRails.authenticityHeaders()
        })
            .then((result) => {
                console.log(result);
                setProductData(result.data);
            })
            .catch((result) => {
                console.log(result)
            })
    };
    // const deleteProduct = (id) => {
    //     console.log("product.id", products.id);
    //     axios.delete(`/warehouse/${warehouse.id}/product/${id}`)
    //         .then((result) => {
    //             setProductData(without(productData, productData.find((productElement) => {
    //                     return productElement.id === id;
    //                 }
    //             )));
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // };
    return (
        <div className='container'>
            <div className="d-flex">
                <div>
                    <div className="font-weight-bold">
                        Title of warehouse:
                        <h4 className="font-italic font-weight-light">
                            {warehouse.title}
                        </h4>
                    </div>
                    <div className="font-weight-bold">
                        Number of warehouse:
                        <h4 className="font-italic font-weight-light">
                            {warehouse.number}
                        </h4>
                    </div>
                    <div className="font-weight-bold">
                        Address of warehouse:
                        <h4 className="font-italic font-weight-light">
                            {warehouse.address}
                        </h4>
                    </div>
                </div>
                <UpdateWarehouseModal warehouse={warehouse}/>

                <div className="ml-auto text-center">
                    Add new product:
                    <div className="mb-2">
                        <input name="title"
                               type="text"
                               placeholder="title"
                               value={productData.title || ''}
                               onChange={(e) => setProductData({...productData, title: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <input name="products_count"
                               type="text"
                               placeholder="count"
                               value={productData.products_count || ''}
                               onChange={(e) => setProductData({...productData, products_count: e.target.value})}/>
                    </div>

                    <input className="btn btn-warning mb-2" type="submit" value="Отправить" onClick={createProduct}/>
                </div>
            </div>
            <div className="d-flex products-block">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Title</th>
                        <th scope="col">Count</th>
                    </tr>
                    </thead>
                <tbody>

                    {map(products, (productItem, key) => {
                        if (productItem.products_count > 0) {
                            return (
                                <tr key={`productItem-${productItem.id}-${key}`}>
                                    <td>
                                        {key + 1})
                                    </td>
                                    <td>
                                        {productItem.title}
                                    </td>
                                    <td>
                                        {productItem.products_count}
                                    </td>

                                </tr>
                            )
                            }

                        }
                    )
                    }
                </tbody>
                </table>

            </div>
        </div>
    )
};

const WarehousePageChange = React.memo(WarehousePage);

export default (props) => <WarehousePageChange {...props} />;