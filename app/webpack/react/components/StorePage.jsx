// React Core
import React, {useState, useEffect} from 'react';
// Libs
import map from 'lodash/map';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NewOrderModal from '../components/NewOrderModal'
import {createUseStyles} from 'react-jss'
import PropTypes from 'prop-types';

const useStyles = createUseStyles({

    container: {
        maxHeight: 440,
    },
});


const StorePage = ({store, warehouses, productsInStores}) => {
    const classes = useStyles()
    return (
        <div className="container">
            <div className="font-weight-bold">
                Title of store:
                <h4 className="font-italic font-weight-light">
                    {store.title}
                </h4>

            </div>
            <NewOrderModal buttonLabel="Add order" warehouses={warehouses} store={store}/>
            <div className="mt-2">
                <div className=''>Products in this store:</div>

                <TableContainer component={Paper} className={classes.container}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Count in store</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsInStores.map((row, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {key}
                                </TableCell>
                                <TableCell align="center">{row.product.title}</TableCell>
                                <TableCell align="center">{row.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            </div>
        </div>
    );
};

StorePage.propTypes = {
    store: PropTypes.object,
    warehouses: PropTypes.array,
    productsInStores: PropTypes.array,
}
export default (props) => <StorePage {...props} />;