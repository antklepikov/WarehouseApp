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
        <div className="container warehouse">
            <div className="main">
                <AddNewWarehouseModal buttonLabel="Add warehouse" setList={setList} list={list}/>
                <h3>Your warehouses</h3>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Show</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>


                <tbody >
                    { map(list, (listElement, key) => {
                            return (
                                    <tr key={`listElement-${listElement.id}-${key}`}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{listElement.title}</td>
                                        <td>{listElement.number}</td>
                                        <td>{listElement.address}</td>
                                        <td>
                                            <a className="btn btn-light" type="button" href={`/warehouse/${listElement.id}`}>Show {listElement.title}</a>
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => deleteWarehouse(listElement.id)}
                                                    className="btn btn-outline-danger btn-sm  ">
                                                <i className="fa fa-trash-o"/>
                                            </button>
                                        </td>
                                    </tr>

                            )
                        })
                    }
                </tbody>
                </table>
            </div>
        </div>
    );

};

export default (props) => <ShowWarehouses {...props} />;