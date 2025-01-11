import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
        // Define a mapping of routes to titles
        const routeTitles = {
            '/': 'Home | FastHelpBd',
            '/services': 'Services | FastHelpBd',
            '/dashboard/add-service': 'Add Service | FastHelpBd',
            '/dashboard/manage-service': 'Manage Service | FastHelpBd',
            '/dashboard/booked-services': 'Booked Services | FastHelpBd',
            '/dashboard/service-to-do': 'Service to Do | FastHelpBd',
            '/login': 'Login | FastHelpBd',
            '/registration': 'Register | FastHelpBd',

        };

        // Set the document title based on the route
        const title = routeTitles[location.pathname] || 'FastHelpBd';
        document.title = title;
    }, [location]); // Runs when the route changes

    return null; // This component doesn't render anything
};

export default DynamicTitle;

