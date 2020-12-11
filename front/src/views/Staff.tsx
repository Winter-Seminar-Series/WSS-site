import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { THIS_YEAR } from '../constants/info';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Staff = ({
  getWSSPrimitiveFields,
  getModelList,
  staff,
  holding_teams,
  isFetching
}) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.HOLDING_TEAMS, THIS_YEAR);
    getModelList(MODEL_LISTS_NAMES.STAFF, THIS_YEAR);
  }, [getWSSPrimitiveFields]);

  return (
    <>
      <section
        id="ts-speakers"
        className="background-theme ts-speakers diagonal">
        <div className="container text-white">
          <div className="row mb-3">
            <h2 className="mb-1 col section-sub-title title-white">Staff</h2>
          </div>
          {holding_teams.map((team) => (
            <>
              <div className="row mb-3">
                <h4 className="mb-2 mt-3 col white">{team.name}</h4>
              </div>
              {staff.length > 0 && !isFetching &&
                <div className="row">
                  {staff.filter((staff) => team.staff.includes(staff.id)).map((staff) => (
                    <div key={staff.id} className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
                      <PublicCard id={staff.id} isStaff='true'></PublicCard>
                    </div>
                  ))}
                </div>
              }
              {isFetching && 
                <div className="row">
                  <div className="col mb-3">Loading...</div>
                </div>
              }
              {staff.length == 0 && !isFetching &&
                <div className="row">
                  <div className="col">Nothing has been added yet</div>
                </div>
              }
            </>
          ))}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { isFetching, staff, holding_teams } = state.WSS;
  return {
    holding_teams,
    isFetching,
    staff,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(Staff);
