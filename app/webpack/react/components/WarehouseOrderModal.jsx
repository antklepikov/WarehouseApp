import React, {useState, useEffect, useRef} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Alert} from 'reactstrap';
import axios from 'axios'
import {map, without, find} from 'lodash';

const WarehouseOrderModal = ({className, buttonLabel, order}) => {
    console.log("order", order)
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);



    return (
        <div>
            <Button className="btn btn-warning" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Orders</ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );


};
export default WarehouseOrderModal;




