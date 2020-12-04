import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Card({

}) {
  return (
    <section >
      <div className="col-xs-12 col-sm-6 col-lg-3">
        <div className="card-block">
          <h4 className="card-title">Small card</h4>
          <p>Change around the content for awsomenes</p>
        </div>
      </div>
    </section>


    // <div className="card float-left">
    //   <section className="row">
    //     <div className="col-sm-7">
    //       <div className="card-block">
    //         <h4 className="card-title">Small card</h4>
    //         <p>Wetgple text to build your own card.</p>
    //         <p>Change around the content for awsomenes</p>
    //         <a href="#" className="btn btn-primary btn-sm">Read More</a>
    //       </div>
    //     </div>

    //     <div className="col-sm-5">
    //       <img className="d-block w-100" src="https://picsum.photos/150?image=380" alt="" />
    //     </div>
    //   </section>
    // </div>
  )
}

export default Card;