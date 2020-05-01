// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import map from 'lodash/map';
import without from 'lodash/without';

// Components
import {AddNewWarehouseModal} from "./AddNewWarehoseModal";
import ReactPaginate from 'react-paginate';
import Routes from '../../routes.js'


const ShowWarehouses = ({totalPages}) => {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios.get(Routes.warehouse_path(), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        params: {
            page: page
        }
    })
        .then((response) => {
            setList(response.data.warehouses);
        });
}, [page]);

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
    const onChangePage = ({selected}) => {
        const pageToGo = selected + 1;
        if (pageToGo !== page) {
            setPage(pageToGo);
        }
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
                    <tbody>
                    {map(list, (listElement, key) => {

                        return (
                            <tr key={`listElement-${listElement.id}-${key}`}>
                                <th scope="row">{key + 1}</th>
                                <td>{listElement.title}</td>
                                <td>{listElement.number}</td>
                                <td>{listElement.address}</td>
                                <td>
                                    <a className="btn btn-light font-weight-bold" type="button"
                                       href={`/warehouse/${listElement.id}`}>Show {listElement.title}</a>
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
                <ReactPaginate
                    previousLabel={
                        <div className="page-item d-flex justify-content-center">
                            <div className="page-link">
                                {'<'}
                            </div>
                        </div>
                    }
                    nextLabel={
                        <div className="page-item d-flex justify-content-center">
                            <div className="page-link">
                                {'>'}
                            </div>
                        </div>
                    }
                    breakLabel={
                        <div className="page-item d-flex justify-content-center">
                            <div className="page-link">...</div>
                        </div>
                    }
                    pageClassName='page-item page-link '
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    containerClassName={'pagination justify-content-center'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    onPageChange={onChangePage}
                    hrefBuilder={(page) => Routes.warehouse_path({page})}
                />
            </div>
        </div>
    );

};

export default (props) => <ShowWarehouses {...props} />;