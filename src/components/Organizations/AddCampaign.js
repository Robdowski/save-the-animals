import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getUser, getOrgs } from "../../actions";

import axiosWithAuth from "../../utils/axiosWithAuth";

import '../../css/AddCampaign.css'

function AddCampaign(props) {
  const initialCampaign = {
    title: "",
    location: "",
    species: "",
    urgency: 5,
    image_url: "",
    organization_id: 1
  };

  // HANDLE FORM CHANGES IN LOCAL STATE
  const [campaign, setCampaign] = useState(initialCampaign);

  useEffect(() => {
    //GET USER DATA FROM LOCAL STORAGE
    props.getUser();

    // GET ORGANIZATION LIST FOR FORM SELECTION
    props.getOrgs();
  }, []);

  const id = parseInt(props.user.organ_id, 10);
  console.log(id);

  const handleChanges = e => {
    let value = e.target.value;
    if (e.target.name === "urgency" || e.target.name === "funding_received") {
      setCampaign({
        ...campaign,
        [e.target.name]: parseInt(value, 10)
      });
    } else {
      setCampaign({
        ...campaign,
        [e.target.name]: value
      });
    }
  };

  const handleSubmit = e => {
    console.log(campaign);
    e.preventDefault();
    axiosWithAuth()
      .post("https://saving-the-animals.herokuapp.com/api/campaigns", campaign)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  return (
    <div className='add-campaign-container'>
      <form onSubmit={handleSubmit} id='org-add-campaign'>
        <h1>Add A Campaign</h1>
        <label htmlFor="title">
          Title: <input name="title" type="text" onChange={handleChanges} />
        </label>
        <label htmlFor="location">
          Location:{" "}
          <input name="location" type="text" onChange={handleChanges} />
        </label>
        <label htmlFor="species">
          Species: <input name="species" type="text" onChange={handleChanges} />
        </label>
        <label htmlFor="urgency">
          Urgency:{" "}
          <input
            name="urgency"
            type="range"
            min="0"
            max="10"
            defaultValue="5"
            onChange={handleChanges}
          />
        </label>
        <label htmlFor="funding_received">
          Funding Received:{" "}
          <input name="funding_received" type="text" onChange={handleChanges} />
        </label>
        <label htmlFor="image_url">
          Image URL:{" "}
          <input name="image_url" type="text" onChange={handleChanges} />
        </label>
        <div>
          <label htmlFor="organization_id">
            Select your organization: <br />
          </label>
          <select name="organization_id" onChange={handleChanges}>
            <option key={0} value={0} onChange={handleChanges}>
              Please Select An Organization
            </option>
            {props.orgList.map(item => (
              <option key={item.id} value={item.id} onChange={handleChanges}>
                {item.organ_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Campaign</button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    orgList: state.orgList
  };
};

export default connect(
  mapStateToProps,
  { getUser, getOrgs }
)(AddCampaign);
