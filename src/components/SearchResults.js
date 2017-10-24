import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { School } from '../models/School'
import './SearchResults.css';



class SearchResults extends Component {
    data = [];
    user;
    
    userListID;
    userListSize;

    localFavorites = [];

    componentDidMount(){
        if(this.props.currentUser){
            this.user = this.props.currentUser;
            this.userListID = this.user.schoolList.id;
            this.props.getSchools(this.user.preferences.location, this.user.preferences.major)
            this.loadFavorites(this.user.schoolList.schools);
        }
    }

    afterTabChanged() {
        this.refs.searchResultTable.forceUpdate();
    }

    linkFormatter(cell, row) {
        //console.log(cell)
        return '<a href="http://'+cell+'" target="_blank">'+cell+'</a>';
    }

    internalLinkFormatter(cell, row) {
        //console.log(cell)
        return '<a href=schooldetails/'+cell+' target="_blank">Details</a>';
    }

    loadFavorites(listFromUser) {
        // console.log("items sent to method")
        // console.log(listFromUser);
        //let sizeCheck = this.localFavorites.length-listFromUser.length;
        // console.log(sizeCheck);
        for(let i = 0; i < listFromUser.length; i++)
        {
                this.localFavorites[i]=listFromUser[i].schoolName;
        }
        // if(sizeCheck>0){
        //     for(let j=0; j < sizeCheck; j++)
        //     {
        //         this.localFavorites[j+listFromUser.length] = "Favorite Not Assigned"
        //     }
        // }

        
    }
    
        

    onRowSelect = (row, isSelected, e, rowIndex) => {
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
        }//create school item to pass to add method
        this.props.addSchoolToFavoriteList(this.userListID, schoolInfo);
        
        //isolate user name

        
        //update favorites list on favorites snapshot
      }

      onSelectAll(isSelected, rows) {
        if (isSelected) {
            alert('Select All not currently supported, please deselect and select each individual school to add to your Favorites List');
        } 
       
    }

    formatFloat(cell, row) {
        return cell.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")

    }

    formatCurrency(cell, row) {
        // return "$"+cell.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        return cell;
    }

    selectRowProp = {
        mode: 'checkbox',
        // clickToSelect: true, --> use this for favorite list to pull up details. this will allow you to click row to select it.
        onSelect: this.onRowSelect,
        onSelectAll: this.onSelectAll
    };

    render() {

        let favorites = this.localFavorites.map(function(value, key){
            return <li key={key}>{value}</li>;
        })

        if(this.props.addedSchool){
            this.props.refreshUser();
            this.loadFavorites(this.props.addedSchool.schools);
        }
            
        
        const getDegree = {
            0: 'Non-Degree-Granting',
            1: 'Certificate',
            2: 'Associate',
            3: "Bachelor's",
            4: 'Graduate'
        }
        
        const getOwnership = {
            1: "Public",
            2: "Private N-P",
            3: "Private F-P"
        }
      
        const getLocale = {
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
                let temp = parseInt(school['2015.cost.avg_net_price.overall'], 10)
                let nameLink = school['school.school_url']
      
                return { 
                  id: school.id,
                  name: school['school.name'],
                  netCost: temp,
                  inState: school["2015.cost.tuition.in_state"],
                  outState: school["2015.cost.tuition.out_of_state"],
                  location: getLocale[school["school.locale"]],
                  size: school["2015.student.size"],
                  state: school["school.state"],
                  admission: school["2015.admissions.admission_rate.overall"],
                  highestDegree: getDegree[school["school.degrees_awarded.highest"]],
                  ownership: getOwnership[school["school.ownership"]],
                  schoolUrl: nameLink
                }
              }
            )
          
      
          return (
              <div className="searchDashboard">
              <div className="preferences">
                  <h2 className="heading">Your Info </h2><br />
                  <h3 className="itemTitle">Major: </h3>
                  <h3 className="item">{this.user.preferences.major}</h3><br />
                  <h3 className="itemTitle">State(s): </h3>
                  <h3 className="item">{this.user.preferences.location}</h3>
                  </div>
            <div className="container searchTable">
                <div className="instructions">
                <p className="tip"><span className="glyphicon glyphicon-arrow-right"></span>TIP: Click Favorites section heading to open your Favorites List</p>
                <p className="tip"><span className="glyphicon glyphicon-arrow-down"></span>TIP: Utilize NONE, ONE, or ALL filters below to find your prospective schools</p>
                <p className="tip"><span className="glyphicon glyphicon-arrow-down"></span>TIP: Click checkbox to add a school to your Favorites List</p>
                </div>
              <BootstrapTable ref="searchResultTable" data={ this.data } selectRow={ this.selectRowProp } search exportCSV={ true } pagination striped>
                <TableHeaderColumn row='0' rowSpan='2' dataField='id' isKey={ true } width={'55'} dataFormat={this.internalLinkFormatter}></TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='4'>Basic School Info</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='name' dataSort width={"250"} filter={ { type: 'TextFilter', delay: 400 } }>Name</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='size' dataSort filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                dataFormat={ this.formatFloat }>Size</TableHeaderColumn>
                <TableHeaderColumn id="state" row='1' dataField='state' dataSort width={"80"} filter={ { type: 'TextFilter', delay: 400 } }>ST</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='schoolUrl' dataFormat={this.linkFormatter} dataSort filter={ { type: 'TextFilter', delay: 400 } }>School URL</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='2'>School Cost Information</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='inState' dataSort filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                dataFormat={ this.formatCurrency }>In-State</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='outState' dataSort filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                dataFormat={ this.formatCurrency }>Out-of-State</TableHeaderColumn>
              </BootstrapTable>
              <script src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.js" />
            </div>
            <a href="/favoritelist" className="favoriteLink">
                <div className="favorites" href="/favoriteList">
            <h2 className="heading">Your Favorites</h2><br />

            <ol className = "topTen">
              {favorites}
            </ol>
            
            </div>
            </a>
            </div>
      
          );
        }
      
        //return outside the if for when we are waiting for the data
        return (<div><br/><br/><br/><br/>loading...</div>)
        
    }
}

export default SearchResults;
