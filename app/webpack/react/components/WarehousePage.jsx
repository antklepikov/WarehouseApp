// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import UpdateWarehouseModal from "./UpdateWarehouseModal";
import map from 'lodash/map';
import truncate from 'lodash/truncate';
import {createUseStyles} from 'react-jss'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import clsx from 'clsx'
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = createUseStyles({
        root: {
            fontSize: 20,
            overflowY: 'auto',
            height: 400,
            display: 'block',
        },
        goldButton: {
            backgroundColor: "#FFD700 !important"
        },

    }
);


const WarehousePage = ({ warehouse,  stores, order}) => {
    const [productData, setProductData] = useState({title: '', productsCount: ''});
    const [dropdownOpenOrder, setDropdownOpenOrder] = useState(false);
    const [dropdownOpenStores, setDropdownOpenStores] = useState(false);
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [open, setOpen] = useState(false);
    const [textError, setTextError] = useState('')
    const dropdownOrder = () => setDropdownOpenOrder(prevState => !prevState);
    const dropdownStores = () => setDropdownOpenStores(prevState => !prevState);
    const classes = useStyles()

    useEffect(() => {
        getProduct()
    }, [page]);

    const getProduct = () => {
        axios.get(`/warehouse/${warehouse.id}/product`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            params: {
                page: page,
            }
        })
            .then((response) => {
                setProducts(response.data.products);
                setTotalPages(response.data.total_pages)
            });
    }
    const createProduct = () => {
        axios.post(`/warehouse/${warehouse.id}/product`, {
            product: {
                title: productData.title,
            },
        }, {
            headers: ReactOnRails.authenticityHeaders()
        })
            .then((result) => {
                if (result.data.error) {
                    console.log(result.data.error)
                    setOpen(true);
                    setTextError(result.data.error);
                } else {
                    setProductData(result.data);
                }

            })
            .catch((result) => {
                console.log(result)
            })
    };

    const onChangePage = ({selected}) => {
        const pageToGo = selected + 1;
        if (pageToGo !== page) {
            setPage(pageToGo);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setTextError('')
    };
    return (
        <div className='container'>
            <div className="d-flex">
                <div>
                    <div className="font-weight-bold">
                        Title of warehouse:
                        <h4 className="font-italic font-weight-light">
                            {warehouse.title}
                        </h4>
                    </div>
                    <div className="font-weight-bold">
                        Number of warehouse:
                        <h4 className="font-italic font-weight-light">
                            {warehouse.number}
                        </h4>
                    </div>
                    <div className="font-weight-bold">
                        Address of warehouse:
                        <h4 className="font-italic font-weight-light">
                            {warehouse.address}
                        </h4>
                    </div>
                </div>
                <UpdateWarehouseModal warehouse={warehouse}/>

                <Dropdown className="ml-3"  isOpen={dropdownOpenOrder} toggle={dropdownOrder}>
                    <DropdownToggle color='warning' caret>
                        Orders
                    </DropdownToggle>
                    <DropdownMenu>
                        {map(order, (orderItem, key) => {
                            if (orderItem.count > 1) {
                                return (
                                    <DropdownItem key={key} className="p-0" href={`/order/${orderItem.id}`}>
                                        <div className="d-flex">
                                            <div className="mr-2 col-6">
                                                <small>Title:</small>
                                                <div className='font-italic'>{truncate(orderItem.product.title, {length : 10})  }</div>
                                            </div>
                                            <div className="mr-2 col-6 border-left">
                                                <small>Count:</small>
                                                <p className="font-italic">{orderItem.count}</p>
                                            </div>
                                            <p>and more...</p>
                                        </div>
                                    </DropdownItem>
                                )
                            } else {
                                return (
                                    <DropdownItem key={key} className='p-0' href={`/order/${orderItem.id}`}>
                                        <div className="d-flex">
                                            <div className="mr-2 col-6 ">
                                                <small>Title:</small>
                                                <div className="font-italic">{truncate(orderItem.product.title, {length : 10})  }</div>
                                            </div>
                                            <div className="mr-2 col-6 border-left ">
                                                <small>Count:</small>
                                                <p className="font-italic">{orderItem.count}</p>
                                            </div>
                                        </div>
                                    </DropdownItem>
                                )
                            }

                        })}
                    </DropdownMenu>
                </Dropdown>

                <Dropdown className="ml-3 " isOpen={dropdownOpenStores} toggle={dropdownStores}>
                    <DropdownToggle caret>
                        Frequently ordering stores
                    </DropdownToggle>
                    <DropdownMenu>
                        {map(stores, (storesElement, key) => {
                            return (
                                <DropdownItem key={key} className="" href={`/store/${storesElement.id}`}>
                                    <div className="d-flex">
                                        <div className="m-auto font-italic md-2">
                                            {storesElement.title}
                                        </div>
                                    </div>
                                </DropdownItem>
                            )
                        })

                        }

                    </DropdownMenu>
                </Dropdown>


                <div className="ml-auto text-center font-italic">
                    Add new product:

                    <div>
                        <TextField id="outlined-title"
                                   className="mb-4"
                                   label="Title"
                                   variant="outlined"
                                   value={productData.title || ''}
                                   onChange={(e) => setProductData({...productData, title: e.target.value})}/>

                    </div>
                    <div>
                        <TextField id="outlined-count"
                                   className="mb-4 "
                                   label="Count"
                                   variant="outlined"
                                   value={productData.productsCount || ''}
                                   onChange={(e) => setProductData({...productData, productsCount: e.target.value})}/>

                    </div>
                    <Button variant="contained" className={classes.goldButton} onClick={createProduct}>
                        Send
                    </Button>
                    <div>
                        <Snackbar open={open}  onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                            <Alert onClose={handleClose} severity="error" variant="filled">
                                {map(textError, (error, key)=>{
                                    return(
                                        <div key={key}>{error}<br></br></div>
                                    )

                                })}
                            </Alert>
                        </Snackbar>
                    </div>

                </div>
            </div>

            <div className="col-6">
                <TableContainer component={Paper}>
                    <Table className="" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Count</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((row, key) => (
                                <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {key}
                                    </TableCell>
                                    <TableCell align="center">{row.product.title}</TableCell>
                                    <TableCell align="center">{row.products_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <div className="mt-4">

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
                    pageClassName='page-item page-link'
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    containerClassName={'pagination justify-content-center'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    onPageChange={onChangePage}
                    hrefBuilder={() => `/warehouse/${warehouse.id}/product`}
                />

                </div>
            </div>
        </div>
    )
};

WarehousePage.propTypes = {
    stores: PropTypes.array,
    orders: PropTypes.array,
    warehouse: PropTypes.object
}

const WarehousePageChange = React.memo(WarehousePage);

export default (props) => <WarehousePageChange {...props} />;