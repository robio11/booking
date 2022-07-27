import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";

export const createHotel = async (req, res, next) => {
    const newHotels = new Hotels(req.body)

    try {
        const savedHotels = await newHotels.save()
        res.status(200).json(savedHotels)

    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {

    try {
        const updatedHotels = await Hotels.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotels);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {

    try {
        await Hotels.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel has been delete.');

    } catch (err) {
        next(err);
    }
}

export const getHotel = async (req, res, next) => {

    try {
        const hotels = await Hotels.findById(req.params.id);
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}

export const getHotels = async (req, res, next) => {
    const {min,max, ...others} = req.query;
    try {
        const hotels = await Hotels.find({...others, cheapestPrice:{$gt:min | 1 ,$lt:max || 999}}).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');
    try {
        const list = await Promise.all(cities.map((city) => {
            return Hotels.countDocuments({ city: city });
        })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
} 
export const countByType = async (req, res, next) => {
    try{
    const hotelCount = await Hotels.countDocuments({type:'hotel'})
    const apartmentCount = await Hotels.countDocuments({type:'apartment'})
    const resortCount = await Hotels.countDocuments({type:'resort'})
    const villaCount = await Hotels.countDocuments({type:'villa'})
    const cabinCount = await Hotels.countDocuments({type:'cabin'})
     res.status(200).json([
        {type:'hotel',count:hotelCount},
        {type:'apartments',count:apartmentCount},
        {type:'resorts',count:resortCount},
        {type:'villas',count:villaCount},
        {type:'cabins',count:cabinCount},
     ])   
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
} 

export const getHotelRooms = async (req, res, next) => {
    try {
      const hotels = await Hotels.findById(req.params.id);
      const list = await Promise.all(
        hotels.rooms.map((room) => {
          return Rooms.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };