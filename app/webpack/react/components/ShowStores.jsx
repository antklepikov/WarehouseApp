// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import map from 'lodash/map';
import {createUseStyles} from 'react-jss'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
// Components

const useStyles = createUseStyles({
        scroll: {
            fontSize: 20,
            overflowY: 'auto',
            height: 400,
            display: 'block',
        },

    }
);

const ShowStores = ({stores}) => {
    const [open, setOpen] = useState(false);
    const [textError, setTextError] = useState('')
    const [storeData, setStoreData] = useState({title: ''});
    const classes = useStyles()

    const createStore = () => {
        axios.post(`/store`, {
        store: {
            title: storeData.title,
        },
    }, {
        headers: ReactOnRails.authenticityHeaders()
    })
        .then((result) => {
            if (result.data.error) {
                setOpen(true);
                setTextError(result.data.error);
            } else {
                setStoreData(result.data);
            }

        })
        .catch((result) => {
            console.log(result)
        })
    };

    const handleClose = () => {
        setOpen(false);
        setTextError('')
    };
  return (
      <div className={clsx("container d-flex", classes.scroll)}>
          <TableContainer className="mr-auto col-6 " component={Paper}>
              <Table stickyHeader aria-label="sticky table" className={classes.scroll}>
                  <TableHead>
                      <TableRow>
                          <TableCell>№</TableCell>
                          <TableCell align="center">Title</TableCell>
                          <TableCell align="center">Show</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {stores.map((row, key) => (
                          <TableRow key={key}>
                              <TableCell component="th" scope="row">
                                  {key}
                              </TableCell>
                              <TableCell align="center">{row.title}</TableCell>
                              <TableCell align="center">
                                  <Button variant="outlined" color="primary" href={`/store/${row.id}`}>
                                      Show {row.title}
                                  </Button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>

              </Table>
          </TableContainer>

          <div className='ml-auto text-center'>
              <p className="font-italic">Add new store</p>
              <Snackbar open={open}  onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                  <Alert onClose={handleClose} severity="error" variant='filled'>
                      {map(textError, (error, key)=>{
                          return(
                              <div key={key}>{error}<br></br></div>
                          )

                      })}
                  </Alert>
              </Snackbar>
              <div className="mb-2">
                  <TextField id="standard-basic"
                             label="title"
                             value={storeData.title || ''}
                             onChange={(e) => setStoreData({...storeData, title: e.target.value})}/>
              </div>
              <Button variant="contained" color="primary" onClick={createStore}>
                  Send
              </Button>
          </div>
      </div>
  );
};

ShowStores.propTypes = {
    stores: PropTypes.array,
}
export default (props) => <ShowStores {...props} />;