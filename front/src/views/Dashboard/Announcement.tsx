import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRegisteredWorkshops } from '../../redux/actions/participant';
import { MODEL_LISTS_NAMES, getModelList } from '../../redux/actions/WSS';

function Announcement({
  thisSeries,
  getRegisteredWorkshops,
  getModelList,
  registeredWorkshops,
  workshops,
}) {
  useEffect(() => {
    getRegisteredWorkshops(thisSeries);
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, thisSeries);
  }, [getModelList, getRegisteredWorkshops]);

  return (
    <>
      <div className="diagonal seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="title">Registration</div>
        </div>
      </div>
      <div>Salam Hamed!</div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { registeredWorkshops } = state.Participant;
  const { workshops } = state.WSS;
  const { thisSeries } = state.account;
  return {
    thisSeries,
    registeredWorkshops,
    workshops,
  };
};

export default connect(mapStateToProps, {
  getRegisteredWorkshops,
  getModelList,
})(Announcement);
