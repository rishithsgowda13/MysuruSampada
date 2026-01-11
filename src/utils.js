export const createPageUrl = (pageName) => {
    // Handle query parameters if present in pageName
    const [page, query] = pageName.split('?');

    const routes = {
        'Home': '/voyage', // Voyage App Home
        'CreateTrip': '/voyage/create',
        'MyTrips': '/voyage/my-trips',
        'TripDetails': '/voyage/details',
        'Explore': '/explore',
        'Map': '/map',
        'Login': '/login',
        'Signup': '/signup'
    };

    const path = routes[page] || '/';
    return query ? `${path}?${query}` : path;
};
