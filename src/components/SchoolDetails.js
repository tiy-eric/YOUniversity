import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import "./SchoolDetails.css";

class SchoolDetails extends Component {

  //  when component mounts, we need to pull school ID from props and run schoolDetails from Action file
  componentDidMount() {
      let schoolid = 236939
      if (this.props.params.id) {
          schoolid = this.props.params.id
      }
    
      this.props.schoolDetails(schoolid)
  }

  render() {

    //  a bunch of constant methods to map codes to strings for display purposes

    const getDegree = {
        0: 'Non-Degree-Granting',
        1: 'Certificate',
        2: 'Associate',
        3: "Bachelor's",
        4: 'Graduate'
      }

      const getPredominant = {
        0: 'Not classified',
        1: 'Certificate-degree',
        2: "Associate's-degree",
        3: "Bachelor's-degree",
        4: 'Graduate-degree'
      }
    
      const getOwnership = {
        1: "Public",
        2: "Private Non-Profit",
        3: "Private For-Profit"
      }

      

      const getLocale = {
        11:"City: Large (population of 250,000 or more)",
        12:"City: Midsize (population of at least 100,000 but less than 250,000)",
        13:"City: Small (population less than 100,000)",
        21:"Suburb: Large (outside principal city, in urbanized area with population of 250,000 or more)",
        22:"Suburb: Midsize (outside principal city, in urbanized area with population of at least 100,000 but less than 250,000)",
        23:"Suburb: Small (outside principal city, in urbanized area with population less than 100,000)",
        31:"Town: Fringe (in urban cluster up to 10 miles from an urbanized area)",
        32:"Town: Distant (in urban cluster more than 10 miles and up to 35 miles from an urbanized area)",
        33:"Town: Remote (in urban cluster more than 35 miles from an urbanized area)",
        41:"Rural: Fringe (rural territory up to 5 miles from an urbanized area or up to 2.5 miles from an urban cluster)",
        42:"Rural: Distant (rural territory more than 5 miles but up to 25 miles from an urbanized area or more than 2.5 and up to 10 miles from an urban cluster)",
        43:"Rural: Remote (rural territory more than 25 miles from an urbanized area and more than 10 miles from an urban cluster)"
      }

      
      // if we have schooldetails data we are ready to render details page
      if(this.props.currentSchool){
        // grab currentSchool out of props, which came from API call in schoolDetails, and store in college variable
        let college = this.props.currentSchool[0];
        // set url for external college website link
        let schoolURL = 'http://'+college["school.school_url"]
      
        return (

            //  container to hold all school details cards
            <div className="container details-container">
              {/* header for the school details page */}
              <Col sm={12} md={12} lg={12} className="details-title">
                <h1>{college["school.name"]}</h1>
              </Col>

              {/* details card to display School Summary data */}
              <Col sm={12} md={6} lg={6} className="details-summary details-card">
                <h2>School Summary</h2>
                <p>Website URL: <a href={schoolURL} target="_blank">{college["school.school_url"]}</a></p>
                <p>State:  {college["school.state"]}</p>
                <p>City:  {college["school.city"]}</p>
                <p>Highest Degree Offered:  {getDegree[college["school.degrees_awarded.highest"]]}</p>
                <p>Predominant Degree Offered:  {getPredominant[college["school.degrees_awarded.predominant"]]}</p>
                <p>Acceptence Rate: {Math.round((college["2015.admissions.admission_rate.overall"])*100)}%</p>
                <p>Institution Type:  {getOwnership[college["school.ownership"]]}</p>
                <p>Locale Description:  {getLocale[college["school.locale"]]}</p>
              </Col>

              {/* details card to display Student Data data */}
              <Col sm={12} md={6} lg={6} className="student-data details-card">
                <h2>Student Data</h2>
                <p>Undergraduate Enrollement:  {new Intl.NumberFormat().format(college["2015.student.size"])}</p>
                <p>Number of Grad Students: {new Intl.NumberFormat().format(college["2015.student.grad_students"])}</p>
                <p>Percentage Women: {Math.round((college["2015.student.demographics.women"])*100)}%</p>
                <p>Percentage Men: {Math.round((college["2015.student.demographics.men"])*100)}%</p>
                <p>Average SAT Score: {(college["2015.admissions.sat_scores.average.overall"]) ? college["2015.admissions.sat_scores.average.overall"] : "Not Available"}</p>
                <p>Retention Rate: {Math.round((college["2015.student.retention_rate.four_year.full_time"])*100)}%</p>
                <p>Completion Rate: {Math.round((college["2015.completion.completion_rate_4yr_150nt"])*100)}%</p>
                <p>Median Family Income: ${new Intl.NumberFormat().format(college["2015.student.demographics.median_family_income"])}</p>
              </Col>

              {/* details card to display Financial Data */}
              <Col sm={12} md={6} lg={6} className="financial-data details-card">
                <h2>Financial Data</h2>
                <p>Tuition In-State: ${new Intl.NumberFormat().format(college["2015.cost.tuition.in_state"])}</p>
                <p>Tuition Out-of-State: ${new Intl.NumberFormat().format(college["2015.cost.tuition.out_of_state"])}</p>
                <p>Cost of Attendance: ${new Intl.NumberFormat().format(college["2015.cost.attendance.academic_year"])}</p>
                <p>Average Net Price: ${new Intl.NumberFormat().format(college["2015.cost.avg_net_price.overall"])}</p>
                <p>Average Debt Upon Completion: ${new Intl.NumberFormat().format(college["2015.aid.median_debt.completers.overall"])}</p>
                <p>Percentage of Students with Federal Loans: {Math.round((college["2015.aid.federal_loan_rate"])*100)}%</p>
                <p>Percentage of Students with Pell Grants: {Math.round((college["2015.aid.pell_grant_rate"])*100)}%</p>
              </Col>

              {/* details card to display table of Net Price by Family Income break-down */}
              <Col sm={12} md={6} lg={6} className="financial-breakdown details-card">
                <h2>Net Price by Family Income</h2>
                <div className="table-container">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <td>Family Income Range</td>
                        <td>Net Price for Range</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>$0 to $30,000</td>
                        <td>${(college["2015.cost.net_price.public.by_income_level.0-30000"]) ? new Intl.NumberFormat().format(college["2015.cost.net_price.public.by_income_level.0-30000"]) : new Intl.NumberFormat().format(college["2015.cost.net_price.private.by_income_level.0-30000"])}</td>
                      </tr>
                      <tr>
                        <td>$300,001 to $48,000</td>
                        <td>${(college["2015.cost.net_price.public.by_income_level.30001-48000"]) ? new Intl.NumberFormat().format(college["2015.cost.net_price.public.by_income_level.30001-48000"]) : new Intl.NumberFormat().format(college["2015.cost.net_price.private.by_income_level.30001-48000"])}</td>
                      </tr>
                      <tr>
                        <td>$48,001 to $75,000</td>
                        <td>${(college["2015.cost.net_price.public.by_income_level.48001-75000"]) ? new Intl.NumberFormat().format(college["2015.cost.net_price.public.by_income_level.48001-75000"]) : new Intl.NumberFormat().format(college["2015.cost.net_price.private.by_income_level.48001-75000"])}</td>
                      </tr>
                      <tr>
                        <td>$75,000 to $110,000</td>
                        <td>${(college["2015.cost.net_price.public.by_income_level.75001-110000"]) ? new Intl.NumberFormat().format(college["2015.cost.net_price.public.by_income_level.75001-110000"]) : new Intl.NumberFormat().format(college["2015.cost.net_price.private.by_income_level.75001-110000"])}</td>
                      </tr>
                      <tr>
                        <td>More than $110,000</td>
                        <td>${(college["2015.cost.net_price.public.by_income_level.110001-plus"]) ? new Intl.NumberFormat().format(college["2015.cost.net_price.public.by_income_level.110001-plus"]) : new Intl.NumberFormat().format(college["2015.cost.net_price.private.by_income_level.110001-plus"])}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </div>

        );
      }

      //return for outside the if statement, when we are waiting for the data to arrive from api
      return (<div>loading...</div>)
  }
}


export default SchoolDetails;