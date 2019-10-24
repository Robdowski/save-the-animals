import React, { useState } from "react";
import axios from "axios";
import "../css/Form.css";
import { connect } from 'react-redux'


const initialUser = {
  username: "",
  password: ""
};

function OrgLogin(props) {
  // HANDLE STATE FOR FORM SUBMIT
  const [user, setUser] = useState(initialUser);

  const handleChanges = e => {
    if (e.target.name === 'username'){
      setUser({
        ...user,
        [e.target.name] : e.target.value.toLowerCase()
      })
    } else {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('user being submitted', user)
    axios
      .post("https://saving-the-animals.herokuapp.com/api/auth/login", user)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem("token", res.data.token);
        props.history.push("/org-campaigns");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="content">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h3>Organization Login</h3>
          <label htmlFor="username" name="username">
            Username
            <input
              name="username"
              htmlFor="username"
              type="text"
              onChange={handleChanges}
            />
          </label>
          <label htmlFor="password" name="password">
            Password
            <input
              name="password"
              htmlFor="password"
              type="password"
              onChange={handleChanges}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, {})(OrgLogin);
