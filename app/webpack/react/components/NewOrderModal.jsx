import React, {useState, useEffect, useRef} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import axios from 'axios'
import {map, without, find} from 'lodash';
import Select from 'react-select'

const NewOrderModal = ({className, buttonLabel, warehouses}) => {
    const [modal, setModal] = useState(false);
    const [productsList, setProductsList] = useState([]);

    const toggle = () => setModal(!modal);

    const listReducer = ({list}) => {
        map(list, (listItem) => {
            console.log("ListItem", listItem)
            return (
                {value: listItem, label: listItem.title}
            )
        })
    };

    const warehouseList = map(warehouses, (warehouse) => {
        return (
            {value: warehouse, label: warehouse.title}
        )
    })
    const productListOptions = map(productsList, (product) => {
        return (
            {value: product, label: product.title}
        )
    })

    const getProducts = (warehouse) => {
        axios.get(`/warehouse/${warehouse.value.id}/product`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then( (result) => {
                setProductsList(result.data);
            })
            .catch( (error) => {
                console.log(error)
            });
    };

    const productOrder = () => {
        console.log("wareadfv", warehouseList.value)
        console.log("product", productListOptions.value)
        axios.put(`/warehouse/${warehouseList.value.id}/product/${productListOptions.value.id}`, {product: {}})
    };

    return (
        <div>
            <Button className="btn btn-warning" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Update warehouse</ModalHeader>
                <ModalBody>
                    <Select options={warehouseList} onChange = {getProducts}/>
                    <Select options={productListOptions}/>
                    <Input type="number" placeholder="Count"/>
                    <Input type="submit" value="Отправить" onClick = {productOrder}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );


};
export default NewOrderModal;




