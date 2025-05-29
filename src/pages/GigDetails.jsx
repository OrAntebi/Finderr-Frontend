import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadGig, addGigMsg } from '../store/gig/gig.actions'


export function GigDetails() {

    const { gigId } = useParams()
    const gig = useSelector(storeState => storeState.gigModule.gig)

    useEffect(() => {
        loadGig(gigId)
    }, [gigId])

    async function onAddGigMsg(gigId) {
        try {
            await addGigMsg(gigId, 'bla bla ' + parseInt(Math.random() * 10))
            showSuccessMsg(`Gig msg added`)
        } catch (err) {
            showErrorMsg('Cannot add gig msg')
        }

    }

    return (
        <section className="gig-details">
            <Link to="/gig">Back to list</Link>
            <h1>Gig Details</h1>
            {gig && <div>
                <h3>{gig.vendor}</h3>
                <h4>${gig.price}</h4>
                <pre> {JSON.stringify(gig, null, 2)} </pre>
            </div>
            }
            <button onClick={() => { onAddGigMsg(gig._id) }}>Add gig msg</button>

        </section>
    )
}