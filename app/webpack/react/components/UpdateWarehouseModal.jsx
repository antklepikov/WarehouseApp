import React, {useState, useEffect, useRef} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios'
import PropTypes from 'prop-types';
import NewOrderModal from "./NewOrderModal";

const UpdateWarehouseModal = ({warehouse}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [updateData, setUpdateData] = useState({title: warehouse.title, number: warehouse.number, address: warehouse.address});

    const updateWarehouse = () => {
        axios.put(`/warehouse/${warehouse.id}`, {warehouse:{title: updateData.title, number: updateData.number, address: updateData.address}})
            .then((result) => {
                console.log('SUCCESS', result);
                setUpdateData(list.splice(warehouse.id, 1, updateData));
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
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update warehouse</ModalHeader>
                <ModalBody>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Title:</td>
                            <td>
                                <input name="title" type="text" value={updateData.title}
                                       onChange={(e) => setUpdateData({...updateData, title: e.target.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Number:</td>
                            <td>
                                <input name="number" type="number" value={updateData.number}
                                       onChange={(e) => setUpdateData({...updateData, number: e.target.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>
                                <input name="address" type="text" value={updateData.address}
                                       onChange={(e) => setUpdateData({...updateData, address: e.target.value})}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <input className="btn btn-warning" type="submit" value="Отправить"
                           onClick={() => updateWarehouse(warehouse.id)}/>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

UpdateWarehouseModal.propTypes = {
    warehouse: PropTypes.object,
}

export default UpdateWarehouseModal




