import React from 'react';
import { useTranslation } from 'react-i18next';

function UserWorkshopList() {
  const { t } = useTranslation('dashboard', { useSuspense: false });

  return (
    <>
      <div className="row align-items-center justify-content-center h-100">
        {t('noWorkshopList')}
      </div>
    </>
  );
}

export default UserWorkshopList;
