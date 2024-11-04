import {createSlice, nanoid, createAsyncThunk} from "@reduxjs/toolkit";

const arrTrackers = [
    {
        id: nanoid(8),
        name: 'Йога',
        quantity: 4,
        color: '#B21E3F',
        message: true,
    },

]

const initialState = {
    trackers: arrTrackers,
}

const trackersSlice = createSlice({
    name: 'trackers',
    initialState,
    reducers: {
        trackerAdded: {
            reducer(state, action) { // обновлять стейт
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

export const selectAllTrackers = (state) => state.trackers.trackers
