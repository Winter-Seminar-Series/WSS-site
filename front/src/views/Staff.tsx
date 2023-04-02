import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Staff = ({
  thisSeries,
  getWSSPrimitiveFields,
  getModelList,
  staff,
  holding_teams,
  isFetching,
}) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.HOLDING_TEAMS, thisSeries);
    getModelList(MODEL_LISTS_NAMES.STAFF, thisSeries);
  }, [getWSSPrimitiveFields]);

  return (
    <>
      <div className="fixed-background">
        <section
          id="ts-speakers"
          className="ts-speakers diagonal">
          <div className="container text-white">
            <div className="row mb-3">
              <h2 className="mb-1 col section-sub-title title-white">Staff</h2>
            </div>
            {isFetching && (
              <div className="row">
                <div className="col mb-3 text-center">Loading...</div>
              </div>
            )}
            {staff.length === 0 && !isFetching && (
              <div className="row">
                <div className="col text-center">Nothing has been added yet</div>
              </div>
            )}
            {holding_teams.map((team) => (
              <>
                <div className="row mb-3">
                  <h3 className="mb-2 mt-4 col white text-center">{team.name}</h3>
                </div>
                {staff.length > 0 && !isFetching && (
                  <div className="row justify-content-center">
                    {team.staff.map((staff) => (
                      <div
                        key={staff}
                        className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
                        <PublicCard id={staff} isStaff="true"></PublicCard>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { isFetching, staff, holding_teams } = state.WSS;
  const { thisSeries } = state.account;
  return {
    thisSeries,
    holding_teams,
    isFetching,
    staff,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(Staff);