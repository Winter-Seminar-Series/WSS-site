import React, { useEffect, useState } from 'react';

import { isFavorite, setFavorite } from '../utils/favorites';

function FavoriteButton({ series, type, id }) {
  const [isFav, setFav] = useState(isFavorite(series, type, id));

  function changeFav(val) {
    setFavorite(series, type, id, val);
    setFav(val);
  }

  return isFav ? (
    <button
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Remove from favorites"
      className="btn btn-warning rounded-circle px-0"
      style={{ width: '38px', height: '38px' }}
      onClick={() => changeFav(false)}>
      <i className="fa fa-star text-center" style={{ width: '100%' }} />
    </button>
  ) : (
    <button
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Add to favorites"
      className="btn btn-outline-warning rounded-circle px-0"
      style={{ width: '38px', height: '38px' }}
      onClick={() => changeFav(true)}>
      <i className="fa fa-star-o text-center" style={{ width: '100%' }} />
    </button>
  );
}

export default FavoriteButton;
