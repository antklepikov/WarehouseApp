import React, {useState, useEffect} from 'react';
import Button from 'reactstrap/es/Button'
import Modal from 'reactstrap/es/Modal'
import ModalHeader from 'reactstrap/es/ModalHeader'
import ModalBody from 'reactstrap/es/ModalBody'
import ModalFooter from 'reactstrap/es/ModalFooter'
import axios from 'axios'
import concat from 'lodash/concat';
import forEach from 'lodash/forEach';
import join from 'lodash/join';
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
                console.log("success",result);
                if (result.data.error){
                    alert(join(result.data.error, '\n')
                    )
                }
                else{
                    setList(concat(list, result.data));
                }

            })
            .catch((error) => {
                console.log("error", error);
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




