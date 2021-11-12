import React, { useState, useEffect } from 'react'
import { getStops, getTripsById, getTripsByStop, setTripReservation } from '../api/ride'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './Home.scss'

const Home = () => {

    const [stops, setStops] = useState([])
    const [trip, setTrip] = useState('')
    const [tripsByStop, setTripsByStop] = useState([])
    const [reservation, setReservation] = useState(false)
    const [reservedTrip, setReservedTrip] = useState([])

    useEffect(() => {
        getStops()
        .then((response) => {
            setStops(response.data)
        })
        .catch(() => {
            console.error('getStops error')
        });
    }, [])

    const handleChange = (event) => {
        setTrip(event.target.value)
        getTripsByStop(trip)
        .then((response)=>{
            response.data.sort(function(a, b) {
                var textA = a.arrivalStop.toUpperCase();
                var textB = b.arrivalStop.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            setTripsByStop(response.data)
        })
        .catch(() => {
            console.log('getTripsByStop error')
        })
    }

    const handleClick = (event) => {
        setTripReservation(event.target.id)
        .then((response)=>{
            setReservation(response.data.success)
            if (reservation === true) {
                toast("Le trajet a été réservé !");
                getTripsById(event.target.id)
                .then((response) => {
                    setReservedTrip([...reservedTrip, response.data[0]]);
                })
                .catch(() => {
                    console.log('getTripsById error')
                })
            }
        })
        .catch(()=>{
            console.log('setTripReservation error')
        })
    }

    return (
        <div>
            <div className="select__ride">
                <label htmlFor="ride-select">Sélectionnez un arrêt : </label>
                    <select name="rides" id="ride-select" onChange={handleChange}>
                        <option value=""> Veuillez sélectionner une option </option>
                        {
                            stops.map((stop, index)=>{
                                return(
                                    <option value={stop} key={index}>{stop}</option>
                                )
                            })
                        }
                    </select>
            </div>

            {tripsByStop !== null && tripsByStop !== undefined && tripsByStop.length > 0 && <table className="table__ride">
                <thead>
                    <tr>
                        <th>Arrêt</th>
                        <th>Heure de départ</th>
                        <th>Arrivée</th>
                        <th>Heure d'arrivée</th>
                        <th>Réservation</th>
                    </tr>
                </thead>
                <tbody>
                {
                    tripsByStop.map((trip, index)=>{
                        return (
                            <tr key={index}>
                                <td>{trip.departureStop}</td>
                                <td>{moment(trip.departureTime).format("DD/MM/YYYY à h:mm")}</td>
                                <td>{trip.arrivalStop}</td>
                                <td>{moment(trip.arrivalTime).format("DD/MM/YYYY à h:mm")}</td>
                                <td><button id={trip.id} onClick={handleClick}>Réserver</button></td>
                                <td><ToastContainer /></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            }

            {reservedTrip  && tripsByStop !== undefined && tripsByStop.length > 0 && <div>
                <h3>Réservations</h3>
                <table className="table__ride">
                    <thead>
                        <tr>
                            <th>Arrêt</th>
                            <th>Heure de départ</th>
                            <th>Arrivée</th>
                            <th>Heure d'arrivée</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                        reservedTrip.map((rsdTrip, index)=> {
                            return(
                                <tr key={index}>
                                <td>{rsdTrip.departureStop}</td>
                                <td>{moment(rsdTrip.departureTime).format("DD/MM/YYYY à h:mm")}</td>
                                <td>{rsdTrip.arrivalStop}</td>
                                <td>{moment(rsdTrip.arrivalTime).format("DD/MM/YYYY à h:mm")}</td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                </div>
            }
        </div>
    )
}

export default Home
