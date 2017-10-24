import { connect } from 'react-redux'
import { login, logout } from '../actions/User'

import NavLogin from '../components/NavLogin'
import "../components/Navigation.css"

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => {
      return dispatch(login(user))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavLogin)