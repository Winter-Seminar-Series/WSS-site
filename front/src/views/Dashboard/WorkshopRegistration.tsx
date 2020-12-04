import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import {
  getModelList,
  getModelListCount,
  MODEL_LISTS_NAMES,
} from '../../redux/actions/WSS'

function WorkshopRegistration({ workshops, workshops_count }) {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, 2020);
    getModelListCount(MODEL_LISTS_NAMES.WORKSHOPS, 2020);
  }, [getModelList, getModelListCount]);
  
  return <>this is WorkshopRegistration</>;
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
