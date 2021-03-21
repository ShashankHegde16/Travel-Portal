import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import { getTransactions, getProducts } from '../../actions';
import Select from '../Dropdowns';
import { sortOptions, priceRange, booking } from '../../config/options';
import TravelList from './TravelList';



const Main = (props) => {
    const [sortBy, setSortOption] = useState('price');
    const [product_title, setProducts] = useState('');
    const [price, setPrice] = useState('');
    const [total_booking_count, setBooking] = useState('');

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);



    function handlePageChange(page) {
        setPage(page);
    }

    function prepareReqObj() {
        return {
            limit,
            page,
            sortBy,
            direction: -1,
            searchBy: product_title,
            price,
            bookings: total_booking_count
        }
    }

    useEffect(() => {

        props.getProducts();
    }, []);


    useEffect(() => {
        const request = prepareReqObj();
        props.getTransactions(request);
    }, [sortBy, product_title, price, page, limit, total_booking_count]);

    function handleReset() {
        setProducts('');
        setPrice('');
        setBooking('')
    }

    return (
        <Container>
            <Grid container verticalAlign textAlign >
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Select
                            options={sortOptions}
                            value={sortBy}

                            color={"red"}
                            label={"Select Sort Choice"}
                            handleChange={(e, v) => setSortOption(v.value)}
                        />

                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Select
                            options={props.products}
                            value={product_title}
                            color={"red"}

                            label={"Select Product Title"}
                            handleChange={(e, v) => { setProducts(v.value) }}
                        >
                        </Select>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Select
                            options={priceRange}
                            value={price}
                            color={"red"}
                            label={"Starting Price From "}
                            handleChange={(e, v) => { setPrice(v.value) }}
                        >
                        </Select>

                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Select
                            options={booking}
                            value={total_booking_count}
                            color={"red"}
                            label={" Max Booking Count"}
                            handleChange={(e, v) => { setBooking(v.value) }}
                        >
                        </Select>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row >
                    <Grid.Column width={16}>
                        <TravelList
                            page={page}
                            pageSetter={handlePageChange}
                            resetFilter={handleReset}
                            currentPage={page} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}
function mapStatetoProps({ products }) {
    return { products };
}

export default connect(mapStatetoProps, { getTransactions, getProducts })(Main);