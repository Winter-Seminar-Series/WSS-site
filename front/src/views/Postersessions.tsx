import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { Speaker } from '../models/wss';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Postersessions = ({
  thisYear,
  getWSSPrimitiveFields,
  getModelList,
  postersessions,
  isFetching,
}) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.POSTERSESSIONS, thisYear);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, thisYear);
  }, [getWSSPrimitiveFields]);

  return (
    <>
      <section
        id="ts-speakers"
        className="background-theme ts-speakers diagonal">
        <div className="container text-white">
          <div className="row mb-3">
            <h3 className="mb-1 col section-sub-title title-white">Postersessions</h3>
          </div>
          {postersessions.length > 0 && !isFetching &&
            <div className="row">
              {postersessions.map((postersession) => (
                <div key={postersession.id} className="col-xs-12 col-sm-6 col-lg-3">
                  <PublicCard id={postersession.speaker} presentationLink={'/postersession/' + postersession.id}></PublicCard>
                </div>
              ))}
            </div>
          }
          {isFetching && (
            <div className="row">
              <div className="col">Loading...</div>
            </div>
          )}
          {postersessions.length === 0 && !isFetching &&
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
  const { isFetching, postersessions, thisYear } = state.WSS;
  return {
    thisYear,
    isFetching,
    postersessions,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(Postersessions);
