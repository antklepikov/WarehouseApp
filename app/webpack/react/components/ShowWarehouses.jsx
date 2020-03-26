// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {map, without} from 'lodash';
// Components
import {AddNewWarehoseModal} from "./AddNewWarehoseModal";

const ShowWarehouses = () => {

    const [list, setList] = useState([]);
    console.log('LIST', list);
    useEffect(() => {
        axios.get("/warehouse", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then( (result) => {
                setList(result.data);
            })
            .catch( (error) => {
                console.log(error)
            });
    }, []);

    const deleteWarehouse = (id) => {
        axios.delete(`/warehouse/${id}`)
          .then( (result) => {
              console.log('deleteWarehouse', result);
              setList(without(list, result));
          })
            .catch((error) =>{
                console.log(error)
            })
    };

    return (
        <div className="container">
            <div className="main">
                <AddNewWarehoseModal buttonLabel="Add warehouse" setList={setList} list={list}/>
                <h3>Your warehouses</h3>
                <hr/>
                <div>
                    { map(list, (listElement, key) => {
                            return (
                                <div key={`listElement-${listElement.id}-${key}`}>
                                    Warehouse:
                                    {listElement.number}
                                    {listElement.title}
                                    {listElement.address}

                                    <button type="button" onClick={() => deleteWarehouse(listElement.id)} className="btn btn-outline-danger btn-sm float-right">
                                    {/*<button type="button" className="btn btn-outline-danger btn-sm float-right">*/}
                                        <i className="fa fa-trash-o"/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );

};

export default (props) => <ShowWarehouses {...props} />;