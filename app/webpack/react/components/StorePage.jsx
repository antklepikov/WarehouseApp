// React Core
import React, {useState, useEffect} from 'react';
// Libs
import map from 'lodash/map';

import NewOrderModal from '../components/NewOrderModal'

const StorePage = ({store, warehouses, productsCount, productsInStores}) => {
    console.log("productsInStores", productsInStores)
    return (
        <div className="container">
            <div className="font-weight-bold">
                Title of store:
                <h4 className="font-italic font-weight-light">
                    {store.title}
                </h4>

            </div>
            <NewOrderModal buttonLabel="Add order" warehouses={warehouses} store={store} productsCount={productsCount}/>
            <div className="mt-2">
                <div className=''>Products in this store:</div>
                <table className="table w-25 p-3">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Count in store</th>
                        </tr>
                    </thead>
                    <tbody>
                        {map(productsInStores, (productsStore, key) => {
                            return (
                                <tr key={key}>
                                    <td>{productsStore.product.title}</td>
                                    <td>{productsStore.count}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    );
};
export default StorePage;