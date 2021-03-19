import React, { Component } from 'react';
import spinner from '../../assets/logo/spinner.gif';
import { connect } from "react-redux";
import { Modal, Image, } from 'semantic-ui-react'


class Loader extends Component {

    render() {
        const { open } = this.props;
        if (!open) return null;
        return (
            <Modal
                dimmer={"blurr"}
                open={open}
                centered
                style={{ background: "none" }}>
                <Modal.Content style={{ background: "none" }}>
                    <Image src={spinner} size="small" centered></Image>
                </Modal.Content>
            </Modal>
        )
    }
}
const mapStatetoProps = ({ modalReducer: { open } }) => {
    return { open };
}

export default connect(mapStatetoProps)(Loader);