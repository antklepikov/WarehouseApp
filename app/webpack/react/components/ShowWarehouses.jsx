import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {AddNewWarehoseModal} from "./AddNewWarehoseModal";


const ShowWarehouses = () => {

    return (
        <div className="container">
            <div className="main">
                <AddNewWarehoseModal buttonLabel="Add warehouse"/>
                <a href="/warehouse">Your warehouses</a>
                <h3>Отобразить все склады и магазины у данного пользователя</h3>
                <hr/>
            </div>
        </div>
    );

};
export default ShowWarehouses;