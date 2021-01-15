import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getRegisteredWorkshops,
} from '../../redux/actions/participant';
import {
  MODEL_LISTS_NAMES,
  getModelList,
} from '../../redux/actions/WSS'

function Announcement({
  thisYear,
  getRegisteredWorkshops,
  getModelList,
  registeredWorkshops,
  workshops,
}) {

  useEffect(() => {
    getRegisteredWorkshops(thisYear);
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, thisYear);
  }, [getModelList, getRegisteredWorkshops])

  return (
    <>
      <div className="diagonal seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="title">
            Registration
          </div>
        </div>
      </div>
      <div>
        Salam Hamed!
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { registeredWorkshops, } = state.Participant;
  const { workshops, thisYear } = state.WSS;
  return {
    thisYear,
    registeredWorkshops,
    workshops,
  };
};

export default connect(
  mapStateToProps,
  {
    getRegisteredWorkshops,
    getModelList,
  })(Announcement);
