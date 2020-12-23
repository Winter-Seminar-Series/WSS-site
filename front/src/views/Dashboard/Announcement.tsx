import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { THIS_YEAR } from '../../constants/info';
import {
  getRegisteredWorkshops,
} from '../../redux/actions/participant';
import {
  MODEL_LISTS_NAMES,
  getModelList,
} from '../../redux/actions/WSS'

function Announcement({
  getRegisteredWorkshops,
  getModelList,
  registeredWorkshops,
  workshops,
}) {

  useEffect(() => {
    getRegisteredWorkshops(THIS_YEAR);
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, THIS_YEAR);
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
  const { workshops } = state.WSS;
  return {
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
