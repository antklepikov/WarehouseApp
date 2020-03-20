import React, {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SignInModal = (props) => {
    const { buttonLabel, className } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button className="btn btn-warning" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Привет подстрижися
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Warehouse user</Button>{' '}
                    <Button color="primary" onClick={toggle}>Store user</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export{SignInModal} ;