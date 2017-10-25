import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router';
import { School } from '../models/School'
import "./FavoriteList.css"

let userListID="";
  
// function to format floats in table display
function formatFloat(cell, row) {
    return Intl.NumberFormat().format(cell);
}

class FavoriteList extends Component {
    data = [];
    user;

    // on component mount, and currentUser available, lets initialize user and ID for schoolList (to be used for delete school)
    componentDidMount(){
        if(this.props.currentUser.id){
            this.user = this.props.currentUser;
            userListID = this.user.schoolList.id;
        }
    }

    // method to delete school from Favorites list
    deleteFavoriteSchool = (event) => {
        let schoolToDelete = event.target.id
        // need to send the ListID and the schoolID for the school we wish to delete
        this.props.deleteSchoolFromFavoriteList(userListID, schoolToDelete);
    }
    
    // formatting for link to external school url
    linkFormatter(cell, row) {return '<a href="http://'+cell+'" target="_blank">'+cell+'</a>';}

    // formatting for link to internal school details page
    internalLinkFormatter(cell, row) {return '<a href=schooldetails/'+cell+' target="_blank">Details</a>';}

    // formatting for currency fields on table
    formatCurrency(cell, row) {return "$"+cell.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}

    // formatting for admission rate percentage field on table
    formatAdminRate(cell, row) {return cell + "%"}

    // formatting for delete button on table
    buttonFormatter = (cell, row) => {return <Button id={cell} bsStyle="danger" bsSize="xsmall" onClick={this.deleteFavoriteSchool} >Delete</Button>;}

    render() {
        // if state has been updated with deletedSchool, we need to refresh our currentUser info
        if(this.props.deletedSchool){
            this.props.refreshUser();
            this.user = this.props.currentUser;
            userListID = this.user.schoolList.id;
        }

        // only step into our render logic if we have a schoolList on our currentUser
        if(this.props.currentUser.schoolList.schools){
            // let's use an arrow function to map schoolList.schools to this.data for our table
            this.data = this.props.currentUser.schoolList.schools.map(
              school => {
                return { 
                  id: school.schoolApiId,
                  favSchoolId: school.id,
                  name: school.schoolName,
                  netCost: school.avgNet,
                  inState: school.inState,
                  outState: school.outState,
                  location: school.schoolLocation,
                  size: school.size,
                  state: school.state,
                  admission: Math.round(school.admission * 100),
                  highestDegree: school.highestDegree,
                  ownership: school.ownership,
                  schoolUrl: school.schoolUrl
                }
              }
            )
          
          // return inside the if (schoolList) logic
          return (
            // fancy React-Bootstrap table
            <div className="container favoriteTable">
                <h1 className="faveTitle">Your Favorite List</h1>
                <BootstrapTable data={ this.data } search exportCSV={ true } pagination striped>
                    {<TableHeaderColumn row='0' rowSpan='2' dataField='favSchoolId' width={'65'} dataFormat={this.buttonFormatter}></TableHeaderColumn>}
                    {<TableHeaderColumn row='0' rowSpan='2' dataField='id' isKey={ true } width={'50'} dataFormat={this.internalLinkFormatter}></TableHeaderColumn>}
                    <TableHeaderColumn row='0' colSpan='7'>Basic School Info</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataField='name' dataSort width={"250"} filter={ { type: 'TextFilter', delay: 400 } }>Name</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataField='size' dataSort width={'120'} filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                    dataFormat={ formatFloat }>Size</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataField='location' dataSort width={'120'} filter={ { type: 'TextFilter', delay: 400 } }>Location</TableHeaderColumn>
                    <TableHeaderColumn id="state" row='1' dataField='state' dataSort width={'120'} filter={ { type: 'TextFilter', delay: 400 } }>ST</TableHeaderColumn>
                    {<TableHeaderColumn row='1' dataField='admission' dataSort width={'120'} filter={ { type: 'TextFilter', delay: 400 } } dataFormat={ this.formatAdminRate }>Admission %</TableHeaderColumn>}
                    <TableHeaderColumn row='1' dataField='highestDegree' dataSort width={'120'} filter={ { type: 'TextFilter', delay: 400 } }>Highest Degree</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataField='schoolUrl' dataFormat={this.linkFormatter} dataSort width={'150'} filter={ { type: 'TextFilter', delay: 400 } }>School URL</TableHeaderColumn>
                    <TableHeaderColumn row='0' colSpan='3'>School Cost Information</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataField='inState' dataSort width={'120'} filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                    dataFormat={ this.formatCurrency }>In-State</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataField='outState' dataSort width={'120'} filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                    dataFormat={ this.formatCurrency }>Out-of-State</TableHeaderColumn>
                    <TableHeaderColumn row='1' dataField='netCost' dataSort  width={'120'} filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                    dataFormat={ this.formatCurrency }>Avg Net</TableHeaderColumn>
              </BootstrapTable>

              <footer className="footer navbar-fixed-bottom">
                    <div className="preferences">
                        <h3>&copy; </h3>
                        <h2 className="heading" display="hidden"> 2017</h2><br />
                    </div>
              </footer>
              <script src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.js" />
            </div>
          );
        }
        //return outside the if for when we have no favorites list
        return (
        <div>
            <h1>There are currently no schools in your favorites list</h1>
        </div>
        )
    }
}

export default FavoriteList;
