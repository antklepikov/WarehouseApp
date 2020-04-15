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
          <table className="table col-6">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Show</th>
              </tr>
              </thead>
          <tbody>
              {map(stores, (storeItem, key) => {

                      return (
                          <tr key={`storeItem-${storeItem.id}-${key}`}>
                              <td>{key}</td>
                              <td>{storeItem.title}</td>
                              <td><a className="btn btn-light" type="button" href={`/store/${storeItem.id}`}>Show {storeItem.title}</a></td>
                          </tr>
                      );
                  }
              )
              }
          </tbody>
          </table>
          <div className='ml-auto text-center'>
              <p>Add new store</p>
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