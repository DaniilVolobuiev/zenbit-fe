import React from 'react';
import { useTranslation } from 'react-i18next';
import { IScheduleItem } from '..';
import { CancelButton, ModalButtonsWrapper, ModalContainer, ModalContent, ModalOverlay, SaveButton, Title } from './styles';

interface IPopupDeleteContentProps {
    setSelectedEvent: (event: IScheduleItem | null) => void;
    handleDeleteEvent: () => void;
};

const PopupDeleteContent = ({ setSelectedEvent, handleDeleteEvent }: IPopupDeleteContentProps) => {
    const { t } = useTranslation();

    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalContent>
                    <Title>{t('Calendar.deleteTime')}</Title>
                    <ModalButtonsWrapper>
                        <CancelButton
                            onClick={() => setSelectedEvent(null)}
                            type='button'
                            value={t('Auth.cancel') ?? ''}
                        />
                        <SaveButton
                            onClick={handleDeleteEvent}
                            disabled={false}
                            type='button'
                            value={t('Auth.delete') ?? ''}
                        />
                    </ModalButtonsWrapper>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default PopupDeleteContent;