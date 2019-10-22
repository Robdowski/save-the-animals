import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axiosWithAuth from '../../utils/axiosWithAuth'

import { getUser } from '../../actions'

function EditCampaign(props) {

    const initialItem = {
        organization_id: parseInt(props.user.organ_id, 10),
        id: props.item.campaigns_id,
        image_url: ''
    }

    const [campaign, setCampaign] = useState(initialItem)
    console.log(props)

    useEffect(() => {
        props.getUser()
    }, [])

    const handleChanges = e => {
        let value = e.target.value
        if (e.target.name === 'urgency' || e.target.name === 'funding_received'){
            setCampaign({
                ...campaign,
                [e.target.name]: parseInt(value, 10)
            })
        } else {
        setCampaign({
            ...campaign,
            [e.target.name] : value
        })
        }
    }

    const handleSubmit = e => {
        console.log(campaign)
        e.preventDefault()
        axiosWithAuth()
        .put(`https://saving-the-animals.herokuapp.com/api/campaigns/${props.item.campaigns_id}`, campaign)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h1>Add A Campaign</h1>
               <label htmlFor='title'>Title: <input name='title' type='text' defaultValue={props.item.title} onChange={handleChanges} /></label>
               <label htmlFor='location'>Location: <input name='location' type='text' defaultValue={props.item.location} onChange={handleChanges} /></label>
               <label htmlFor='species'>Species: <input name='species' type='text' defaultValue={props.item.species} onChange={handleChanges}/></label>
               <label htmlFor='urgency'>Urgency: <input name='urgency' type='range' min='0' max='10' defaultValue={props.item.urgency} onChange={handleChanges}/></label>
               <label htmlFor='funding_received'>Funding Received: <input name='funding_received' type='text' defaultValue={props.item.funding_received} onChange={handleChanges} /></label>
               <label htmlFor='image_url'>Image URL: <input name='image_url' type='text' defaultValue={props.item.image_url} onChange={handleChanges}/></label>
               <button type="submit">Edit Campaign</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        item: state.itemToEdit,
        user: state.user
    }
}

export default connect(mapStateToProps, { getUser })(EditCampaign)
