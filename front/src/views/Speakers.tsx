import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Presenter from '../components/cards/Presenter';
import { THIS_YEAR } from '../constants/info';
import { Speaker } from '../models/wss';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Speakers = ({ getWSSPrimitiveFields, getModelList, speakers }) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, THIS_YEAR);
  }, [getWSSPrimitiveFields]);
  return (
    <>
      <section
        id="ts-speakers"
        className="background-theme ts-speakers diagonal">
        <div className="container">
          <div className="row">
            <h3 className="mb-1 col section-sub-title title-white">Speakers</h3>
          </div>
          {speakers && speakers.length && (
            <div className="row">
              {speakers.map((s: Speaker) => (
                <div key={s.id} className="col-xs-12 col-sm-6 col-lg-3">
                  <Presenter speaker={s}></Presenter>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { isFetching, speakers } = state.WSS;
  return {
    isFetching,
    speakers,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(Speakers);
