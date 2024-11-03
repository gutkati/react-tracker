import {configureStore} from "@reduxjs/toolkit";
import trackersReducer from '../parts/trackers/trackersSlice'

export default configureStore({
    reducer: {
        trackers: trackersReducer,
    }
})