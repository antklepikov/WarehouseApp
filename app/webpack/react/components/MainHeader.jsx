import React from 'react';
import Routes from '../../routes.js'

const MainHeader = (props) => {

    return (
        <div className="container main-header">
            <div className="d-flex">
                <h1>Warehouses & Stores</h1>
            </div>
            {props.isSignedIn && (
                <div className="d-flex block-header">
                    <div className='header-buttons'>
                        <a href="/warehouse" type='button' className="btn btn-success">Your warehouses </a>
                        <a href="/store" type='button' className="btn btn-success">Your Stores</a>
                    </div>
                    <div className="header-auth ">
                        <a href={Routes.edit_user_registration_path()} type='button' className="btn btn-info">Edit
                            Profile</a>
                        <a href={Routes.destroy_user_session_path()} type='button' className="btn btn-info">Logout</a>
                        <p>User: {props.currentUser.first_name} {props.currentUser.last_name}</p>
                    </div>
                </div>
            )}
            {!props.isSignedIn && (
                <div className="d-flex">
                    <a href={Routes.new_user_session_path()}>Login</a>
                    <a href={Routes.new_user_registration_path()}>Sign In</a>
                </div>
            )}
        </div>
    );
};

export default MainHeader;

