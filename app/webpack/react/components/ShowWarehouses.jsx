// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {map, without, find} from 'lodash';
// Components
import {AddNewWarehouseModal} from "./AddNewWarehoseModal";
import {UpdateWarehouseModal} from './UpdateWarehouseModal'
const ShowWarehouses = () => {

    const [list, setList] = useState([]);
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
            .then((result) => {
                setList(without(list, list.find((listItem) => {
                        return listItem.id === id;
                    }
                )));
            })
            .catch((error) => {
                console.log(error)
            })
    };


    return (
        <div className="container">
            <div className="main">
                <AddNewWarehouseModal buttonLabel="Add warehouse" setList={setList} list={list}/>
                <h3>Your warehouses</h3>

                <hr/>
                <div>
                    { map(list, (listElement, key) => {
                            return (
                                <div key={`listElement-${listElement.id}-${key}`} className="content-list d-flex">
                                    Warehouse:
                                    {listElement.number}
                                    {listElement.title}
                                    {listElement.address}
                                    <button type="button" onClick={() => deleteWarehouse(listElement.id)} className="btn btn-outline-danger btn-sm float-right  ml-3">
                                        <i className="fa fa-trash-o"/>
                                    </button>
                                    <UpdateWarehouseModal listElement = {listElement} />


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