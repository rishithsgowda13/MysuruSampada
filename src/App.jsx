import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import UserDashboard from './pages/dashboards/UserDashboard';
import PartnerDashboard from './pages/dashboards/PartnerDashboard';
import OwnerDashboard from './pages/dashboards/OwnerDashboard';
import Explore from './pages/Explore';
import TripPlanning from './pages/TripPlanning';
import PlacesList from './pages/PlacesList';
import MapView from './pages/MapView';
import Maintenance from './pages/Maintenance';
import ArtisanProfile from './pages/ArtisanProfile';
import MaintenanceGuard from './components/MaintenanceGuard';
import Settings from './pages/Settings';
import TripDetail from './pages/trip-planner/TripDetail';

import TravelAIHome from './pages/trip-planner/TravelAIHome';

// Your Travel Agent Imports
import VoyageLayout from './voyage-app/Layout';
import VoyageHome from './voyage-app/pages/Home';
import VoyageCreateTrip from './voyage-app/pages/CreateTrip';
import VoyageMyTrips from './voyage-app/pages/MyTrips';
import VoyageTripDetails from './voyage-app/pages/TripDetails';

import Layout from './components/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
    console.log('Rendering full App structure...');
    return (
        <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <AuthProvider>
                    <Router>
                        {/* Your Travel Agent Routes - Outside main Layout */}
                        <Routes>
                            <Route path="/voyage" element={<VoyageLayout currentPageName="Home"><VoyageHome /></VoyageLayout>} />
                            <Route path="/voyage/create" element={<VoyageLayout currentPageName="CreateTrip"><VoyageCreateTrip /></VoyageLayout>} />
                            <Route path="/voyage/my-trips" element={<VoyageLayout currentPageName="MyTrips"><VoyageMyTrips /></VoyageLayout>} />
                            <Route path="/voyage/details" element={<VoyageLayout currentPageName="TripDetails"><VoyageTripDetails /></VoyageLayout>} />

                            {/* Main App Routes */}
                            <Route path="/*" element={
                                <Layout>
                                    <Routes>
                                        <Route path="/maintenance" element={<Maintenance />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/forgot-password" element={<ForgotPassword />} />
                                        <Route path="/signup" element={<Signup />} />
                                        <Route path="/travel-ai-demo" element={<TravelAIHome />} />
                                        <Route path="/travel-ai-demo/detail" element={<TripDetail />} />

                                        {/* Protected Routes */}
                                        <Route element={<ProtectedRoute />}>
                                            <Route element={<MaintenanceGuard />}>
                                                <Route path="/" element={<UserDashboard />} />
                                                <Route path="/landing" element={<Home />} />
                                                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                                                <Route path="/user-dashboard" element={<UserDashboard />} />
                                                <Route path="/partner-dashboard" element={<PartnerDashboard />} />
                                                <Route path="/explore" element={<Explore />} />
                                                <Route path="/trip-planning" element={<TripPlanning />} />
                                                <Route path="/explore/:type" element={<PlacesList />} />
                                                <Route path="/settings" element={<Settings />} />
                                                <Route path="/map" element={<MapView />} />
                                                <Route path="/artisan/:id" element={<ArtisanProfile />} />
                                            </Route>
                                        </Route>
                                    </Routes>
                                </Layout>
                            } />
                        </Routes>
                    </Router>
                </AuthProvider>
            </LanguageProvider>
        </QueryClientProvider>
    );
};

export default App;
