import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';


const ShowOrder = ({productOrder, productCount}) => {

    const approveOrder = () => {
        axios.put(`/order/${productOrder.id}`, {status: 1})
            .then((result)=>{
                console.log("ok", result)
            })
            .catch((error)=>{
                console.log(error);
            })
        axios.get(`/store/${productOrder.store_id}`, {order: {productOrder}})
            .then((res)=>{
                console.log(res)
            })
    }
    const declineOrder = () => {
        axios.put(`/order/${productOrder.id}`, {status: 2})
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
                <a href={`/warehouse/${productOrder.warehouse_id}`} type="button" className="btn btn-outline-info">Back to
                    warehouse</a>
            </div>
            <div className="card col-6 text-center m-auto">
                <div className="card-body">
                    <h1 className="card-title">Order from store</h1>
                    <div className="list-group-item d-flex">
                        Title product:

                        <p className="ml-2 font-weight-bold font-italic">{productOrder.product.title}</p>

                    </div>
                    <div className="list-group-item d-flex">
                        Count in order:
                        <p className="ml-2 font-weight-bold font-italic">{productOrder.count}</p>
                    </div>
                    <div className="list-group-item d-flex">
                        Total quantity in stock:
                        <p className="ml-2 font-weight-bold font-italic">{productCount.products_count}</p>
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
ShowOrder.propTypes = {
    productCount: PropTypes.object,
    productOrder: PropTypes.object,
}
export default (props) => <ShowOrder {...props} />;



