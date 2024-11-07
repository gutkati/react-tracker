import {configureStore} from "@reduxjs/toolkit";
import trackersReducer from '../parts/trackers/trackersSlice'
import daysReducer from '../parts/days/daysSlice'

export default configureStore({
    reducer: {
        trackers: trackersReducer,
        days: daysReducer,
    }
})