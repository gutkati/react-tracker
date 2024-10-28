import {useState} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./root";
import TrackerList from "./parts/trackerList/trackerList";


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
        element: <TrackerList/>
    }


])

function App() {

    return <RouterProvider router={router}/>
}

export default App
