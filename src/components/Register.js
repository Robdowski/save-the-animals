import React, { useState, useEffect } from "react";
import axios from 'axios'
import '../css/Register.css'

import { connect } from 'react-redux'
import { getOrgs } from '../actions'

const initialUser = {
    username: '',
    password: '',
    email: '',
    userType: '',
}

const Register = (props) => {
  // MANAGING LOCAL STATE FOR THE FORM INPUTS
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    // THIS HOOK GETS A LIST OF ORGS FOR THE DROPDOWN MENU
    props.getOrgs()
  }, [])

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
      e.preventDefault()
      axios
      .post('https://saving-the-animals.herokuapp.com/api/auth/register', user)
      .then(res => {
          {user.userType === 'organization' ? props.history.push('/org-login') : props.history.push('/supporter-login')}
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='register-content'>
      <div className='register-form-container'>
        <form onSubmit={handleSubmit}>
        <h3>Register Account</h3>
          <label htmlFor="username">
            Username
            <input type="text" name="username" onChange={handleChanges} />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" name="password" onChange={handleChanges} />
          </label>
          <label htmlFor='email'>
            Email
            <input type='text' name='email' onChange={handleChanges} />
          </label>
          <div className='type-selector'>
            <label htmlFor="userType">
              Are you an Organization or a Supporter?<br />
              <div className='type-org'>
                <input type="radio" name="userType" value="organization" id='org' onChange={handleChanges}/>
                <label for='org'>Organization</label>
              </div>
              <div className='type-sup'>
                <input type="radio" name="userType" value="support" id='sup' onChange={handleChanges} />
                <label for='sup'>Supporter</label>
              </div>
            </label>
          </div>
          {user.userType === 'organization' && (
            <div>
            <label htmlFor='organization_id'>Select your organization: <br /></label>
              <select name='organization_id' onChange={handleChanges}>
              <option key={0} value={0} onChange={handleChanges}>Please Select An Organization</option>
                {props.orgList.map(item => <option key={item.id} value={item.id} onChange={handleChanges}>{item.organ_name}</option>)}
              </select>
            </div>
          )}
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return{
    orgList: state.orgList
  }
}

export default connect(mapStateToProps, { getOrgs })(Register);
