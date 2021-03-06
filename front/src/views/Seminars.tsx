import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Seminars = ({
  thisYear,
  getWSSPrimitiveFields,
  getModelList,
  seminars,
  isFetching
}) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.SEMINARS, thisYear);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, thisYear);
  }, [getWSSPrimitiveFields]);

  return (
    <>
      <section
        id="ts-speakers"
        className="background-theme ts-speakers diagonal">
        <div className="container text-white">
          <div className="row mb-3">
            <h3 className="mb-1 col section-sub-title title-white">Speakers</h3>
          </div>
          {seminars.length > 0 && !isFetching &&
            <div className="row">
              {
                // seminars.map((seminar) => (
                //   <div key={seminar.id} className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
                //     <PublicCard id={seminar.speaker} presentationLink={'/seminar/' + seminar.id}></PublicCard>
                //   </div>
                // ))
                Array.from(Array(seminars.length).keys()).sort(() => Math.random() - 0.5)
                  .map((index) =>
                    <div key={index} className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
                      <PublicCard id={seminars[index].speaker} presentationLink={'/seminar/' + seminars[index].id} />
                    </div>
                  )
              }
            </div>
          }
          {isFetching && (
            <div className="row">
              <div className="col">Loading...</div>
            </div>
          )}
          {seminars.length == 0 && !isFetching &&
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
  const { isFetching, seminars } = state.WSS;
  const { thisYear } = state.account;
  return {
    thisYear,
    isFetching,
    seminars,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(Seminars);
