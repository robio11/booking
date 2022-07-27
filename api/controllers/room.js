import Rooms from "../models/Rooms.js";
import Hotels from '../models/Hotels.js';
import { createError } from '../utils/error.js';

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Rooms(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotels.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req, res, next) => {

    try {
        const updatedRooms = await Rooms.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRooms);
    } catch (err) {
        next(err);
    }
}

export const updateRoomAvailability = async (req, res, next) => {

    try {
        await Rooms.updateOne(
            { 'roomNumbers._id': req.params.id },
            {
                $push: {
                    'roomNumbers.$.unavailableDates': req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};

export const deleteRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    try {
        await Rooms.findByIdAndDelete(req.params.id)
        res.status(200).json('Room has been delete.');

    } catch (err) {
        next(err);
    }
}

export const getRoom = async (req, res, next) => {

    try {
        const rooms = await Rooms.findById(req.params.id);
        try {
            await Hotels.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}

export const getRooms = async (req, res, next) => {

    try {
        const rooms = await Rooms.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
} 