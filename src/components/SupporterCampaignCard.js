import React from 'react'
import '../css/CampaignCard.css'

export default function SupporterCampaignCard(props) {

    // CLICK ON CARD TO VIEW INDIVIDUAL CAMPAIGN
    const routeToCampaign = (e, item) => {
        e.preventDefault()
        props.history.push(`/supporter-campaigns/${item}`)
    }

    // FORMATS CURRENCY TO DOLLAR AMOUNT WITH COMMAS
    function formatCurrency(n, currency) {
        return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      }

    return (
        <div className="card-container" key={props.item.id} onClick={e => routeToCampaign(e, props.item.id)}>
            <div className="card-content">
                <img className='card-image' src={props.item.image_url} />
                <h2>{props.item.title}</h2>
                <p>You're helping to save the {props.item.species}</p>
                <p>Location: {props.item.location}</p>
                <p>Urgency Level: {props.item.urgency}</p>
                <div className={props.item.funding_received < 1000 ? 'funding low-funding' : props.item.funding_received < 5000 ? 'funding mid-funding' : 'funding high-funding'} style={props.item.funding_received < 2000 ? {width: '70px'} : {width:`${props.item.funding_received/25}px`}}>
                <p>{formatCurrency(props.item.funding_received, '$')}</p>
                </div>
            </div>

        </div>
    )
}

// PROPS ====> title, funding_received, location, urgency, image_url, species, id


