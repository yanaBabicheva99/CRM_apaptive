import React from 'react';
import {getPrice, getWeight} from "../../../utils/Products";
import TableHeader from "../tableHeader/TableHeader";
import TableBody from "../tableBody/TableBody";
import {Link} from "react-router-dom";
import {useUser} from "../../../hooks/useUser";
import styleBox from "../Table.module.scss";

const SalesTable = ({sellProducts}) => {
    const {user, loading} = useUser();

    if (loading) {
        return <h2>Loading...</h2>
    }

    const columns = {
        productName: {
            path: 'productName',
            name: 'Product name',
        },
        store: {
            path: 'store',
            name: 'Store'
        },
        address: {
            path: 'address',
            name: 'Address',
            component: () => user.address.trim() || <Link to='/personal'>address</Link>
        },
        category: {
            path: 'category',
            name: 'Category'
        },
        creationData: {
            path: 'creationData',
            name: 'Creation date',
        },
        price: {
            path: 'price',
            name: 'Price',
            component: (product) => getPrice(product.price)
        },
        quantity: {
            path: 'quantity',
            name: 'Sold items'
        },
        weight: {
            path: 'weight',
            name: 'Weight/Volume',
            component: (product) => getWeight(product.weight)
        },
        lastSale: {
            path: 'lastSale',
            name: 'Last sale',
        },
    }
    return(
        <div className={styleBox.box__wrapper}>
            <div className={styleBox.box}>
                <table>
                    <TableHeader columns={columns}/>
                    <TableBody columns={columns} items={sellProducts}/>
                </table>
            </div>
        </div>
    );
};

export default SalesTable;