import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  register
} from '../redux/actions/account'

function Register({ register }: any) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [university, setUniversity] = useState('');

  return (
    <>
      <section id="main-container" className="main-container pb-0">
        <div style={{ marginTop: "-15rem", height: "15rem" }} className="px-5 diagonal background-shafagh">
          <div className="container section-sub-title title-white" style={{ paddingTop: "9rem" }}>
            Registration
          </div>
        </div>
        <div className="container-fluid px-5 pt-3 mt-5 mb-0 diagonal" style={{ background: "white" }}>
          <div className="container pt-5">
            {/* {% if error %} */}
            <div className="alert alert-danger">
              <strong style={{ whiteSpace: "pre-wrap" }}>
                {/* {{ error }} */}
              </strong>
            </div>
            {/* {% if wss.is_registration_open %} */}
            <form
              onSubmit={(firstName, lastName, email, university) => }>
              {/* {% csrf_token %} */}
              <div className="row">
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.name | as_crispy_field }} */}
                </div>
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.family | as_crispy_field }} */}
                </div>

                <div className="col-md-6 pr-md-5">
                  {/* {{ form.name_english | as_crispy_field }} */}
                </div>
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.family_english | as_crispy_field }} */}
                </div>
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.age | as_crispy_field }} */}
                </div>
                <div className="col-md-6 pr-md-5 d-flex align-items-center">
                  {/* {{ form.gender | as_crispy_field }} */}
                </div>
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.national_id | as_crispy_field }} */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.phone_number | as_crispy_field }} */}
                </div>
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.email | as_crispy_field }} */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.country | as_crispy_field }} */}
                </div>
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.city | as_crispy_field }} */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.university | as_crispy_field }} */}
                </div>
                <div className="col-md-6 pr-md-5">
                  {/* {{ form.grade | as_crispy_field }} */}
                </div>

                <div className="col-md-6 pr-md-5">
                  {/* {{ form.job | as_crispy_field }} */}
                </div>
                <div className="col-md-6 pr-md-5 d-flex align-items-center">
                  {/* {{ form.is_student | as_crispy_field }} */}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-6 pr-md-5 d-flex w-100">
                  {/* {{ form.introduction_method | as_crispy_field }} */}
                </div>
                <div className="col-12">
                  {/* {{ form.interests | as_crispy_field }} */}
                </div>
                <div className="col-md-6 ">
                  {/* {{ form.question | as_crispy_field }} */}
                </div>
                <div className="col-md-6 d-flex align-items-center  ">
                  {/* {{ form.question_other | as_crispy_field }} */}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  {/* {{ form.participate_in_wss | as_crispy_field }} */}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {/* {{ form.workshops | as_crispy_field }} */}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="g-recaptcha" data-sitekey="6Lcj-8cUAAAAADvuAPAzAOHUUplDwqmKMUb9RzAN" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ background: "#007bff" }}>
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {

}

export default connect(
  mapStateToProps,
  {
    register,
  }
)(Register);
