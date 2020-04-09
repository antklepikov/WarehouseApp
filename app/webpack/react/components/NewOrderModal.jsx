import React, {useState, useEffect, useRef} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios'
import {map, without, find} from 'lodash';
import Select from 'react-select'
const NewOrderModal = ({className, buttonLabel, warehouses}) => {

    const options = map(warehouses, (warehouse) => {
           return (
               {value:warehouse , label: warehouse.title}
       )
       })

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [list, setList] = useState([]);
    console.log("list", list);


    const getProducts = (warehouse) => {
        console.log("Press button", warehouse);
        axios.get(`/warehouse/${warehouse.id}/product`, {
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
    };
    return (
        <div>
            <Button className="btn btn-warning" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Update warehouse</ModalHeader>
                <ModalBody>
                    <Select options={options} onChange = {getProducts}/>
                    <div>
                        {map(list, (productElement, key) => {
                            return (
                                <div key={key}>{productElement.title} - {productElement.products_count}</div>
                            )
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );


};
export default NewOrderModal;




