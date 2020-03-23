import React from 'react';
import Routes from '../../routes.js'
import Welcome from "./Welcome";
import MainPage from "./MainPage";
import axios from "axios";

const NewHome = (props) => {

    return (
        <div className="container">
            {props.isSignedIn && (
                <div className="d-flex">
                    <MainPage/>
                    <a href={Routes.edit_user_registration_path()}>Edit Profile</a>
                    <a href={Routes.destroy_user_session_path()} >Logout</a>

                    {/*<a href='#' onClick={(event) => getLogoutRequested(event)}>Logout</a>*/}
                </div>
            )}
            {!props.isSignedIn && (
                <div className="d-flex">
                    <Welcome/>
                    <a href={Routes.new_user_session_path()}>Login</a>
                    <a href={Routes.new_user_registration_path()}>Sign In</a>

                </div>
            )}

        </div>
    );
};
export default NewHome

