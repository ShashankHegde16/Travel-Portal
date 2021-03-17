import React, { Component } from 'react';
import { connect } from 'react-redux';

class Paginator extends Component {
    state = { index: 1 }

    handleCurrentPage = (evt, page) => {
        this.props.pageSetter(page);
    }

    renderPages() {
        const pager = this.getPageNumbers(this.props.count, this.state.index);
        return pager.map((page) => {
            return (<li
                className="page-item">
                <span className="page-link" onClick={(e) => this.handleCurrentPage(e, page)}>{page}</span>
            </li>);
        });

    }

    handleNextPage = (evt) => {
        this.setState({ index: this.state.index + 1 });
        this.props.pageSetter(this.state.index * 10 + 1); // next set of first page
    }
    handlePrevPage = (evt) => {
        const prevIndex = this.state.index - 1;
        this.setState({ index: prevIndex });
        this.props.pageSetter(prevIndex);
    }

    getPageNumbers(totalCount, index) {
        const pager = [];
        let totalPages = Math.ceil(totalCount / 10);
        let i = 0;
        let finalSize = 0;
        if (index * 10 < totalPages) {
            finalSize = index * 10;
        } else {
            finalSize = totalPages;
        }
        i = (index - 1) * 10;
        while (i < finalSize) {
            pager.push(i + 1);
            i = i + 1;
        }
        return pager;
    }

    render() {
        return (
            <nav style={{ marginTop: "2em" }}>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <span className="page-link" onClick={this.handlePrevPage}>&laquo;</span>
                    </li>
                    {this.renderPages()}
                    <li class="page-item">
                        <span className="page-link" onClick={this.handleNextPage}>&raquo;</span>
                    </li>
                </ul>

            </nav>
        );
    }
}


function mapStatetoProps({ transactions: { totalRecords } }) {
    return {
        count: totalRecords
    };
}

export default connect(mapStatetoProps)(Paginator);