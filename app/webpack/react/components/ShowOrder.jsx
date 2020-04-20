import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'
import {map, without, find} from 'lodash';

const ShowOrder = ({productOrder, order}) => {

    const [countForUpdate, setCountForUpdate] = useState(0)

    const approveOrder = () => {
        axios.put(`/order/${order.id}`, {status: 1})
            .then((result)=>{
                console.log("ok", result)
            })
            .catch((error)=>{
                console.log(error);
            })
    }



    return (
        <div className="container">

                    <div className="card col-6 text-center m-auto">
                        <div className="card-body">
                            <h1 className="card-title">Order from store</h1>
                            <div className="list-group-item d-flex">Title product: <p className="ml-2 font-weight-bold font-italic">{productOrder[0].title}</p></div>
                            <div className="list-group-item d-flex">Count in order: <p className="ml-2 font-weight-bold font-italic">{order.count}</p></div>
                            <div className="list-group-item d-flex">Total quantity in stock: <p className="ml-2 font-weight-bold font-italic">{productOrder[0].products_count}</p></div>

                            <input type="submit"
                                   className="btn btn-success mr-4 mt-2"
                                   value="Approve"
                                   onClick={approveOrder}/>
                            <input type="submit"
                                   className="btn btn-danger mr-4 mt-2"
                                   value="Decline"/>
                        </div>
                    </div>

        </div>
    );


};
export default (props) => <ShowOrder {...props} />;



