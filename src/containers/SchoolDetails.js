import { connect } from 'react-redux'
import { schoolDetails } from '../actions/School'

import SchoolDetails from '../components/SchoolDetails'

//  map the currentSchool item from redux state to props in SchoolDetails component
const mapStateToProps = state => {
  return {
    currentSchool: state.school.schoolDetails
  }
}

// map the schoolDetails function from Action file into SchoolDetails component props for use there
const mapDispatchToProps = dispatch => {
  return {
    schoolDetails: (schoolid) => {
      dispatch(schoolDetails(schoolid))
    }
  }
}

// here is where we actually connect the props to the SchoolDetails component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolDetails)