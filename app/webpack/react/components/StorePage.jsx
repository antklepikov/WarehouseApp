// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {map, without, find} from 'lodash';
import concat from 'lodash/concat';
import NewOrderModal from '../components/NewOrderModal'

const StorePage = ({store, warehouses, productsCount, xd}) => {
console.log("xd", xd)
  return (
      <div className = "container">
          <div className="font-weight-bold">
              Title of warehouse:
              <h4 className="font-italic font-weight-light">
                  {store.title}
              </h4>

          </div>
          <NewOrderModal buttonLabel="Add order" warehouses={warehouses} store={store} productsCount={xd}/>
          <div className = "mt-2">
              Products in this store:
          </div>
      </div>
  );
};
export default StorePage;