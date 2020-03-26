import React from 'react';
import Routes from '../../routes.js'

const MainHeader = (props) => {

    return (
        <div className="container">
            <div className="d-flex">
                <h1>Warehouses & Stores</h1>
            </div>
            {props.isSignedIn && (
                <div className="d-flex">
                    <a href="/warehouse">Your warehouses </a>
                    <a href="/stores">Your Stores</a>
                    <p>{props.currentUser.first_name}</p>
                    <a href={Routes.edit_user_registration_path()}>Edit Profile</a>
                    <a href={Routes.destroy_user_session_path()} >Logout</a>

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

