// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {map, without, find} from 'lodash';
// Components
import {AddNewWarehouseModal} from "./AddNewWarehoseModal";

const ShowStores = ({stores}) => {

    const [storeData, setStoreData] = useState({title: ''});

    const createStore = () => {
        axios.post(`/store`, {
        store: {
            title: storeData.title,
        },
    }, {
        headers: ReactOnRails.authenticityHeaders()
    })
        .then((result) => {
            console.log(result);
            setStoreData(result.data);
        })
        .catch((result) => {
            console.log(result)
        })
    };

  return (
      <div className="container d-flex">
          <div>
              {map(stores, (storeItem, key) => {

                      return (
                          <div key={`storeItem-${storeItem.id}-${key}`}>
                              {storeItem.title}
                              <a className="btn btn-light" type="button" href={`/store/${storeItem.id}`}>Show {storeItem.title}</a>
                          </div>
                      );
                  }
              )
              }
          </div>
          <div className='ml-auto text-center'>
              <div className="mb-2">
                  <input name="title"
                         type="text"
                         placeholder="title"
                         value={storeData.title || ''}
                         onChange={(e) => setStoreData({...storeData, title: e.target.value})}/>
              </div>
              <input className="btn btn-warning mb-2" type="submit" value="Добавить" onClick={createStore}/>
          </div>
      </div>
  );
};
export default (props) => <ShowStores {...props} />;