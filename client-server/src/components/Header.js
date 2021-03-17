import React from 'react';
import { Link } from 'react-router-dom';
import you from '../assets/logo/you.png'


class Header extends React.Component {



    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-ligth bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand " to=''>
                            <img src={you} alt="" width="40" height="40" className="d-inline-block align-top" />
                        </Link>

                        <button className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav  text-white me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to='/'>Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to='/geo'>Map</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to='/graph'>Timer</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;