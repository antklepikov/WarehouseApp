// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {map, without, find} from 'lodash';
import concat from 'lodash/concat';
import NewOrderModal from '../components/NewOrderModal'

const StorePage = ({store, warehouses, productsCount, products}) => {

  return (
      <div className = "container">
          <div className="font-weight-bold">
              Title of store:
              <h4 className="font-italic font-weight-light">
                  {store.title}
              </h4>

          </div>
          <NewOrderModal buttonLabel="Add order" warehouses={warehouses} store={store} productsCount={productsCount}/>
          <div className = "mt-2">
              Products in this store:
              {map(products,(productsStore, key) => {
                  return (
                      <div key={key}>
                          {productsStore.title}
                      </div>
                  )
              })}
          </div>
      </div>
  );
};
export default StorePage;