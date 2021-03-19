import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import you from '../assets/logo/you.png'
import { Image, Menu } from "semantic-ui-react";
import _ from 'lodash';

const MenuItems = [
    { as: Link, content: "Trip Lists", key: "list", to: "/" },
    { as: Link, content: "Geo Tracker", key: "track", to: "/geo" },
    { as: Link, content: "Chart Tracker", key: "plot", to: "/graph" }

];
class Header extends React.Component {


    render() {

        return (
            <div>
                <Menu inverted color={"black"} fixed="top">
                    <Menu.Item as={Link} to='/'>
                        <Image size="mini" src={you} className="white-bg" />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        {_.map(MenuItems, item => {
                            return (
                                <Menu.Item {...item}
                                    active={this.props.location.pathname == item.to} >
                                </Menu.Item>);
                        })}
                    </Menu.Menu>
                </Menu>

            </div>
        )
    }
}

export default withRouter(Header);