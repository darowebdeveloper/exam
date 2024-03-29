import 'remixicon/fonts/remixicon.css';
import './stylesheets/theme.css';
import './stylesheets/alignments.css';
import './stylesheets/textElements.css';
import './stylesheets/customComponents.css';
import './stylesheets/formElements.css';
import './stylesheets/layout.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/common/Home';
import Exams from './pages/admin/Exams';
import AddEditExam from './pages/admin/Exams/AddEditExam';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import WriteExam from './pages/user/WriteExam';
import UserReport from './pages/user/UserReport';
import AdminReport from './pages/admin/adminReport';
import Category from './pages/admin/Category';
import AddEditQuestion from './pages/admin/Exams/AddEditQuestion';
// import { QueryStatus } from '@reduxjs/toolkit/dist/query';
function App() {
  // const loading = useSelector((state) => {
  //   return Object.values(state.api.queries).some((query) => {
  //     return query && query.status === QueryStatus.pending;
  //   });
  // });
  const loading = useSelector((state) => state.loader.loading);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/write-exam/:id"
            element={
              <ProtectedRoute>
                <WriteExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/reports"
            element={
              <ProtectedRoute>
                <UserReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/exams"
            element={
              <ProtectedRoute>
                <Exams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute>
                <AdminReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/exams/add"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/exams/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/questions/add"
            element={
              <ProtectedRoute>
                <AddEditQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/questions/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category/:id"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
