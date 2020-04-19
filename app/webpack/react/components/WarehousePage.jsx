// React Core
import React, {useState, useEffect} from 'react';
// Libs
import axios from 'axios';
import {UpdateWarehouseModal} from "./UpdateWarehouseModal";
import {map, without, find} from 'lodash';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropdownItemOrder from "./DropdownItemOrder";
import Routes from "../../routes";
import ReactPaginate from 'react-paginate';


const WarehousePage =({warehouse, order, productsOrder}) => {
    console.log("props", warehouse, order, productsOrder);
    const [productData, setProductData] = useState({title: '', products_count: ''});

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0)

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        axios.get(`/warehouse/${warehouse.id}/product`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            params: {
                page: page,
            }
        })
            .then((response) => {
                console.log("response", response)
                setProducts(response.data);
                // setTotalPages(response.)
            });
    }, [page]);

    const createProduct = () => {
        axios.post(`/warehouse/${warehouse.id}/product`, {
            product: {
                title: productData.title,
                products_count: productData.products_count
            },
        }, {
            headers: ReactOnRails.authenticityHeaders()
        })
            .then((result) => {
                console.log(result);
                setProductData(result.data);
            })
            .catch((result) => {
                console.log(result)
            })
    };

    const onChangePage = ({selected}) => {
        const pageToGo = selected + 1;
        if (pageToGo !== page) {
            setPage(pageToGo);
        }
    };
    return (
        <div className='container'>
            <div className="d-flex">
                <div>
                    <div className="font-weight-bold">
                        Title of warehouse:
                        <h4 className="font-italic font-weight-light">
                            {warehouse.title}
                        </h4>
                    </div>
                    <div className="font-weight-bold">
                        Number of warehouse:
                        <h4 className="font-italic font-weight-light">
                            {warehouse.number}
                        </h4>
                    </div>
                    <div className="font-weight-bold">
                        Address of warehouse:
                        <h4 className="font-italic font-weight-light">
                            {warehouse.address}
                        </h4>
                    </div>
                </div>
                <UpdateWarehouseModal warehouse={warehouse}/>

                <Dropdown className="ml-2 " isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        Orders
                    </DropdownToggle>
                    <DropdownMenu>
                        {map(productsOrder,(orderItem, key) => {
                            return (
                                <DropdownItem key={key} href="/store/:store_id/order/:id">
                                    {/*<DropdownItemOrder warehouse={warehouse} product={products} orderItem={orderItem} productsOrder={productsOrder}/>*/}

                                    <div key={key} className="d-flex">
                                        <div className="mr-2">{orderItem.order.count}{orderItem.ordered_product[0].title}</div>
                                    </div>
                                </DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </Dropdown>

                <div className="ml-auto text-center">
                    Add new product:
                    <div className="mb-2">
                        <input name="title"
                               type="text"
                               placeholder="title"
                               value={productData.title || ''}
                               onChange={(e) => setProductData({...productData, title: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <input name="products_count"
                               type="text"
                               placeholder="count"
                               value={productData.products_count || ''}
                               onChange={(e) => setProductData({...productData, products_count: e.target.value})}/>
                    </div>

                    <input className="btn btn-warning mb-2" type="submit" value="Отправить" onClick={createProduct}/>
                </div>
            </div>
            <div className="d-flex products-block">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Title</th>
                        <th scope="col">Count</th>
                    </tr>
                    </thead>
                <tbody>

                    {map(products, (productItem, key) => {
                        if (productItem.products_count > 0) {
                            return (
                                <tr key={`productItem-${productItem.id}-${key}`}>
                                    <td>
                                        {key + 1})
                                    </td>
                                    <td>
                                        {productItem.title}
                                    </td>
                                    <td>
                                        {productItem.products_count}
                                    </td>

                                </tr>
                            )
                            }

                        }
                    )
                    }
                </tbody>
                </table>
                <ReactPaginate
                    previousLabel={
                        <div className="page-item d-flex justify-content-center">
                            <div className="page-link">
                                {'<'}
                            </div>
                        </div>
                    }
                    nextLabel={
                        <div className="page-item d-flex justify-content-center">
                            <div className="page-link">
                                {'>'}
                            </div>
                        </div>
                    }
                    breakLabel={
                        <div className="page-item d-flex justify-content-center">
                            <div className="page-link">...</div>
                        </div>
                    }
                    pageClassName='page-item page-link '
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    containerClassName={'pagination justify-content-center'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    onPageChange={onChangePage}
                    hrefBuilder={()=>`/warehouse/${warehouse.id}/product`}
                />
            </div>
        </div>
    )
};

const WarehousePageChange = React.memo(WarehousePage);

export default (props) => <WarehousePageChange {...props} />;