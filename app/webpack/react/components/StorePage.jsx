// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {map, without, find} from 'lodash';
import concat from 'lodash/concat';
import NewOrderModal from '../components/NewOrderModal'

const StorePage = ({store, warehouses}) => {

  return (
      <div className = "container">
          <div className="font-weight-bold">
              Title of warehouse:
              <h4 className="font-italic font-weight-light">
                  {store.title}
              </h4>

          </div>
          <NewOrderModal buttonLabel="Add order" warehouses={warehouses}/>
          <table className="table table-sm">
              <thead>
              <tr>
                  <th>№</th>
                  <th>Title</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td></td>
              </tr>

              </tbody>
          </table>
      </div>
  );
};
export default StorePage;