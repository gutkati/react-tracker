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
                console.log('action', action.payload)
            },
            prepare(id, nowDate, name, color) { // возвращать объект payload с данными:
                return {
                    payload: {
                        date: nowDate,
                        arrTracker: [
                            {
                                id,
                                name,
                                color,
                            }
                        ]
                    }
                }
            }
        },

        trackerDaysAdded: {
            reducer(state, action) {
                const {id, name, color, nowDate} = action.payload
                console.log('action', action.payload)

                const day = state.days.find(day => day.date === nowDate)

                if (day) {
                    day.arrTracker.push({id, name, color});
                }

            },
            prepare(id, nowDate, name, color) { // возвращать объект payload с данными:
                return {
                    payload: {
                        id,
                        nowDate,
                        name,
                        color,
                    }
                }
            }
        },

        markRemove: {
            reducer(state, action) {
                const {id, nowDate} = action.payload

                console.log('$$$', action.payload)
                // state.days = state.days.filter(tracker => tracker.id !== id)

                const day = state.days.find(day => day.date === nowDate)

                if (day) {
                    day.arrTracker = day.arrTracker.filter(mark => mark.id !== id);
                }
            }
        }
    }

})

export const {daysAdded, trackerDaysAdded, markRemove} = daysSlice.actions

export default daysSlice.reducer

export const selectAllDays = (state) => state.days.days

export const selectDayDate = (state, date) =>
    state.trackers.trackers.find(tracker => tracker.date === date)