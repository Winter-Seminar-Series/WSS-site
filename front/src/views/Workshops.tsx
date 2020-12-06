import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Presenter from '../components/cards/Presenter';
import { THIS_YEAR } from '../constants/info';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Workshops = ({ getWSSPrimitiveFields, getModelList, workshops }) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, THIS_YEAR);
  }, [getWSSPrimitiveFields]);
  //todo check workshop object
  //todo it shows 0 instead of nothing
  return (
    <>
      <section
        id="ts-speakers"
        className="background-theme ts-speakers diagonal">
        <div className="container text-white">
          <div className="row mb-3">
            <div className="mb-1 col section-sub-title title-white">
              {workshops.length === 1 ? 'Workshop' : 'Workshops'}
            </div>
          </div>
          {workshops && workshops.length && (
            <>
              <div className="mt-3">
                <div>
                  For more information about each workshop, click on its image.
                </div>
              </div>
              <div className="row">
                {workshops.map((w) => (
                  <div className="col-xs-12 col-sm-6 col-lg-3">
                    <div className="no-shadow">
                      <Presenter speaker={w.speaker} />
                    </div>
                    {w.registration_link && (
                      <p className="text-center">
                        <a
                          href="dashboard/workshop-registration"
                          className="btn btn-primary btn-white">
                          Register Now
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {(!workshops || workshops.length) && (
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
  const { isFetching, workshops } = state.WSS;
  return {
    isFetching,
    workshops,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(Workshops);
