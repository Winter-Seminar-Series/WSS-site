import React, {useState} from "react";
import { connect } from 'react-redux';
import {THIS_YEAR} from "../constants/info";
import { getRedirectURL } from "../redux/actions/participant";

function GoToButton({
  type,
  id,
  getRedirectURL,
}) {
  const [loading, setLoading] = useState(false)

  async function redirectToClass() {
    setLoading(true)

    try {
      const { response } = await getRedirectURL(THIS_YEAR, type, id)

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

export default connect(
  undefined,
  {
    getRedirectURL,
  }
)(GoToButton)
