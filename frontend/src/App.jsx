// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import MyJournal from './pages/MyJournal';
import Newentry from './pages/Newentry';
import Entries from './pages/Entries';
import Myaccount from './pages/Myaccount';
import Setting from './components/Setting';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import GraphPage from './components/GraphPage';
import Dashboard from './pages/Dashboard';
import AnonymousChat from './pages/AnonymousChat';
import MentalHealth from './pages/MentalHealth';
import BreathingExercise from './pages/BreathingExercise';
import PositiveAffirmations from './pages/PositiveAffirmations';
import MindfulnessMusic from './components/MindfulnessMusic';
import GroundingExercise from './pages/GroundingExercise';
import EducationalContent from './pages/EducationalContent';

const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={redirectTo} replace /> : children;
};

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Root: if logged in -> dashboard, else show Home */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        {/* Login: if already logged in -> dashboard, else show Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/myjournal"
          element={
            <PrivateRoute>
              <MyJournal />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/anonymous-chat"
          element={
            <PrivateRoute>
              <AnonymousChat />
            </PrivateRoute>
          }
        />

        <Route
          path="/mental-exercise"
          element={
            <PrivateRoute>
              <MentalHealth />
            </PrivateRoute>
          }
        />

        <Route
          path="/breathing"
          element={
            <PrivateRoute>
              <BreathingExercise />
            </PrivateRoute>
          }
        />

        <Route
          path="/affirmations"
          element={
            <PrivateRoute>
              <PositiveAffirmations />
            </PrivateRoute>
          }
        />

        <Route
          path="/mindful-music"
          element={
            <PrivateRoute>
              <MindfulnessMusic />
            </PrivateRoute>
          }
        />

        <Route
          path="/grounding"
          element={
            <PrivateRoute>
              <GroundingExercise />
            </PrivateRoute>
          }
        />

        <Route
          path="/educational-content"
          element={
            <PrivateRoute>
              <EducationalContent />
            </PrivateRoute>
          }
        />

        {/* Create New Entry */}
        <Route
          path="/newentry"
          element={
            <PrivateRoute>
              <Newentry />
            </PrivateRoute>
          }
        />

        <Route
          path="/graph"
          element={
            <PrivateRoute>
              <GraphPage />
            </PrivateRoute>
          }
        />

        {/* View/Edit Existing Entry */}
        <Route
          path="/entry/:id"
          element={
            <PrivateRoute>
              <Newentry />
            </PrivateRoute>
          }
        />

        <Route
          path="/entries"
          element={
            <PrivateRoute>
              <Entries />
            </PrivateRoute>
          }
        />

        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Myaccount />
            </PrivateRoute>
          }
        />

        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />

        {/* Fallback: unknown routes -> send to home or dashboard depending on auth */}
        <Route
          path="*"
          element={
            // If authenticated, go to dashboard; otherwise go to home
            <RequireRedirect />
          }
        />
      </Routes>
    </>
  );
};

// Fallback helper component for unknown routes
const RequireRedirect = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
