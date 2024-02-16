
import { ParkingDetail } from '../models/parkingdetailModel.js'
const getparkings = async (req, res) => {

    const id = "65cdc2278d2a49f36012bf98"
    try {


    }
    catch (error) {
        res.json(error)
    }
}
const getparking = async (req, res) => {

    try {
        await res.json({ "msg": "Parking details" })
    }
    catch (error) {
        res.json(error)
    }
}
const createparking = async (req, res) => {

    const id = "65cdc2278d2a49f36012bf98"

    try {
        const {
            parkingName,
            parkingArea,
            city,
            state,
            country,
            pincode,
            landmark,
            capacity,
            openingTime,
            closingTime,
            latitude,
            longitude,
            associateGuard,
            associateAccount,
            image: []
        } = req.body

        const parking = await ParkingDetail.create({
            parkingName,
            parkingArea,
            city,
            state,
            country,
            pincode,
            landmark,
            capacity,
            openingTime,
            closingTime,
            latitude,
            longitude,
            associateGuard,
            associateAccount,
            image: []
        })
        if (parking) res.json({ parking: parking });
    }
    catch (error) {
        res.json(error)
    }
}




export { getparkings, getparking, createparking }