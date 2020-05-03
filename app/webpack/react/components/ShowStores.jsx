// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import map from 'lodash/map';
import {createUseStyles} from 'react-jss'
import clsx from 'clsx';
// Components

const useStyles = createUseStyles({
        scroll: {
            fontSize: 20,
            overflowY: 'auto',
            height: 400,
            display: 'block',
        },
        positionTh: {
            position: 'sticky',
            top: -5,
            background: '#eee',
    }
    }
);

const ShowStores = ({stores}) => {

    const [storeData, setStoreData] = useState({title: ''});
    const classes = useStyles()
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
          <table className = {clsx('table', 'col-6', classes.scroll)}>
              <thead>
              <tr>
                  <th className={classes.positionTh}>#</th>
                  <th className={classes.positionTh}>Title</th>
                  <th className={classes.positionTh}>Show</th>
              </tr>
              </thead>
          <tbody>
              {map(stores, (storeItem, key) => {

                      return (
                          <tr key={`storeItem-${storeItem.id}-${key}`}>
                              <td>{key}</td>
                              <td>{storeItem.title}</td>
                              <td><a className="btn font-weight-bold btn-light" type="button" href={`/store/${storeItem.id}`}>Show {storeItem.title}</a></td>
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