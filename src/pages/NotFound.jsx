import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="flex items-center justify-center mt-10">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-teal-600">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page not found</p>
                <p className="text-gray-500 mt-4 mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link 
                    to="/" 
                    className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition duration-300 ease-in-out"
                >
                    Go back home
                </Link>
            </div>
        </div>
    )
}

export default NotFound