import React, { Component } from 'react'
import { NavItem, Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

import {User} from '../models/User'

import './NavLogin.css'

class NavLogin extends Component {
    
    loginUser = event => {
        event.preventDefault();
        let form = event.target
  
        let user = new User();
        user.username = form.username.value;
        user.password = form.password.value
  
        this.props.login(user)
            .then( result => {
                browserHistory.push('/searchresults');
            })
        
    }

    logoutUser = event => {
        event.preventDefault()
        this.props.logout()
        browserHistory.push('/');
    }
  
    render() {
        
        if(this.props.currentUser){
            
          let user = this.props.currentUser;
  
          return (
              <div>
                <Navbar.Text>
                      <Link className="navh4" to="/searchresults">Search Results</Link>
                </Navbar.Text>
                <Navbar.Text>
                      <Link className="navh4" to="/edituser">Edit Preferences</Link>
                </Navbar.Text>
                <Navbar.Text>
                      <Link className="navh4" to="/favoritelist">Favorites</Link>
                </Navbar.Text>
                <Navbar.Text pullRight className="signedin">
                      Signed in as: {user.firstName} {user.lastName}<Navbar.Link onClick={this.logoutUser} href="#" className="logoutlink">(Logout)</Navbar.Link>
                </Navbar.Text>
            </div>
          )
  
        }

        return (
            <div>
                <form onSubmit={this.loginUser}>
                    <Navbar.Form pullRight className="userLogin">
                        <FormGroup>
                            <FormControl name="username" type="text" placeholder="username" />
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <FormControl name="password" type="password" placeholder="password" />
                        </FormGroup>
                        {' '}
                        <Button type="submit" id="backbutton">Login</Button>
                    </Navbar.Form>

                    <Navbar.Text pullRight className="userOption">
                        <Link to="/register" className="createAccount">Create an Account</Link> 
                        <span className="loginOption">or Login&nbsp;<span className="glyphicon glyphicon-arrow-right"></span></span>

                    </Navbar.Text>
                </form>
            </div>
        );
    }
  }

  export default NavLogin;