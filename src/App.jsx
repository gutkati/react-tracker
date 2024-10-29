import {useState} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./root";
import TrackerList from "./parts/trackerList/trackerList";
import EditTracker from "./parts/editTrcaker/editTracker";


const router = createBrowserRouter([
    {
        path: '/track',
        element: <Root/>
    },

    {
        path: '/trackers',
        element: <TrackerList/>
    },

    {
        path: '/',
        element: <EditTracker/>
    }


])

function App() {

    return <RouterProvider router={router}/>
}

export default App
