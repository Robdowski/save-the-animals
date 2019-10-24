import React, { useEffect } from "react";
import { connect } from "react-redux";

import OrgCampaignCard from "../OrgCampaignCard";
import '../../css/OrgCampaigns.css'

import { getCampaignsForOrganizations, getUser } from "../../actions";

function OrgLanding(props) {

  useEffect(() => {
    //GET USER INFO FROM LOCAL STORAGE AND GET LIST OF CAMPAIGNS
    props.getUser();

    // ENDPOINT IS DIFFERENT FROM SUPPORTER CAMPAIGNS
    props.getCampaignsForOrganizations();
  }, []);

  return (
    <div className="org-campaigns">
    <div className='org-campaign-content'>
    <h2>Your Active Campaigns</h2>
      <div className='org-campaign-cards'>
      {props.campaigns && props.campaigns.campaigns ? (
        props.campaigns.campaigns.map(item => (
          <OrgCampaignCard {...props} item={item} key={item.campaigns_id} />
        ))
      ) : (
        <div>
          <h1>You have no active campaigns...</h1>
        </div>
      )}</div></div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getCampaignsForOrganizations, getUser }
)(OrgLanding);
