import React from 'react';
import Routes from '../../routes.js'
import {createUseStyles} from 'react-jss'
import clsx from 'clsx';
import Button from '@material-ui/core/Button'


const useStyles = createUseStyles({
        fontSize: {
            fontSize: 40,
        },
        boxShadow: {
            boxShadow: [0,5,5,3, 'lightgrey'],
        }
    }
);

const MainHeader = (props) => {
    const classes = useStyles()

    return (
        <div className={clsx("container main-header mb-4", classes.boxShadow)}>
            <div className="d-flex">
                <h1 className="font-italic">Warehouses & Stores</h1>
            </div>
            {props.isSignedIn && (
                <div className="d-flex">
                    <div className='mt-10'>
                        <Button variant="contained" color="default" href="/warehouse" className="mr-4">Your warehouses</Button>
                        <Button variant="contained" color="default" href="/store" className="mr-4">Your stores</Button>

                    </div>
                    <div className="ml-auto">
                        <Button variant="contained" color="primary" href={Routes.edit_user_registration_path()} className="mr-4">Edit profile</Button>
                        <Button variant="contained" color="secondary" href={Routes.destroy_user_session_path()} className="mr-4">Logout</Button>
                        <div className={clsx('mb-4 font-italic', classes.fontSize)}>User: {props.currentUser.first_name} {props.currentUser.last_name}</div>
                    </div>
                </div>
            )}
            {!props.isSignedIn && (
                <div className="d-flex">
                    <Button variant="contained" color="primary" href={Routes.new_user_session_path()} className="mr-4">Login</Button>
                    <Button variant="contained" color="primary" href={Routes.new_user_registration_path()} className="mr-4">Sign In</Button>
                    {/*<a href={Routes.new_user_session_path()} type='button' className="btn btn-info">Login</a>*/}
                    {/*<a href={Routes.new_user_registration_path()} type='button' className="ml-4 btn btn-info">Sign In</a>*/}
                </div>
            )}
        </div>
    );
};

export default (props) => <MainHeader {...props} />;
