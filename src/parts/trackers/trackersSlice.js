import {createSlice, nanoid, createAsyncThunk} from "@reduxjs/toolkit";

const arrTrackers = [
    {
        id: nanoid(8),
        name: 'Йога',
        quantity: 4,
        color: '#B21E3F',
        message: true,
        checked: true,
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
            prepare(name, quantity, color, message, checked) { // возвращать объект payload со сгенерированным id и другими нашими данными:
                return {
                    payload: {
                        id: nanoid(8),
                        name,
                        quantity,
                        color,
                        message,
                        checked,
                    }
                }
            }
        },
        trackerChecked(state, action) {
            const {id, checked} = action.payload
            const desiredTracker = state.trackers.find(tracker => tracker.id === id)

            if (desiredTracker) {
                desiredTracker.checked = checked
            }
        },
        trackerEdit(state, action) {
            const {id, name, quantity, color, message, checked} = action.payload
            const desiredTracker = state.trackers.find(tracker => tracker.id === id)

            if (desiredTracker) {
                desiredTracker.name = name
                desiredTracker.quantity = quantity
                desiredTracker.color = color
                desiredTracker.message = message
                desiredTracker.checked = checked
            }
        },
        trackerRemove: {
            reducer(state, action) {
                const {id} = action.payload

                const updateTrackers = state.trackers.filter(tracker => {
                    console.log('!!!!!', tracker.id)
                    console.log('&&&&', id)
                    tracker.id !== id
                    return updateTrackers
                })
                return state.trackers
            }
        }
    }
})

export const {trackerAdded, trackerChecked, trackerEdit, trackerRemove} = trackersSlice.actions

export default trackersSlice.reducer

export const selectAllTrackers = (state) => state.trackers.trackers

export const selectTrackerId = (state, trackerId) =>
    state.trackers.trackers.find(tracker => tracker.id === trackerId)

