import {createSlice, nanoid, createAsyncThunk} from "@reduxjs/toolkit";

const arrTrackers = [
    {
        id: nanoid,
        name: 'Йога',
        quantity: 4,
        color: '#B21E3F',
        message: true,
    }
]

const initialState = {
    trackers: arrTrackers,
}

const trackersSlice = createSlice({
    name: 'trackers',
    initialState,
    reducers: {
        trackerAdded: {

        }
    }
})