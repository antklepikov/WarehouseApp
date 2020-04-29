import React, {useState, useEffect, useRef} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Alert} from 'reactstrap';
import axios from 'axios'
import map from 'lodash/map';
import Select from 'react-select'

const NewOrderModal = ({className, buttonLabel, warehouses, store}) => {

    const [modal, setModal] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [currentWarehouse, setCurrentWarehouse] = useState({});
    const [currentProduct, setCurrentProduct] = useState({});
    const [productCountOrder, setProductCountOrder] = useState({});
    const [currentCountProduct, setCurrentCountProduct] =useState(0)
    const [visible, setVisible] = useState(false)
    const toggle = () => setModal(!modal);

    const warehouseList = map(warehouses, (warehouse) => {
        return (
            {value: warehouse,  label: warehouse.title}
        )

    })
    const productListOptions = map(productsList, (product) => {
        return (
            {value: product.product,count: product.productCount, label: product.product.title}
        )
    })

    const getProducts = (warehouse) => {
        axios.get(`/warehouse/${warehouse.value.id}/product`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((result) => {
                console.log("result", result.data)
                setProductsList(result.data.products);
                setCurrentWarehouse(warehouse.value);

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
                console.log('SUCCESS', result);
            })
            .catch((error) => {
                console.log('ERROR', error)
            })
    };

    const saveProduct = (product) => {
        setCurrentProduct(product.value);
        setCurrentCountProduct(product.count);
    };

    const verifyCount = (e) => {
        setProductCountOrder(e.target.value);
        if (e.target.value > currentCountProduct) {
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    };

    return (
        <div>
            <Button className="btn btn-warning" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>New order</ModalHeader>
                <ModalBody>
                    <Select className='mt-2' options={warehouseList} onChange = {getProducts}/>
                    <Select className='mt-2' options={productListOptions} onChange ={saveProduct} />
                    <Input type="number" placeholder="Count" className='mt-2' onChange = {verifyCount}/>
                    <Alert color='danger' isOpen={visible}>
                        invalid quantity
                    </Alert>
                    <Input type="submit" value="Отправить" className="mt-2 btn btn-success" onClick={productOrder} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );


};
export default NewOrderModal;




