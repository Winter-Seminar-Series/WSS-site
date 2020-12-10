import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { THIS_YEAR } from '../constants/info';
import { Speaker } from '../models/wss';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Staffs = ({ getWSSPrimitiveFields, getModelList, staff, isFetching }) => {
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
            <h3 className="mb-1 col section-sub-title title-white">Staffs</h3>
          </div>
          {staff.length > 0 && !isFetching &&
            <div className="row">
              {staff.map((staff) => (
                <div key={staff.id} className="col-xs-12 col-sm-6 col-lg-3">
                  <PublicCard id={staff.id} isStaff='true'></PublicCard>
                </div>
              ))}
            </div>
          }
          {isFetching && (
            <div className="row">
              <div className="col">Loading...</div>
            </div>
          )}
          {staff.length === 0 && !isFetching &&
            <div className="row">
              <div className="col">Nothing has been added yet</div>
            </div>
          }
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
})(Staffs);
