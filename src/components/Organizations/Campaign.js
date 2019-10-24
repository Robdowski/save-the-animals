import React, { useEffect } from 'react'

import OrgCampaignCard from '../OrgCampaignCard'

import { getUser, getCampaignsForOrganizations, editItem, handleDelete } from '../../actions'
import { connect } from 'react-redux'

import '../../css/Campaign.css'


function Campaign(props) {
    useEffect(() => {

        // GET USER DATA FROM LOCAL STORAGE
        props.getUser()

        // AXIOS CALL TO GET CAMPAIGNS FOR ORGANIZATIONS
        props.getCampaignsForOrganizations()
    }, [])

    // FIND THE INDIVIDUAL CAMPAIGN THAT WAS CLICKED ON. NEED TO WAIT FOR PROPS.CAMPAIGNS FIRST.
    const item = props.campaigns.length !== 0 && props.campaigns !== null ? props.campaigns.campaigns.find(campaign => `${campaign.campaigns_id}` === props.match.params.id) : false
    
    // DON'T TRY TO RENDER UNTIL WE HAVE OUR ITEM
    if(item === false){
        return (
            <div>
                <h1>Loading Campaign...</h1>
            </div>
        )
    } else {
    return (
        <div className='campaign-focus-container'>
            <div className='org-individual-view'>
            <h2>Your Active Campaign</h2>
           <OrgCampaignCard {...props} item={item} />
           <button onClick={(e) => {
               props.editItem(e, item)
               props.history.push(`/org-campaigns/${item.campaigns_id}/edit`)
           }}>Edit Campaign</button>
           <button onClick={e => {
               props.handleDelete(e, item)
               props.history.push('/org-campaigns')
           }}>Delete Campaign</button></div>
        </div>
    )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        campaigns: state.campaigns
    }
}

export default connect(mapStateToProps, { getUser, getCampaignsForOrganizations, editItem, handleDelete })(Campaign)
