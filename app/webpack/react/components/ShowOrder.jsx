import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'

const ShowOrder = ({productOrder, order}) => {

    const approveOrder = () => {
        axios.put(`/order/${order.id}`, {status: 1})
            .then((result)=>{
                console.log("ok", result)
            })
            .catch((error)=>{
                console.log(error);
            })
        axios.get(`/store/${order.store_id}`, {order: {order}})
            .then((res)=>{
                console.log(res)
            })
    }
    const declineOrder = () => {
        axios.put(`/order/${order.id}`, {status: 2})
            .then((result)=>{
                console.log("ok", result)
            })
            .catch((error)=>{
                console.log(error);
            })
    }


    return (
        <div className="container d-flex">
            <div>
                <a href={`/warehouse/${order.warehouse_id}`} type="button" className="btn btn-outline-info">Back to
                    warehouse</a>
            </div>
            <div className="card col-6 text-center m-auto">
                <div className="card-body">
                    <h1 className="card-title">Order from store</h1>
                    <div className="list-group-item d-flex">
                        Title product:

                        <p className="ml-2 font-weight-bold font-italic">{productOrder.orderedProduct.title}</p>

                    </div>
                    <div className="list-group-item d-flex">
                        Count in order:
                        <p className="ml-2 font-weight-bold font-italic">{order.count}</p>
                    </div>
                    <div className="list-group-item d-flex">
                        Total quantity in stock:
                        <p className="ml-2 font-weight-bold font-italic">{productOrder.productsCount.products_count}</p>
                    </div>

                    <input type="submit"
                           className="btn btn-outline-success mr-4 mt-2"
                           value="Approve"
                           onClick={approveOrder}/>
                    <input type="submit"
                           className="btn btn-outline-danger mr-4 mt-2"
                           value="Decline"
                           onClick={declineOrder}/>
                </div>
            </div>

        </div>
    );


};
export default (props) => <ShowOrder {...props} />;



