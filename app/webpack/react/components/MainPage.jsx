import PropTypes from 'prop-types';
import React from 'react';
import {AddNewWarehoseModal} from './AddNewWarehoseModal'
const MainPage = () => {

    return (
        <div className="container">

            <div className="main">
                <AddNewWarehoseModal />
                <a href="/warehouse">Your warehouses</a>
                <h3>Отобразить все склады и магазины у данного пользователя</h3>
                <hr/>
            </div>

        </div>
    );

};
export default MainPage;

