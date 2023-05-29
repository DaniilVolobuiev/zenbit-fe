import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { signUpReducer } from '@redux/slices/auth/signUp';
import { forgotPasswordReducer } from '@redux/slices/auth/forgotPassword';
import { doctorApi } from 'services/DoctorService';
import { authApi } from 'services/AuthService';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginReducer } from '@redux/slices/auth/login';
import { activationAccountReducer } from '@redux/slices/auth/activation';
import { noteApi } from 'services/NoteService';
import { navigationReducer } from 'redux/slices/NavigationSlice';
import { doctorReducer } from 'redux/slices/DoctorSlice';
import { resetPasswordReducer } from '@redux/slices/auth/resetPassword';
import { createPatientReducer } from '@redux/slices/patient/createPatient';
import { noteFilterReducer } from 'redux/slices/NoteFilterSlice';
import { patientApi } from 'services/PatientService';
import { availabilityApi } from 'services/AvailabilityService';
import { appointmentApi } from 'services/AppointmentService';
import { socketAppointmenttReducer } from '@redux/slices/socketAppointmentsSlice';
import { zoomReducer } from './slices/ZoomSlice';
import { zoomApi } from 'services/ZoomService';
import { bookAppointmentApi } from 'services/BookAppointmetService';

const rootReducer = combineReducers({
  loginReducer,
  signUpReducer,
  navigationReducer,
  doctorReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  activationAccountReducer,
  createPatientReducer,
  noteFilterReducer,
  zoomReducer,
  socketAppointmenttReducer,
  [noteApi.reducerPath]: noteApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [availabilityApi.reducerPath]: availabilityApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
  [zoomApi.reducerPath]: zoomApi.reducer,
  [bookAppointmentApi.reducerPath]: bookAppointmentApi.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'navigationReducer',
    'activationAccount',
    'resetPassword',
    'forgotPassword',
    'loginReducer',
    'signUpReducer',
    'zoomApi',
    'zoomReducer',
    'noteFilterReducer',
    'socketAppointmenttReducer',
    'authApi',
    'noteApi',
    'appointmentApi',
    'bookAppointmentApi',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(
        doctorApi.middleware,
        authApi.middleware,
        noteApi.middleware,
        patientApi.middleware,
        availabilityApi.middleware,
        appointmentApi.middleware,
        zoomApi.middleware,
        bookAppointmentApi.middleware
      ),
  });
export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
