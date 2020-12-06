import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Presenter from '../components/cards/Presenter';
import { THIS_YEAR } from '../constants/info';
import { Speaker } from '../models/wss';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const StaffList = ({ getWSSPrimitiveFields, getModelList, staff }) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.STAFF, THIS_YEAR);
  }, [getWSSPrimitiveFields]);
  return (
    <>
      <section
        id="ts-speakers"
        className="background-theme ts-speakers diagonal">
        <div className="container text-white">
          <div className="row mb-3">
            <h3 className="mb-1 col section-sub-title title-white">Staff</h3>
          </div>
          {staff && staff.length && (
            <div className="row">
              {staff.map((s: Speaker) => (
                <div key={s.id} className="col-xs-12 col-sm-6 col-lg-3">
                  <Presenter speaker={s}></Presenter>
                </div>
              ))}
            </div>
          )}
          {(!staff || !staff.length) && (
            <div className="row">
              <div className="col">Nothing has been added yet</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { isFetching, staff } = state.WSS;
  return {
    isFetching,
    staff,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(StaffList);
