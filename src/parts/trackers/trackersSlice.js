import {createSlice, nanoid, createAsyncThunk} from "@reduxjs/toolkit";

const initTrackers = [
    // {
    //     id: nanoid(8),
    //     name: 'Йога',
    //     quantity: 4,
    //     color: '#B21E3F',
    //     message: true,
    //     checked: true,
    // },
]

const arrTrackers = getListTrackers('trackers', initTrackers)

function getListTrackers(key, initTrackers) {
    let data = JSON.parse(localStorage.getItem(key)) || initTrackers
    return data
}

function saveDataLockStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}


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
                saveDataLockStorage('trackers', state.trackers)
                console.log('initialState', action.payload)
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
                saveDataLockStorage('trackers', state.trackers)
            }
        },
        trackerRemove: {
            reducer(state, action) {
                const {id} = action.payload
                state.trackers = state.trackers.filter(tracker => tracker.id !== id)
                saveDataLockStorage('trackers', state.trackers)
            }
        }
    }
})

export const {trackerAdded, trackerChecked, trackerEdit, trackerRemove} = trackersSlice.actions

export default trackersSlice.reducer

export const selectAllTrackers = (state) => state.trackers.trackers

export const selectTrackerId = (state, trackerId) =>
    state.trackers.trackers.find(tracker => tracker.id === trackerId)

