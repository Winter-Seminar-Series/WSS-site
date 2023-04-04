import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SeminarCard from '../../components/cards/SeminarCard';
import PublicCard from '../../components/cards/PublicCard';
import RoundTableCard from '../../components/cards/RoundTableCard';
import LabTalkCard from '../../components/cards/LabTalkCard';
import { getModelList, MODEL_LISTS_NAMES } from '../../redux/actions/WSS';

const Streams = ({
  thisSeries,
  getWSSPrimitiveFields,
  getModelList,
  streams,
  speakers,
  seminars,
  workshops,
  roundtables,
  labtalks,
  isFetching,
}) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.STREAMS, thisSeries);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, thisSeries);
    getModelList(MODEL_LISTS_NAMES.SEMINARS, thisSeries);
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, thisSeries);
    getModelList(MODEL_LISTS_NAMES.ROUND_TABLES, thisSeries);
    getModelList(MODEL_LISTS_NAMES.LAB_TALKS, thisSeries);
  }, [getWSSPrimitiveFields]);

  useEffect(() => {
  }, [streams])

  const mapEventTypeToComponent = {
    "seminar": (event, index) => {
      const seminar = seminars.find((seminar) => seminar.id === event.id);
      return (
        <div
          key={index}
          className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
          <SeminarCard
            id={seminar.speaker}
            poster_picture={seminar.poster_picture}
            presentationLink={'/dashboard/stream/' + seminar.id}
            blankTarget
          />
        </div>
      );
    },
    "workshop": (event, index) => {
      const workshop = workshops.find((workshop) => workshop.id === event.id);
      return (
        <div
          key={index}
          className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
          <PublicCard
            id={workshop.speaker}
            presentationLink={'/dashboard/stream/' + workshop.id}
            blankTarget
          />
        </div>
      );
    },
    "roundtable": (event, index) => {
      const roundTable = roundtables.find((roundTable) => roundTable.id === event.id);
      return (
        <div
          key={index}
          className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
          <RoundTableCard
            id={roundTable.id}
            presentationLink={'/dashboard/stream/' + roundTable.id}
            blankTarget
          />
        </div>
      );
    },
    "labtalk": (event, index) => {
      const labTalk = labtalks.find((labTalk) => labTalk.id === event.id);
      return (
        <div
          key={index}
          className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
          <LabTalkCard
            id={labTalk.id}
            presentationLink={'/dashboard/stream/' + labTalk.id}
            blankTarget
          />
        </div>
      );
    },
  };

  return (
    <>
      <div className="fixed-background">
        <section
          id="ts-speakers"
          className="ts-speakers pt-4">
          <div className="container text-white">
            <div className="row mb-3">
              <h3 className="mb-1 col section-sub-title title-white">Seminars</h3>
            </div>
            {streams.length > 0 && !isFetching && (
              <div className="row">
                {
                  // seminars.map((seminar) => (
                  //   <div key={seminar.id} className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
                  //     <PublicCard id={seminar.speaker} presentationLink={'/seminar/' + seminar.id}></PublicCard>
                  //   </div>
                  // ))
                  Array.from(Array(streams.length).keys())
                    .sort(() => Math.random() - 0.5)
                    .map((index) => {
                      const event = streams[index];
                      const eventComponent = event && mapEventTypeToComponent[event.type];
                      return eventComponent && eventComponent(streams[index], index)
                    })
                }
              </div>
            )}
            {isFetching && (
              <div className="row">
                <div className="col">Loading...</div>
              </div>
            )}
            {streams.length === 0 && !isFetching && (
              <div className="row">
                <div className="col">No event is currently streaming</div>
              </div>
            )}
          </div>
        </section>
      </div>
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
})(Streams);
