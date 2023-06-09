import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { EMAIL_PATTERN, NAME_PATTERN } from '@constants/validation';

export default function patientSchema() {
  const { t } = useTranslation();
  const tWithDefault = (key: string) => {
    const translation = t(key);
    return translation || '';
  };

  const createPatientCardSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(tWithDefault('Error.firstNameRequired'))
      .min(2, tWithDefault('Error.tooShort'))
      .matches(NAME_PATTERN, tWithDefault('Error.nameFormat')),
    lastName: yup
      .string()
      .required(tWithDefault('Error.lastNameRequired'))
      .min(2, tWithDefault('Error.tooShort'))
      .matches(NAME_PATTERN, tWithDefault('Error.nameFormat')),
    email: yup
      .string()
      .matches(EMAIL_PATTERN, tWithDefault('Error.invalidEmailFormat')),
    phoneNumber: yup
      .string()
      .required(tWithDefault('Error.phoneNumberRequired'))
      .min(10, tWithDefault('Error.tooShort')),
  });

  const editPatientCardSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(tWithDefault('Error.firstNameRequired'))
      .min(2, tWithDefault('Error.tooShort'))
      .matches(NAME_PATTERN, tWithDefault('Error.nameFormat')),
    lastName: yup
      .string()
      .required(tWithDefault('Error.lastNameRequired'))
      .min(2, tWithDefault('Error.tooShort'))
      .matches(NAME_PATTERN, tWithDefault('Error.nameFormat')),
    email: yup
      .string()
      .matches(EMAIL_PATTERN, tWithDefault('Error.invalidEmailFormat')),
    phoneNumber: yup
      .string()
      .required(tWithDefault('Error.phoneNumberRequired'))
      .min(10, tWithDefault('Error.tooShort')),
  });

  return {
    createPatientCardSchema,
    editPatientCardSchema,
  };
}
