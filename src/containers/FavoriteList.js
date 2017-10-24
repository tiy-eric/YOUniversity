import { connect } from 'react-redux'
import { refreshUser, deleteSchoolFromFavoriteList } from '../actions/User'

import FavoriteList from '../components/FavoriteList'

//  map the following items from redux state to props in FavoriteList component
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    userRefreshed: state.user.refreshUser,
    deletedSchool: state.user.deletedSchool
  }
}

// map the following functions from Actions files into FavoriteList component props for use there
const mapDispatchToProps = dispatch => {
  return {
    refreshUser: () => {
      dispatch(refreshUser())
    },
    deleteSchoolFromFavoriteList: (listID, school) => {
      dispatch(deleteSchoolFromFavoriteList(listID, school))
    },
  }
}

// here is where we actually connect the props to the FavoriteList component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteList)