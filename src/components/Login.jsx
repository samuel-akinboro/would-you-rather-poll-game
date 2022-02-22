import React, { Fragment, useState } from "react";
import "./component-styles/Login.css";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";
import Avatar from "@mui/material/Avatar";
import avatarPic from "../assets/images/login.jpg"


const Users = ({ users, setValue, setShowUsers }) => {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.split(" ")[0][0]}`
    };
  }

  const fetchUsers = () => {
    return users
      .map((user) => ({
        key: user.id,
        text: user.name,
        value: user.id,
        image: { avatar: true, src: user.avatarURL }
      }))
      .map((user) => (
        <div
          className="single__user"
          key={user.key}
          onClick={() => {
            console.log("check", user)
            setValue(user.key);
            setShowUsers(false);
          }}
        >
          <Avatar {...stringAvatar(user.text)} />
          <h6>{user.text}</h6>
        </div>
      ));
  };

  return (
    <div className="users__container">
      <div className="users">{fetchUsers()}</div>
    </div>
  );
};

const Login = ({ users, setAuthUser }) => {
  const [value, setValue] = useState("");
  const [showUsers, setShowUsers] = useState(false);

  const handleSubmit = () => {
    const authUser = value;
    new Promise((res, rej) => {
      setTimeout(() => res(), 500);
    }).then(() => setAuthUser(authUser));
  };

  return (
    <Fragment>
      <div className="login__container">
        <div className="login-wrap">
          <div className="login">
            <div style={{backgroundImage: avatarPic}} className="profile__avatar"></div>
            <span className="user">Sign In</span>
            {showUsers && (
              <Users
                users={users}
                setValue={setValue}
                setShowUsers={setShowUsers}
              />
            )}
            <button
              onClick={() => {
                setShowUsers(true);
              }}
            >
              {value ? value : "Select A friend"}
            </button>
            <button
              style={{
                opacity: value ? "1" : "0.3",
                cursor: value ? "pointer" : "auto"
              }}
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const ConnectedLogin = connect(mapStateToProps, { setAuthUser })(Login);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

export default ConnectedLogin;
