import React from 'react'
import '../css/CampaignCard.css'

export default function CampaignCard(props) {

    // CLICK ON A CARD TO VIEW INDIVIDUAL CAMPAIGN
    const routeToCampaign = (e, item) => {
        e.preventDefault()
        props.history.push(`/org-campaigns/${item}`)
    }

     // FORMATS CURRENCY TO DOLLAR AMOUNT WITH COMMAS
     function formatCurrency(n, currency) {
        return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      }

    return (
        <div className="card-container" key={props.item.campaigns_id} onClick={e => routeToCampaign(e, props.item.campaigns_id)}>
            <div className="card-content">
                <img className='card-image' src={props.item.image_url} />
                <h2>{props.item.title}</h2>
                <p>Help {props.item.organ_name} save the {props.item.species}.</p>
                <p>Location: {props.item.location}</p>
                <div className={props.item.funding_received < 1000 ? 'funding low-funding' : props.item.funding_received < 5000 ? 'funding mid-funding' : 'funding high-funding'} style={props.item.funding_received < 2000 ? {width: '70px'} : {width:`${props.item.funding_received/25}px`}}>
                <p>{formatCurrency(props.item.funding_received, '$')}</p>
                </div>
            </div>
        </div>
    )
}

// PROPS ====> title, organ_name, funding_received, location, urgency, image_url, species, campaigns_id


