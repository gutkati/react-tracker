import {useState} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./root";
import TrackerList from "./parts/trackers/trackerList/trackerList";
import EditTracker from "./parts/trackers/editTrcaker/editTracker";
import CreateTracker from "./parts/trackers/createTracker/createTracker";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>
    },

    {
        path: '/trackers',
        element: <TrackerList/>
    },

    {
        path: '/createTracer',
        element: <CreateTracker/>
    },

    {
        path: '/editTracker/:trackerId',
        element: <EditTracker/>
    }


])

function App() {

    return <RouterProvider router={router}/>
}

export default App
