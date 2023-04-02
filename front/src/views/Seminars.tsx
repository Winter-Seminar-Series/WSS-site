import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SeminarCard from '../components/cards/SeminarCard';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Seminars = ({
  thisSeries,
  getWSSPrimitiveFields,
  getModelList,
  seminars,
  isFetching,
}) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.SEMINARS, thisSeries);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, thisSeries);
  }, [getWSSPrimitiveFields]);

  return (
    <>
      <section
        id="ts-speakers"
        className="background-theme ts-speakers pt-4">
        <div className="container text-white">
          <div className="row mb-3">
            <h3 className="mb-1 col section-sub-title title-white">Seminars</h3>
          </div>
          {seminars.length > 0 && !isFetching && (
            <div className="row">
              {
                // seminars.map((seminar) => (
                //   <div key={seminar.id} className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
                //     <PublicCard id={seminar.speaker} presentationLink={'/seminar/' + seminar.id}></PublicCard>
                //   </div>
                // ))
                Array.from(Array(seminars.length).keys())
                  .sort(() => Math.random() - 0.5)
                  .map((index) => (
                    <div
                      key={index}
                      className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
                      <SeminarCard
                        id={seminars[index].speaker}
                        poster_picture={seminars[index].poster_picture}
                        presentationLink={'/seminar/' + seminars[index].id}
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
          {seminars.length === 0 && !isFetching && (
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
  const { isFetching, seminars } = state.WSS;
  const { thisSeries } = state.account;
  return {
    thisSeries,
    isFetching,
    seminars,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(Seminars);
