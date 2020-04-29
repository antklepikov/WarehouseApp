import React, {useState, useEffect} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import axios from 'axios'
import concat from 'lodash/concat';
import ReactOnRails from 'react-on-rails';
import {UpdateWarehouseModal} from "./UpdateWarehouseModal";

const AddNewWarehouseModal = (props) => {

    const {buttonLabel, className, setList, list} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [headData, setHeadData] = useState({title: '', number: '', address: ''});


    const createWarehouse = () => {
        axios.post('/warehouse', {
            warehouse: {
                title: headData.title,
                number: headData.number,
                address: headData.address
            }
        }, {
            headers: ReactOnRails.authenticityHeaders()
        })
            .then((result) => {
                console.log(result);
                setList(concat(list, result.data));
            })
            .catch((result) => {
                console.log(result)
            })
    };
    return (
        <div>

            <Button className="btn btn-warning" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Create warehouse</ModalHeader>
                <ModalBody>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Title:</td>
                            <td>
                                <input name="title" type="text" value={headData.title}
                                       onChange={(e) => setHeadData({...headData, title: e.target.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Number:</td>
                            <td>
                                <input name="number" type="number" value={headData.number}
                                       onChange={(e) => setHeadData({...headData, number: e.target.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>
                                <input name="address" type="text" value={headData.address}
                                       onChange={(e) => setHeadData({...headData, address: e.target.value})}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <input className="btn btn-warning" type="submit" value="Отправить" onClick={createWarehouse}/>
                </ModalBody>

                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );


};
export {AddNewWarehouseModal}




