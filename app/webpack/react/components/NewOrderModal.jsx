import React, {useState, useEffect, useRef} from 'react';

import Modal from 'reactstrap/es/Modal'
import ModalHeader from 'reactstrap/es/ModalHeader'
import ModalBody from 'reactstrap/es/ModalBody'
import ModalFooter from 'reactstrap/es/ModalFooter'
import axios from 'axios'
import map from 'lodash/map';
// import Select from 'react-select'
import Button from '@material-ui/core/Button';
import {createUseStyles} from 'react-jss'
import TextField from '@material-ui/core/TextField';
import clsx from "clsx"

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


const useStyles = createUseStyles({
        goldButton: {
            backgroundColor: "#FFD700 !important"
        },

    }
);

const NewOrderModal = ({ buttonLabel, warehouses, store}) => {
    const classes = useStyles()
    const [modal, setModal] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [currentWarehouse, setCurrentWarehouse] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({});
    const [productCountOrder, setProductCountOrder] = useState({});
    const [visible, setVisible] = useState({errorColor: false, errorText: '', disabledButton: false})
    const [open, setOpen] = useState(false);
    const [textError, setTextError] = useState('')

    const toggle = () => {
        setModal(!modal)
        setProductsList([])
        setCurrentProduct({})
        setCurrentWarehouse({})

    };


    const getProducts = (event) => {

        axios.get(`/warehouse/${event.target.value.id}/product`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((result) => {
                setProductsList(result.data.products);
                setCurrentWarehouse(event.target.value);
            })
            .catch((error) => {
                console.log(error)
            });
    };


    const productOrder = () => {
        axios.post(`/order`, {
            orders: {
                count: productCountOrder,
                warehouse_id: currentWarehouse.id,
                product_id: currentProduct.id,
                store_id: store.id
            }
        })
            .then((result) => {
                if (result.data.error) {
                    setOpen(true);
                    setTextError(result.data.error);
                }
            })
            .catch((error) => {
                console.log('ERROR', error)
            })
    };

    const saveProduct = (event) => {
        setCurrentProduct(event.target.value);
    };

    const verifyCount = (e) => {
        setProductCountOrder(e.target.value);
        if (e.target.value > currentProduct.products_count) {
            setVisible({errorColor: true , errorText: 'Incorrect entry', disabledButton: true});
        }
        else{
            setVisible({errorColor: false, errorText: '', disabledButton: false});
        }
    };

    const handleClose = () => {
        setOpen(false);
        setTextError('')
    };

    return (
        <div>
            <Button className={classes.goldButton} variant="outlined" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} className = "font-italic">New order</ModalHeader>
                <ModalBody>

                    <Snackbar open={open}  onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                        <Alert onClose={handleClose} severity="error" variant='filled'>
                            {map(textError, (error, key)=>{
                                return(
                                    <div key={key}>{error}<br></br></div>
                                )

                            })}
                        </Alert>
                    </Snackbar>

                    <FormControl className='w-100'>
                        <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            value={currentWarehouse}
                            onChange={getProducts}
                            input={<Input />}
                        >
                            {warehouses.map((warehouse, key) => {
                                return (

                                    <MenuItem key={key} value={warehouse}>
                                        {warehouse.title}
                                    </MenuItem>
                                )
                            })
                            }
                        </Select>
                    </FormControl>

                    <FormControl className='w-100 mt-2'>
                        <InputLabel id="product-list">Products</InputLabel>
                        <Select
                            labelId="product-list"
                            id="product-list-select"
                            value={currentProduct}
                            onChange ={saveProduct}
                            input={<Input />}
                        >
                            {productsList.map((product, key) => {
                                return (
                                    <MenuItem  key={key} value={product}>
                                        {product.product.title}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        error={visible.errorColor}
                        id="outlined-error-helper-text"
                        label="Count"
                        type = "number"
                        helperText={visible.errorText}
                        variant="outlined"
                        size="small"
                        onChange = {verifyCount}
                        className = "mt-2 w-100"
                    />
                    <Button variant="outlined" color="primary" onClick={productOrder} disabled={visible.disabledButton} className = "mt-4">
                        Send
                    </Button>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
NewOrderModal.propTypes = {
    buttonLabel: PropTypes.string,
    store: PropTypes.object,
    warehouses: PropTypes.array
}
export default NewOrderModal;




