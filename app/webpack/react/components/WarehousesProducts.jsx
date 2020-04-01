// React Core
import React, {useState, useEffect} from 'react';
// Libs
import {map, without, find, concat} from 'lodash';
import axios from 'axios'

const WarehouseProducts = ({product, warehouse}) => {
    console.log(">>>>>>>>", product);
    const [productData, setProductData] = useState({title: ''});

    // const createProduct = () => {
    //     axios.post(`/warehouse/${}/product`, {
    //         product: {
    //             title: productData.title,
    //         }
    //     }, {
    //         headers: ReactOnRails.authenticityHeaders()
    //     })
    //         .then((result) => {
    //             console.log(result);
    //             setProductData(concat(productData, result.data));
    //         })
    //         .catch((result) => {
    //             console.log(result)
    //         })
    // };

    return (
        <div className="container">

            {map(product, (productItem, key) => {
                return (
                    <div key={`productItem-${productItem.id}-${key}`}>
                        Product: {productItem.title}
                    </div>
                )
            })

            }
            <div>
                {/*<input name="title" type="text" value={productData.title} onChange={(e) => setProductData({...productData, title: e.target.value})}/>*/}
                {/*<input className="btn btn-warning" type="submit" value="Отправить" onClick={createProduct}/>*/}
            </div>
        </div>
    );
};
export default (props) => <WarehouseProducts {...props} />;