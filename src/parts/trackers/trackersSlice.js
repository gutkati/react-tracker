import {createSlice, nanoid, createAsyncThunk} from "@reduxjs/toolkit";

// const initialState = [
//     {
//         id: nanoid(8),
//         name: 'Йога',
//         quantity: 4,
//         color: '#B21E3F',
//         message: true,
//     },
//
// ]

const initialState = {
    trackers: [],
}

const trackersSlice = createSlice({
    name: 'trackers',
    initialState,
    reducers: {
        trackerAdded: {
            reducer(state, action) { // обновлять стейт
                //console.log('action', action.payload)
                state.trackers.push(action.payload)
                console.log('initialState', state.trackers)
            },
            prepare(name, quantity, color, message) { // возвращать объект payload со сгенерированным id и другими нашими данными:
                return {
                    payload: {
                        id: nanoid(8),
                        name,
                        quantity,
                        color,
                        message,
                    }
                }
            }
        }
    }
})

export const {trackerAdded} = trackersSlice.actions

export default trackersSlice.reducer

export const selectAllTrackers = (state) => {
    console.log('88', state.trackers.trackers)
    state.trackers.trackers}
