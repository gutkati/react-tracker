import {createSlice, nanoid} from "@reduxjs/toolkit";

let arr = [
    {
        id: '',
        date: '',
        arrTracker: [
            {
                name: '',
                color: '',
            }
        ],
    }
]

const initialState = {
    days: [],
}

const daysSlice = createSlice({
    name: 'days',
    initialState,
    reducers: {
        daysAdded: {
            reducer(state, action) {
                state.days.push(action.payload)
            }
        },
        prepare(id, date, name, color) { // возвращать объект payload с данными:
            return {
                payload: {
                    id,
                    date,
                    name,
                    color,
                }
            }
        }
    }
})

export const {daysAdded} = daysSlice.actions

export const selectAllDays = (state) => state.days.days

export default daysSlice.reducer