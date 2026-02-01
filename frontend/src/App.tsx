import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import LoginPage from './pages/login/page';
import RegisterPage from './pages/register/page';
import DashboardPage from './pages/dashboard/DashboardPage';
import CourseSearchPage from './pages/courses/CourseSearchPage';
import CourseDetailPage from './pages/courses/CourseDetailPage';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CourseSearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div>Profile Page (to be implemented)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <div>Settings Page (to be implemented)</div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App
