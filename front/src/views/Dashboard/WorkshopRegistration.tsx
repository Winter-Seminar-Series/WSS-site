import React from 'react';
import { useTranslation } from 'react-i18next';

function WorkshopRegistration() {
  const { t } = useTranslation('workshopRegistration', { useSuspense: false });

  return (
    <>
      <div className="seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="event">{t('event')}</div>
          <div className="title">{t('title')}</div>
          <div className="date">{t('date')}</div>
        </div>
      </div>
    </>
  );
}

export default WorkshopRegistration;
