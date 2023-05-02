import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpFirstStep from '@pages/auth/signUp/signUpFirstStep';
import SignUpSecondFormGoogle from '@components/Auth/SignUpForm/SignUpSecondStepFormGoogle';
import ResetPassword from '@pages/auth/resetPassword';
import Login from '@pages/auth/login';
import ForgotPassword from '@pages/auth/forgotPassword';
import Confirmation from '@pages/auth/forgotPassword/confirmation';
import Profile from '@pages/doctor/profile';
import PageWrapper from '@components/PageWrapper';
import Help from '@pages/help';
import Activation from '@pages/auth/signUp/activation';
import CreatePatientCard from '@pages/patient/createPatientCard';
import EditPatientCard from '@pages/patient/EditPatientCard';
import TempScheduler from '@pages/tempScheduler';
import ProtectedRoute from './protected-route';
import PatientInfo from '@pages/patient/patientInfo';

export const PATH = {
  SIGN_UP: '/auth',
  VERIFICATION: '/auth/activation/:link',
  SIGN_UP_SECOND_STEP_GOOGLE: '/sign-up/second-step/google',
  FORGOT_PASS: '/forgot-pass',
  CONFIRM: '/forgot-pass/confirm',
  RESET_PASS: '/reset-pass/:token',
  LOGIN: '/',
  EDIT_DOCTOR_PROFILE: '/edit-doctor-profile',
  HELP: '/help',
  DASHBOARD: '/dashboard',
  CREATE_PATIENT_CARD: '/create-patient-card',
  EDIT_PATIENT_CARD: '/edit-patient-card',
  SCHEDULER: '/scheduler',
  PATIENT_CARD_INFO: '/patient',
};

const AppRouter = () => {
  return (
    <PageWrapper>
      <Routes>
        {/* Public Routes */}
        <Route path={PATH.SIGN_UP} element={<SignUpFirstStep />} />
        <Route path={PATH.VERIFICATION} element={<Activation />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.RESET_PASS} element={<ResetPassword />} />

        {/* Private Routes */}
        <Route
          path={PATH.SIGN_UP_SECOND_STEP_GOOGLE}
          element={
            <ProtectedRoute allowedRoles={['']}>
              <SignUpSecondFormGoogle />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.CREATE_PATIENT_CARD}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <CreatePatientCard />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.FORGOT_PASS}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.CONFIRM}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <Confirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.EDIT_DOCTOR_PROFILE}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.HELP}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <Help />
            </ProtectedRoute>
          }
        />

        <Route
          path={PATH.DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.SCHEDULER}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <TempScheduler />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.PATIENT_CARD_INFO}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <PatientInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </PageWrapper>
  );
};

export default AppRouter;
