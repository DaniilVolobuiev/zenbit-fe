export default interface CreatePatientInitialState {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  country?: string;
  city?: string;
  birthDate?: string;
  address?: string;
  timeZone?: string;
  overview?: string;
  isLoading: boolean;
}
