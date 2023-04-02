import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import LabTalkCard from "../components/cards/LabTalkCard";
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const LabTalks = ({
  thisSeries,
  getWSSPrimitiveFields,
  getModelList,
  labtalks,
  isFetching,
}) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.LAB_TALKS, thisSeries);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, thisSeries);
  }, [getWSSPrimitiveFields]);

  return (
    <>
      <div className="fixed-background">
        <section id="ts-speakers" className="ts-speakers pt-4">
          <div className="container text-white">
            <div className="row mb-3">
              <h3 className="mb-1 col section-sub-title title-white">
                Lab Talks
              </h3>
            </div>
            {labtalks.length > 0 && !isFetching && (
              <div className="row">
                {
                  // seminars.map((seminar) => (
                  //   <div key={seminar.id} className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
                  //     <PublicCard id={seminar.speaker} presentationLink={'/seminar/' + seminar.id}></PublicCard>
                  //   </div>
                  // ))
                  Array.from(Array(labtalks.length).keys())
                    .sort(() => Math.random() - 0.5)
                    .map((index) => (
                      <div
                        key={index}
                        className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
                        <LabTalkCard
                          id={labtalks[index].id}
                          presentationLink={'/labtalk/' + labtalks[index].id}
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
            {labtalks.length === 0 && !isFetching && (
              <div className="row">
                <div className="col">Nothing has been added yet</div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { isFetching, labtalks } = state.WSS;
  const { thisSeries } = state.account;
  return {
    thisSeries,
    isFetching,
    labtalks,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(LabTalks);
