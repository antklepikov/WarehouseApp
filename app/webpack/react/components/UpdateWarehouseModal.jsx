import React, {useState, useEffect, useRef} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios'

const UpdateWarehouseModal = ({className, listElement, list}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // const [updateData, setUpdateData] = useState({title: '', number: '', address: ''});
    const [updateData, setUpdateData] = useState({title: listElement.title, number: listElement.number, address: listElement.address});
    console.log("updateData", updateData);


    const updateWarehouse = () => {
        axios.put(`/warehouse/${listElement.id}`, {warehouse:{title: updateData.title, number: updateData.number, address: updateData.address}})
            .then((result) => {
                console.log('SUCCESS', result);
                setUpdateData(list.splice(listElement.id, 1, updateData));
            })
            .catch((error) => {
                console.log('ERROR', error)
            })
    };

    return(
        <div>
            <Button className="btn btn-outline-success btn-sm" onClick={toggle}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"/>
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Update warehouse</ModalHeader>
                <ModalBody>

                        <label>
                            <input name="title" type="text"  value={updateData.title} onChange={(e) => setUpdateData({...updateData, title: e.target.value})} />
                            <input name="number" type="number" value={updateData.number} onChange={(e) => setUpdateData({...updateData, number: e.target.value})} />
                            <input name="address" type="text" value={updateData.address} onChange={(e) => setUpdateData({...updateData, address: e.target.value})} />
                        </label>
                        <input className="btn btn-warning" type="submit" value="Отправить" onClick={() => updateWarehouse(listElement.id)} />

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );


};
export {UpdateWarehouseModal}




