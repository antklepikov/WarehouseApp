import React from 'react';
import Routes from '../../routes.js'
import {createUseStyles} from 'react-jss'
import clsx from 'clsx';

const useStyles = createUseStyles({
        fontSize: {
            fontSize: 40,
        },
    }
);

const MainHeader = (props) => {
    const classes = useStyles()

    return (
        <div className="container main-header">
            <div className="d-flex">
                <h1>Warehouses & Stores</h1>
            </div>
            {props.isSignedIn && (
                <div className="d-flex">
                    <div className='mt-10'>
                        <a href="/warehouse" type='button' className="btn btn-success mr-4">Your warehouses </a>
                        <a href="/store" type='button' className="btn btn-success">Your Stores</a>
                    </div>
                    <div className="ml-auto">
                        <a href={Routes.edit_user_registration_path()} type='button' className="btn btn-info">Edit
                            Profile</a>
                        <a href={Routes.destroy_user_session_path()} type='button' className="ml-4 btn btn-info">Logout</a>
                        <div className={clsx('mb-4', classes.fontSize)}>User: {props.currentUser.first_name} {props.currentUser.last_name}</div>
                    </div>
                </div>
            )}
            {!props.isSignedIn && (
                <div className="d-flex">
                    <a href={Routes.new_user_session_path()} type='button' className="btn btn-info">Login</a>
                    <a href={Routes.new_user_registration_path()} type='button' className="ml-4 btn btn-info">Sign In</a>
                </div>
            )}
        </div>
    );
};

export default (props) => <MainHeader {...props} />;
