import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import "./FavoriteList.css"

let userListID="";
  

function formatFloat(cell, row) {
    return parseFloat(cell);
}

class FavoriteList extends Component {
    data = [];
    user;

    componentDidMount(){
        if(this.props.currentUser.id){
            this.user = this.props.currentUser;
            userListID = this.user.schoolList.id;
        }
        
    }

    deleteFavoriteSchool = (event) => {
        // event.preventDefault ();
        let schoolToDelete = event.target.id
        this.props.deleteSchoolFromFavoriteList(userListID, schoolToDelete);

    }
    
    

    linkFormatter(cell, row) {
        return '<a href="http://'+cell+'" target="_blank">'+cell+'</a>';
    }

    internalLinkFormatter(cell, row) {
        return '<a href=schooldetails/'+cell+' target="_blank">Details</a>';
    }


    buttonFormatter = (cell, row) => {
        return <Button id={cell} bsStyle="danger" bsSize="xsmall" onClick={this.deleteFavoriteSchool} >Delete</Button>;
    }

    render() {
     
        if(this.props.deletedSchool){
            this.props.refreshUser();
            this.user = this.props.currentUser;
            userListID = this.user.schoolList.id;
        }

        if(this.props.currentUser.schoolList.schools){
            this.data = this.props.currentUser.schoolList.schools.map(
              school => {
                let temp = parseInt(school.avgNet, 10)
                let nameLink = school.schoolUrl
      
                return { 
                  id: school.schoolApiId,
                  favSchoolId: school.id,
                  name: school.schoolName,
                  netCost: temp,
                  inState: school.inState,
                  outState: school.outState,
                  location: school.schoolLocation,
                  size: school.size,
                  state: school.state,
                  admission: school.admission,
                  highestDegree: school.highestDegree,
                  ownership: school.ownership,
                  schoolUrl: nameLink
                }
              }
            )
          
      
          // return inside the if
          return (
            
            <div className="container favoriteTable">
              <BootstrapTable data={ this.data } search exportCSV={ true } pagination striped>
                {<TableHeaderColumn row='0' rowSpan='2' dataField='favSchoolId' width={'65'} dataFormat={this.buttonFormatter}></TableHeaderColumn>}
                {<TableHeaderColumn row='0' rowSpan='2' dataField='id' isKey={ true } width={'50'} dataFormat={this.internalLinkFormatter}></TableHeaderColumn>}
                <TableHeaderColumn row='0' colSpan='7'>Basic School Info</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='name' dataSort width={"300"} filter={ { type: 'TextFilter', delay: 400 } }>Name</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='size' dataSort filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                dataFormat={ formatFloat }>Size</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='location' dataSort filter={ { type: 'TextFilter', delay: 400 } }>Location</TableHeaderColumn>
                <TableHeaderColumn id="state" row='1' dataField='state' dataSort width={"80"} filter={ { type: 'TextFilter', delay: 400 } }>ST</TableHeaderColumn>
                {<TableHeaderColumn row='1' dataField='admission' dataSort filter={ { type: 'TextFilter', delay: 400 } }>Admission %</TableHeaderColumn>}
                <TableHeaderColumn row='1' dataField='highestDegree' dataSort filter={ { type: 'TextFilter', delay: 400 } }>Highest Degree</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='schoolUrl' dataFormat={this.linkFormatter} dataSort filter={ { type: 'TextFilter', delay: 400 } }>School URL</TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='3'>School Cost Information</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='inState' dataSort filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                dataFormat={ formatFloat }>In-State</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='outState' dataSort filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                dataFormat={ formatFloat }>Out-of-State</TableHeaderColumn>
                <TableHeaderColumn row='1' dataField='netCost' dataSort filter={ { type: 'NumberFilter', delay: 400, numberComparators: [ '=', '>', '<' ] } }
                dataFormat={ formatFloat }>Avg Net</TableHeaderColumn>
              </BootstrapTable>
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
