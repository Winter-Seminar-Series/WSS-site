import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import LabTalkCard from '../components/cards/LabTalkCard';
import RoundTableCard from '../components/cards/RoundTableCard'
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const RoundTables = ({
  thisSeries,
  getWSSPrimitiveFields,
  getModelList,
  roundTables,
  isFetching,
}) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.ROUND_TABLES, thisSeries);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, thisSeries);
  }, [getWSSPrimitiveFields]);

  return (
    <>
      <section id="ts-speakers" className="background-theme ts-speakers pt-4">
        <div className="container text-white">
          <div className="row mb-3">
            <h3 className="mb-1 col section-sub-title title-white">
              Round Tables
            </h3>
          </div>
          {roundTables.length > 0 && !isFetching && (
            <div className="row">
              {
                // seminars.map((seminar) => (
                //   <div key={seminar.id} className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
                //     <PublicCard id={seminar.speaker} presentationLink={'/seminar/' + seminar.id}></PublicCard>
                //   </div>
                // ))
                roundTables.map((roundTable) => (
                    <div
                        key={roundTable.id}
                        className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
                      <RoundTableCard
                          id={roundTable.id}
                          presentationLink={'/roundtable/' + roundTable.id}
                      />
                    </div>
                ))
              }
            </div>
          )}
          {isFetching && (
            <div className="row">
              <div className="col">Loading...</div>
            </div>
          )}
          {roundTables.length === 0 && !isFetching && (
            <div className="row">
              <div className="col">Nothing has been added yet</div>
              {/*<div*/}
              {/*    className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">*/}
              {/*</div>*/}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    thisSeries: state.WSS.thisSeries,
    isFetching: state.WSS.isFetching,
    roundTables: state.WSS.roundtables,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(RoundTables);
