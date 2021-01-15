import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getRegisteredWorkshops } from '../../redux/actions/participant';
import PublicCard from "../../components/cards/PublicCard";
import {
  MODEL_LISTS_NAMES,
  getModelList,
} from '../../redux/actions/WSS'

function UserWorkshopList({
  thisYear,
  getRegisteredWorkshops,
  getModelList,
  registeredWorkshops,
  isFetching,
}) {

  useEffect(() => {
    getRegisteredWorkshops(thisYear);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, thisYear);
  }, [getModelList, getRegisteredWorkshops])

  const { t } = useTranslation('dashboard', { useSuspense: false });

  return (
    <>
      <div className="diagonal seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="title">
            Your Workshops
          </div>
        </div>
      </div>
      <div>
        <div className="p-5" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="row py-4 justify-content-center">to register for workshops please visit&nbsp;<a href='/workshops'>here</a></div>

          {registeredWorkshops.length > 0 && !isFetching &&
            <div className="row py-5">
              {registeredWorkshops.map((workshop) => (
                <div key={workshop.id} className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
                  <PublicCard id={workshop.speaker} presentationLink={'/workshop/' + workshop.id}></PublicCard>
                </div>
              ))}
            </div>
          }
          {isFetching && (
            <div className="row py-4 justify-content-center">
              <div>Loading...</div>
            </div>
          )}
          {registeredWorkshops.length === 0 && !isFetching &&
            <div className="row py-4 justify-content-center">
              <div>You haven't registered for any workshops yet</div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { registeredWorkshops, } = state.Participant;
  const { isFetching, thisYear } = state.WSS;
  return {
    thisYear,
    registeredWorkshops,
    isFetching,
  };
};

export default connect(
  mapStateToProps,
  {
    getRegisteredWorkshops,
    getModelList,
  })(UserWorkshopList);

