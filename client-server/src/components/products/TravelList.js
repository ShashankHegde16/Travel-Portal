import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Menu, Icon, Grid, Button } from 'semantic-ui-react'

const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
];

const columns = ['Product Title', 'Destination', 'Transaction Date', 'Price (HK$)', 'Bookings']

class TravelList extends Component {
    state = { index: 1 }

    getColors() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    handleCurrentPage = (page) => {
        this.props.pageSetter(page);
    }

    renderContent() {
        const { list } = this.props;
        return list.map((trans) => {
            return (
                <Table.Row key={trans._id}>
                    <Table.Cell>{trans.product_title}</Table.Cell>
                    <Table.Cell>{trans.destination}</Table.Cell>
                    <Table.Cell>{new Date(trans.created_at).toDateString()}</Table.Cell>
                    <Table.Cell>{Number(trans.price).toFixed(2).toLocaleString()}</Table.Cell>
                    <Table.Cell>{Number(trans.total_booking_count).toLocaleString()}</Table.Cell>
                </Table.Row>
            )
        });
    }
    renderColumns() {
        return columns.map(column => {
            return <Table.HeaderCell key={column}>{column}</Table.HeaderCell>
        });
    }

    getPageNumbers(totalCount, index) {
        const pager = [];
        let totalPages = Math.ceil(totalCount / 10);
        let i = 0;
        let finalSize = 0;
        if (index * 4 < totalPages) {
            finalSize = index * 4;
        } else {
            finalSize = totalPages;
        }
        i = (index - 1) * 4;
        while (i < finalSize) {
            pager.push(i + 1);
            i = i + 1;
        }
        return pager;
    }



    handleNextPage() {
        this.setState({ index: this.state.index + 1 });
        this.props.pageSetter(this.state.index * 4 + 1); // next set of first page
    }
    handlePrevPage() {
        const prevIndex = this.state.index - 1;
        this.setState({ index: prevIndex });
        this.props.pageSetter(prevIndex);
    }

    render() {
        const pager = this.getPageNumbers(this.props.count, this.state.index);


        if (this.props.count == 0) {
            return (
                <Grid>
                    <Grid.Row centered>
                        <h1>No Records Found!</h1>

                    </Grid.Row>
                    <Grid.Row centered>
                        <Button positive onClick={this.props.resetFilter}>Reset Filter</Button>

                    </Grid.Row>
                </Grid>


            )
        }
        return (
            <Table color={this.getColors()}>
                <Table.Header>
                    <Table.Row>
                        {this.renderColumns()}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.renderContent()}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>

                        <Table.HeaderCell colSpan='5'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon onClick={(e) => this.handlePrevPage()}
                                    disabled={this.state.index == 1}
                                >
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                {pager.map(page => {
                                    return (<React.Fragment>
                                        <Menu.Item
                                            key={page}
                                            as='a'
                                            active={page == this.props.currentPage}
                                            onClick={(e) => this.handleCurrentPage(page)}
                                        >{page}</Menu.Item>
                                    </React.Fragment>)
                                })
                                }
                                < Menu.Item as='a'
                                    icon
                                    onClick={(e) => this.handleNextPage()}
                                    disabled={this.state.index * 3 == Math.ceil(this.props.count / 10) || this.props.count == 0}>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table >);
    }
}

const mapStatetoProps = ({ transactions: { totalRecords, list } }) => {
    return {
        count: totalRecords,
        list
    };
}

export default connect(mapStatetoProps)(TravelList);