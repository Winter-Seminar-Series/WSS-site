import React, { useState } from "react";
import { connect } from 'react-redux';
import { getRedirectURL } from "../redux/actions/participant";

function GoToButton({
  thisYear,
  type,
  id,
  getRedirectURL,
}) {
  const [loading, setLoading] = useState(false)

  async function redirectToClass() {
    setLoading(true)

    try {
      const { response } = await getRedirectURL(thisYear, type, id)

      if (response && response.redirect_url) {
        window.open(response.redirect_url, '_blank');
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      disabled={!!loading || !id || !type}
      onClick={redirectToClass}
      className="btn btn-primary btn-blue">
      Join
    </button>
  )
}

const mapStateToProps = (state, ownProps) => ({
  thisYear: state.WSS.thisYear,
})

export default connect(
  mapStateToProps,
  {
    getRedirectURL,
  }
)(GoToButton)
