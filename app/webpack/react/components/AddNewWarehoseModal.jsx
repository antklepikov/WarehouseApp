import React, {useState, useEffect} from 'react';
import Modal from 'reactstrap/es/Modal'
import ModalHeader from 'reactstrap/es/ModalHeader'
import ModalBody from 'reactstrap/es/ModalBody'
import ModalFooter from 'reactstrap/es/ModalFooter'
import axios from 'axios'
import concat from 'lodash/concat';
import map from 'lodash/map';
import ReactOnRails from 'react-on-rails';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {createUseStyles} from 'react-jss'
import clsx from 'clsx'
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


const useStyles = createUseStyles({
        goldButton: {
           backgroundColor: "#FFD700 !important"
        },

    }
);
const AddNewWarehouseModal = (props) => {
    const classes = useStyles()
    const {buttonLabel, setList, list} = props;
    const [modal, setModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [textError, setTextError] = useState('')
    const toggle = () => setModal(!modal);
    console.log(textError)
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
                if (result.data.error) {
                    setOpen(true);
                    setTextError(result.data.error);
                } else {
                    setList(concat(list, result.data.warehouse));
                }
            })
            .catch((error) => {
                console.log("error", error);
            })
    };

    const handleClose = () => {
        setOpen(false);
        setTextError('')
    };

    return (
        <div>

            <Button className={clsx("btn mb-4", classes.goldButton)} variant="outlined"  onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Create warehouse</ModalHeader>
                <ModalBody>
                    <div className="text-center">
                        <Snackbar open={open}  onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="error" variant='filled'>
                                {map(textError, (error, key)=>{
                                    return(
                                        <div key={key}>{error}<br></br></div>
                                    )

                                })}
                            </Alert>
                        </Snackbar>
                        <div>
                            <TextField id="outlined-title"
                                       className="mb-4 col-6"
                                       label="Title"
                                       variant="outlined"
                                       value={headData.title}
                                       onChange={(e) => setHeadData({...headData, title: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-number"
                                className="mb-4 col-6"
                                label="Number"
                                type="number"
                                variant="outlined"
                                value={headData.number}
                                onChange={(e) => setHeadData({...headData, number: e.target.value})}
                            />
                        </div>
                        <div>
                            <TextField id="outlined-address"
                                       className="mb-4 col-6"
                                       label="Address"
                                       variant="outlined"
                                       value={headData.address}
                                       onChange={(e) => setHeadData({...headData, address: e.target.value})}
                            />
                        </div>
                        <Button variant="outlined" color="primary" onClick={createWarehouse}>
                            Send
                        </Button>
                    </div>

                </ModalBody>

                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close modal</Button>
                </ModalFooter>
            </Modal>
        </div>
    );


};

AddNewWarehouseModal.propTypes = {
    buttonLabel: PropTypes.string,
    setList: PropTypes.func,
    list: PropTypes.array
}
export default AddNewWarehouseModal




