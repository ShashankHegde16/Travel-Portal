import React, { Component } from 'react';
import loader from '../assets/logo/giphy.gif';
import { connect } from "react-redux";


class Loader extends Component {

    render() {
        const { showModal } = this.props;
        console.log('in here', showModal);
        if (!showModal) return null;
        return (
            <div className="loader-container">
                <div className="loader">
                    <img src={loader}></img>
                </div>

            </div>
        )
    }
}
const mapStatetoProps = ({ modalReducer: { showModal } }) => {
    console.log(showModal)
    return { showModal };
}

export default connect(mapStatetoProps)(Loader);