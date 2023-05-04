import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CallIcon } from '@assets/patients/call.svg';
import { ReactComponent as EmailIcon } from '@assets/patients/email.svg';
import { ReactComponent as PinIcon } from '@assets/patients/pin.svg';
import { ReactComponent as GenderMaleIcon } from '@assets/patients/genderMale.svg';
import { ReactComponent as CalendarIcon } from '@assets/patients/сalendar.svg';
import {
  ContactInfo,
  ContactsContainer,
  InfoContainer,
  LastAppointment,
  LastAppointmentTitle,
  Overview,
  OverviewTitle,
  PatientCardInfoContainer,
  PatientInfoName,
  ShowMoreLessButton,
  UserInfo,
} from '@components/Patient/styles';
import {
  cityCountryInfo,
  emailInfo,
  genderInfo,
  lastAppointmentInfo,
  nameInfo,
  overviewInformation,
  phoneNumberInfo,
  yearsInfo,
} from '@constants/mockData';

function PatientCardInfoShort() {
  const { t } = useTranslation();

  return (
    <PatientCardInfoContainer>
      <PatientInfoName>{nameInfo}</PatientInfoName>
      <ContactsContainer>
        <CallIcon />
        <ContactInfo>{phoneNumberInfo}</ContactInfo>
        <EmailIcon />
        <ContactInfo>{emailInfo}</ContactInfo>
      </ContactsContainer>
      <InfoContainer>
        <GenderMaleIcon />
        <UserInfo>{genderInfo}</UserInfo>
        <CalendarIcon />
        <UserInfo>{yearsInfo}</UserInfo>
        <PinIcon />
        <UserInfo>{cityCountryInfo}</UserInfo>
      </InfoContainer>
      
    </PatientCardInfoContainer>
  );
}

export default PatientCardInfoShort;
