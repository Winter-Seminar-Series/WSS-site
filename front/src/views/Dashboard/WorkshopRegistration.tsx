import { useTranslation } from 'react-i18next';



import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import {
  getModelList,
  getModelListCount,
  MODEL_LISTS_NAMES,
} from '../../redux/actions/WSS'

function WorkshopRegistration({ workshops, workshops_count }) {
  const { t } = useTranslation('workshopRegistration', { useSuspense: false });
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, 2020);
    getModelListCount(MODEL_LISTS_NAMES.WORKSHOPS, 2020);
  }, [getModelList, getModelListCount]);

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

const mapStateToProps = (state, ownProps) => ({
  workshops: state.WSS.workshops
    ? state.WSS.workshops
    : [],
  workshops_count: state.WSS.workshops_count
    ? state.WSS.workshops_count
    : 0,
})

export default connect(
  mapStateToProps,
  {
    getModelList,
    getModelListCount,
  }
)(WorkshopRegistration);
