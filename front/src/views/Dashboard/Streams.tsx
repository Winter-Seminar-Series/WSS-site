import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SeminarCard from '../../components/cards/SeminarCard';
import PublicCard from '../../components/cards/PublicCard';
import RoundTableCard from '../../components/cards/RoundTableCard';
import LabTalkCard from '../../components/cards/LabTalkCard';
import { getModelList, getWSSPrimitiveFields, MODEL_LISTS_NAMES } from '../../redux/actions/WSS';

const Streams = ({
  getModelList,
  getWSSPrimitiveFields,
  thisSeries,
  streams,
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

  const mapEventTypeToComponent = {
    "seminar": (event, index) => {
      const seminar = seminars.find((seminar) => seminar.id === event.id);
      if (!seminar) return;
      return (
        <div
          key={seminar.id}
          className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
          <SeminarCard
            id={seminar.speaker}
            poster_picture={seminar.poster_picture}
            presentationLink={event.stream_room.url}
            blankTarget
          />
        </div>
      );
    },
    "workshop": (event, index) => {
      const workshop = workshops.find((workshop) => workshop.id === event.id);
      if (!workshop) return;
      return (
        <div
          key={workshop.id}
          className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
          <PublicCard
            id={workshop.speaker}
            presentationLink={event.stream_room.url}
            blankTarget
          />
        </div>
      );
    },
    "roundtable": (event, index) => {
      const roundTable = roundtables.find((roundTable) => roundTable.id === event.id);
      if (!roundTable) return;
      return (
        <div
          key={roundTable.id}
          className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
          <RoundTableCard
            id={roundTable.id}
            presentationLink={event.stream_room.url}
            blankTarget
          />
        </div>
      );
    },
    "labtalk": (event, index) => {
      const labTalk = labtalks.find((labTalk) => labTalk.id === event.id);
      if (!labTalk) return;
      return (
        <div
          key={labTalk.id}
          className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
          <LabTalkCard
            id={labTalk.id}
            presentationLink={event.stream_room.url}
            blankTarget
          />
        </div>
      );
    },
  };

  return (
    <>
      <div className="diagonal seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3 pt-5">
          <div className="title">Streaming Events</div>
        </div>
      </div>
      <div className="container py-5 my-5">
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
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    isFetching,
    streams,
    seminars,
    workshops,
    roundtables,
    labtalks
  } = state.WSS;
  const { thisSeries } = state.account;
  return {
    thisSeries,
    streams,
    seminars,
    workshops,
    roundtables,
    labtalks,
    isFetching,
  };
};

export default connect(mapStateToProps, {
  getModelList,
  getWSSPrimitiveFields
})(Streams);
