import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router';
import { School } from '../models/School'
import './SearchResults.css';

import SchoolDetailsContainer  from "../containers/SchoolDetails";

let userListID="";
let userListSize="";

class SearchResults extends Component {
    data = [];//this will hold all data returned from the api for school search results
    user;//this will hold all data returned from the api for user information
    localFavorites = new Array(0);//create blank array to store favorites

    componentDidMount(){//run if application loads appropriately
        if(this.props.currentUser){//if user information is available
            this.user = this.props.currentUser;
            userListID = this.user.schoolList.id;
            userListSize = this.user.schoolList.schools.length;
            this.props.getSchools(this.user.preferences.location, this.user.preferences.major)
            this.loadFavorites(this.user.schoolList.schools);
        }  
    }

    afterTabChanged() {
        this.refs.searchResultTable.forceUpdate();
    }

    linkFormatter(cell, row) {//formats link as an external html link
        return '<a href="http://'+cell+'" target="_blank">'+cell+'</a>';
    }

    internalLinkFormatter = (cell, row) => {
        return <a id={cell} onClick={this.showModal} href="#" target="_blank">Details</a>
    }

    showModal = event => {
        event.preventDefault()
        this.props.selectedSchoolID = event.target.id;
        this.props.showSchoolDetails = true;
    }

    loadFavorites(listFromUser) {//loads current favorite list for user
        for(let i = 0; i < listFromUser.length; i++)
        {this.localFavorites[i]=listFromUser[i].schoolName;}
    }
    
    onRowSelect = (row, isSelected, e, rowIndex) => {//adding a favorite to the favorite list of the user
        let rowStr = '';
        let schoolInfo = new School();
        for (const prop in row) {
          rowStr += prop + ': "' + row[prop] + '"';
          switch(prop){
            case 'id': {schoolInfo.schoolApiId = row[prop] } break;
            case 'name':{schoolInfo.schoolName = row[prop]} break;
            case 'netCost':{schoolInfo.avgNet = row[prop]} break;
            case 'inState':{schoolInfo.inState = row[prop]} break;
            case 'outState':{schoolInfo.outState = row[prop]} break;
            case 'location':{schoolInfo.schoolLocation = row[prop]} break;
            case 'size':{schoolInfo.size = row[prop]} break;
            case 'state':{schoolInfo.state = row[prop]} break;
            case 'admission':{schoolInfo.admission = row[prop]} break;
            case 'ownership':{schoolInfo.ownership = row[prop]} break;
            case 'highestDegree':{schoolInfo.highestDegree = row[prop]} break;
            case 'schoolUrl':{schoolInfo.schoolUrl = row[prop]} break;
            case 'comment':{schoolInfo.comment = row[prop]} break;
            case 'rank':{schoolInfo.rank = row[prop]} break;
          }
        }
        this.props.addSchoolToFavoriteList(userListID, schoolInfo);
      }

      onSelectAll(isSelected, rows) {//select all not currently supported
        if (isSelected) {alert('Select All not currently supported, please deselect and select each individual school to add to your Favorites List');} 
    }

    formatFloat(cell, row) {return cell.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}//convert number with a comma inserted when appropriate

    formatCurrency(cell, row) {return "$"+cell.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}//convert number with a comma and dollar sign when appropriate

    selectRowProp = {//middle man method that drives activity based on what is selected in the table
        mode: 'checkbox',
        onSelect: this.onRowSelect,
        onSelectAll: this.onSelectAll
    };

    render() {
        let favorites = this.localFavorites.map(function(value, key){return <li key={key}>{value}</li>;})
       
        if(this.props.addedSchool){
            console.log(this.props.addedSchool)
            this.props.refreshUser();
            this.loadFavorites(this.props.addedSchool.schools);
        }
            
        const getDegree = {//lookup for degree value type in api
            0: 'Non-Degree-Granting',
            1: 'Certificate',
            2: 'Associate',
            3: "Bachelor's",
            4: 'Graduate'
        }
        
        const getOwnership = {//lookup for ownership value type in api
            1: "Public",
            2: "Private N-P",
            3: "Private F-P"
        }
      
        const getLocale = {//lookup for locale value type in api
            11:"City: 250k+",
            12:"City: 100-250k",
            13:"City: <100k",
            21:"Suburb: 250k+",
            22:"Suburb: 100-250k",
            23:"Suburb: <100k",
            31:"Town: Fringe",
            32:"Town: Distant",
            33:"Town: Remote",
            41:"Rural: Fringe",
            42:"Rural: Distant",
            43:"Rural: Remote"
        }

        if(this.props.searchResults && Array.isArray(this.props.searchResults) && this.user){
            this.data = this.props.searchResults.map(
              school => {
                let temp = parseInt(school['2015.cost.avg_net_price.overall'])
                let nameLink = school['school.school_url']
                return { 
                  id: school.id,
                  name: school['school.name'],
                  netCost: temp,
                  inState: school["2015.cost.tuition.in_state"],
                  outState: school["2015.cost.tuition.out_of_state"],
                  location: getLocale[school["school.locale"]],
                  size: school["2015.student.size"] + school["2015.student.grad_students"],
                  state: school["school.state"],
                  admission: school["2015.admissions.admission_rate.overall"],
                  highestDegree: getDegree[school["school.degrees_awarded.highest"]],
                  ownership: getOwnership[school["school.ownership"]],
                  schoolUrl: nameLink
                }
              }
            )
          
        return (
            // Main container for the page
            <div className="searchDashboard">

                {/* main table of all that is the data for the search results */}
                <div className="container searchTable">
                    {/* help with user experience and instruction */}
                    <div className="instructions">
                        <p className="tip"><span className="glyphicon glyphicon-arrow-right"></span>TIP: Click Favorites section heading to open your Favorites List</p>
                        <p className="tip"><span className="glyphicon glyphicon-arrow-down"></span>TIP: Utilize NONE, ONE, or ALL filters below to find prospective schools</p>
                        <p className="tip"><span className="glyphicon glyphicon-arrow-down"></span>TIP: Click checkbox to add a school to your Favorites List</p>
                    </div>
                    <BootstrapTable ref="searchResultTable" data={ this.data } selectRow={ this.selectRowProp } search exportCSV={ true } pagination striped>
                        <TableHeaderColumn row='0' rowSpan='2' dataField='id' isKey={ true } width={'55'} dataFormat={this.internalLinkFormatter}></TableHeaderColumn>
                        <TableHeaderColumn row='0' colSpan='4'>Basic School Info</TableHeaderColumn>
                        <TableHeaderColumn row='1' dataField='name' dataSort width={"250"} filter={ { type: 'TextFilter', delay: 400 } }>Name</TableHeaderColumn>
                        <TableHeaderColumn row='1' dataField='size' dataSort width={'120'} filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                        dataFormat={ this.formatFloat }>Size</TableHeaderColumn>
                        <TableHeaderColumn id="state" row='1' dataField='state' width={'120'} dataSort filter={ { type: 'TextFilter', delay: 400 } }>ST</TableHeaderColumn>
                        <TableHeaderColumn row='1' dataField='schoolUrl' dataFormat={this.linkFormatter} width={'150'} dataSort filter={ { type: 'TextFilter', delay: 400 } }>School URL</TableHeaderColumn>
                        <TableHeaderColumn className='costInfo' row='0' colSpan='2'>School Cost Information</TableHeaderColumn>
                        <TableHeaderColumn className='costInfo' row='1' dataField='inState' width={'120'} dataSort filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                        dataFormat={ this.formatCurrency }>In-State</TableHeaderColumn>
                        <TableHeaderColumn className='costInfo' row='1' dataField='outState' width={'120'} dataSort filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                        dataFormat={ this.formatCurrency }>Out-of-State</TableHeaderColumn>
                    </BootstrapTable>

                    {/* necessary js file for bootstrap table */}
                    <script src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.js" />
                </div>

                {/* favorites list that shows favorite list for current user */}
                <a href="/favoritelist" className="favoriteLink">
                    <div className="favorites" href="/favoriteList">
                        <h2 className="favoriteHeading">Your Favorites</h2><br />
                        <ol className = "faveList">
                            {favorites}
                        </ol>
                    </div>
                </a>

                {/* shows user preferences for current user */}
                <footer className="footer navbar-fixed-bottom">
                    <div className="preferences">
                        <h2 className="heading">Your Info </h2><br />
                        <h3 className="itemTitle">Major: </h3>
                        <h3 className="item">{this.user.preferences.major}</h3><br />
                        <h3 className="itemTitle">State(s): </h3>
                        <h3 className="item">{this.user.preferences.location}</h3>
                    </div>
                </footer>

                <div>
                    <SchoolDetailsContainer selectedSchoolID={236939} show={true} />
                </div>

            </div>

            
          );
        }
        return (<div>loading...</div>) 
    }
}
export default SearchResults;
