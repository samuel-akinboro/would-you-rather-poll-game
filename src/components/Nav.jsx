import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LogoutIcon from '@mui/icons-material/Logout';
import { setAuthUser } from '../actions/authUser';
import Avatar from "@mui/material/Avatar";
import "./component-styles/Navbar.css"

const Navbar = ({users, authUser, setAuthUser}) => {
  return (
    <div className="nav">
      <div className="nav__container">
        <div className="links">
          <HistoryEduIcon />
          <NavLink activeClassName="active" to="/" exact>Home</NavLink>
          <NavLink activeClassName="active" to="/add" exact>new poll</NavLink>
          <NavLink activeClassName="active" to="/leaderboard" exact>leaderboard</NavLink>
        </div>
        <div className="profile">
          <Avatar src={users[authUser].avatarURL} />
          <LogoutIcon onClick={()=> setAuthUser(null)} />
        </div>
      </div>
    </div> 
  )
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users
  };
}

export default connect(
  mapStateToProps,
  { setAuthUser }
)(Navbar);
