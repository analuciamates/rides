import axios from "axios"
const link = ` https://6130d11c8066ca0017fdaa97.mockapi.io/`

export const getStops = () => {
    return axios.get(`${link}stops`)
}

export const getTrips = () => {
    return axios.get(`${link}trips`)
}

export const getTripsByStop = (stop) => {
    return axios.get(`${link}trips?departureStop=${stop}`)
}

export const getTripsById = (id) => {
    return axios.get(`${link}trips?id=${id}`)
}

export const setTripReservation = (tripId) => {
    return axios.put(`${link}book/${tripId}`)
}