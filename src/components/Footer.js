import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import {User} from '../models/User'

import NavLoginContainer from '../containers/NavLogin'
import "./Navigation.css"

class Navigation extends Component {

    userDetails = <NavLoginContainer />;

    render() {

        // if(this.props.currentUser.id){
        //     console.log("Logged in")

        // }

        return (
            < Navbar inverse fixedTop collapseOnSelect className="navWindow">
                <Navbar.Header>
                <Navbar.Brand>

                        <Link to="/"><h1 className="logostyle">YOU<span className="logoSub">niversity</span></h1></Link>

                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {this.userDetails}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
