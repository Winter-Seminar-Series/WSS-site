import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { THIS_YEAR } from '../constants/info';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Staff = ({
  getWSSPrimitiveFields,
  getModelList,
  staff,
  holding_teams,
  isFetching
}) => {
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.HOLDING_TEAMS, THIS_YEAR);
    getModelList(MODEL_LISTS_NAMES.STAFF, THIS_YEAR);
  }, [getWSSPrimitiveFields]);

  return (
    <>
      <section
        id="ts-speakers"
        className="background-theme ts-speakers diagonal">
        <div className="container text-white">
          <div className="row mb-3">
            <h2 className="mb-1 col section-sub-title title-white">Staff</h2>
          </div>
          {holding_teams.map((team) => (
            <>
              <div className="row mb-3">
                <h3 className="mb-2 mt-3 col white">{team.name}</h3>
              </div>
              {staff.length > 0 && !isFetching &&
                <div className="row">
                  {
                    staff.filter((staff) => team.staff.includes(staff.id)).sort((staff) => {
                      if (team.name === 'Content') {
                        if (staff.name === 'Mahdi Farvardin') return 1
                        else if (staff.name === 'Hossein Firooz') return 2
                        else if (staff.name === 'Sepehr Amini Afshar') return 3
                        else if (staff.name === 'Farzam Zohdinasab') return 4
                        else if (staff.name === 'Pooya Moeini') return 5
                        else if (staff.name === 'Seyed Mohammad mehdi Hatami') return 6
                      } else if (team.name === 'Technical') {
                        if (staff.name === 'Emran Batmanghelich') return 1
                        else if (staff.name === 'Ahmad Salimi') return 2
                        else if (staff.name === 'Ali asghar Ghanati') return 3
                        else if (staff.name === 'Fatemeh Khashei') return 4
                        else if (staff.name === 'Alireza Tajmir riahi') return 5
                        else if (staff.name === 'Seyed Alireza Hashemi') return 6
                        else if (staff.name === 'Mohammad mehdi Barghi') return 7
                      } else if (team.name === 'Networking') {
                        if (staff.name === 'Amirhossein Hadian') return 1
                        else if (staff.name === 'Shima Ramadani') return 2
                        else if (staff.name === 'Sara Azarnoosh') return 3
                        else if (staff.name === 'Ehsan Movafagh') return 4
                        else if (staff.name === 'Fatemeh Asgari') return 5
                        else if (staff.name === 'Sajjad Rezvani') return 6
                        else if (staff.name === 'Amirmohammad Imani') return 7
                        else if (staff.name === 'Mehdi Jalali') return 8
                      } else if (team.name === 'Social') {
                        if (staff.name === 'Sara Azarnoosh') return 1
                        else if (staff.name === 'Dorna Dehghani') return 2
                        else if (staff.name === 'Ghazal Shenavar') return 3
                        else if (staff.name === 'Helia Akhtarkavian') return 4
                        else if (staff.name === 'Sabiheh Tajdari') return 5
                        else if (staff.name === 'Sahel Messforoosh') return 6
                        else if (staff.name === 'Esmaeil Pahang') return 7
                      } else if (team.name === 'Media') {
                        if (staff.name === 'Hamila Meili') return 1
                        else if (staff.name === 'Mahdieh Ebrahimpoor') return 2
                        else if (staff.name === 'Roya Ghavami') return 3
                        else if (staff.name === 'Sara Zahedi') return 4
                        else if (staff.name === 'Mohammad mehdi Barghi') return 5
                      } else if (team.name === 'Presentation Management') {
                        if (staff.name === 'Alireza Ziaei') return 1
                        else if (staff.name === 'Sajjad Rezvani') return 2
                        else if (staff.name === 'Vahid Zehtab') return 3
                        else if (staff.name === 'Amirhossein Asem Yousefi') return 4
                      }
                    }).map((staff) => (
                      <div key={staff.id} className="col-xs-12 col-sm-6 col-lg-3 mt-2 mb-4">
                        <PublicCard id={staff.id} isStaff='true'></PublicCard>
                      </div>
                    ))
                  }
                </div>
              }
              {isFetching && 
                <div className="row">
                  <div className="col mb-3">Loading...</div>
                </div>
              }
              {staff.length == 0 && !isFetching &&
                <div className="row">
                  <div className="col">Nothing has been added yet</div>
                </div>
              }
            </>
          ))}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { isFetching, staff, holding_teams } = state.WSS;
  return {
    holding_teams,
    isFetching,
    staff,
  };
};

export default connect(mapStateToProps, {
  getModelList,
})(Staff);
