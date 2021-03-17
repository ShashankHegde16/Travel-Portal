import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTransactions, getProducts } from '../../actions';
import DropDown from './Dropdowns';
import TravelList from './TravelList';
import Paginator from './Paginator';


const Main = (props) => {
    const [sortBy, setSortOption] = useState('destination');
    const [product_title, setProducts] = useState('Hong Kong Airport Express Train Tickets');
    const [price, setPrice] = useState('500');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const handleOptionChange = (event, key) => {
        switch (key) {
            case 'sort':
                setSortOption(event.target.value);
                break;
            case 'product':
                setProducts(event.target.value);
                break;
            default:
                setPrice(event.target.value);
        }

    };

    function handlePageChange(page) {
        setPage(page);
    }


    useEffect(() => {
        props.getProducts();
    }, []);


    useEffect(() => {
        props.getTransactions(page, limit, sortBy, -1, product_title);
    }, [sortBy, product_title, price, page, limit]);



    return (
        <div className="container" style={{ marginTop: "1em" }}>
            <DropDown
                sortBy={sortBy}
                product_title={product_title}
                price={price}
                handleChange={handleOptionChange} />
            <hr></hr>
            <TravelList />
            <Paginator page={page} pageSetter={handlePageChange} />
        </div>
    )

}


export default connect(null, { getTransactions, getProducts })(Main);