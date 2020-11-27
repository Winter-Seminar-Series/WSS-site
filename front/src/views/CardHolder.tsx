import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Card from '../components/cards/Card'


function CardHolder({
  title = 'Talks',

}) {
  const { t } = useTranslation('cardHolder', { useSuspense: false });

  return (
    // <section id="ts-speakers" className="blue-gradient ts-speakers diagonal">
    <section id="CardHolder" >
      <div className='container'>
        <div className="row text-center">
          <h3 className="col mb-1 section-sub-title title-white">
            {title}
          </h3>
        </div>
        <div className="mt-3 text-white">
          <h5>For more information about each workshop, click on its image.</h5>
        </div>
        <div className="no-shadow">
          خیلی خری
        </div>
        <div className='row'>
          <div className='col col-xs-4 hashem' >
            salam
          </div>
          <div className='col col-xs-4' style={{ backgroundColor: 'blue' }}>
            salam
          </div>
          <Card />
        </div>
        <p className="text-center">
          <a href="#" className="btn btn-primary btn-white">
            Register Now
          </a>
        </p>

        <div className="card card-4"></div>

      </div>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.Account.isFetching,
})

export default connect(
  mapStateToProps,
  {
  }
)(CardHolder);
