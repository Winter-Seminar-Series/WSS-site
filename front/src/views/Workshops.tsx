import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { THIS_YEAR } from '../constants/info';
import { Speaker } from '../models/wss';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Workshops = ({ getModelList, workshops, isFetching }) => {
  const [renderOnce, setRenderOnce] = useState(false);

  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, THIS_YEAR);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, THIS_YEAR);
  }, [getModelList]);

  return (
    <>
      <section
        id="ts-speakers"
        className="background-theme ts-speakers diagonal">
        <div className="container text-white">
          <div className="row mb-3">
            <h3 className="mb-1 col section-sub-title title-white">Workshops</h3>
          </div>
          {workshops.length > 0 && !isFetching &&
            <div className="row">
              {workshops.map((workshop) => (
                <div key={workshop.id} className="col-xs-12 col-sm-6 col-lg-3">
                  <PublicCard id={workshop.speaker} presentationLink={'/workshop/' + workshop.id}></PublicCard>
                </div>
              ))}
            </div>
          }
          {isFetching && (
            <div className="row">
              <div className="col">Loading...</div>
            </div>
          )}
          {workshops.length === 0 && !isFetching &&
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
  const { isFetching, workshops } = state.WSS;
  return {
    isFetching,
    workshops,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(Workshops);
