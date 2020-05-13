// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import map from 'lodash/map';
import without from 'lodash/without';

// Components
import AddNewWarehouseModal from "./AddNewWarehoseModal";
import ReactPaginate from 'react-paginate';
import Routes from '../../routes.js'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';


const ShowWarehouses = ({totalPages}) => {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getWarehouses()
}, [page]);


    const getWarehouses = () => {
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
    }


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
        <div className="container">
            <div className="main">
                <AddNewWarehouseModal buttonLabel="Add warehouse"  setList={setList} list={list}/>
                <h3 className="mb-4 font-italic">Your warehouses</h3>

                <TableContainer className="mb-4" component={Paper}>
                    <Table className="" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Number</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Show</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row, key) => (
                                <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {key}
                                    </TableCell>
                                    <TableCell align="center">{row.title}</TableCell>
                                    <TableCell align="center">{row.number}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" href={`/warehouse/${row.id}`}>
                                            Show {row.title}
                                        </Button>
                                    </TableCell>

                                    <TableCell align="center">
                                        <IconButton aria-label="delete" onClick={() => deleteWarehouse(row.id)}>
                                            <DeleteIcon color="secondary"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


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
ShowWarehouses.propTypes = {
    totalPages: PropTypes.number,
}
export default (props) => <ShowWarehouses {...props} />;