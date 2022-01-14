let favorites = {};

readFavorites();

export function readFavorites() {
  const favs = localStorage.getItem('favorites');

  if (favs) {
    try {
      favorites = JSON.parse(favs);
    } catch (e) {
      favorites = {};
      writeFavorites();
    }
  }
}

export function writeFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function setFavorite(series: string, type, id, val) {
  if (favorites[series]) {
    if (favorites[series][type]) {
      favorites[series][type][id] = val;
    } else {
      favorites[series][type] = {
        [id]: val,
      };
    }
  } else {
    favorites[series] = {
      [type]: {
        [id]: val,
      },
    };
  }

  writeFavorites();
}

export function isFavorite(series: string, type, id) {
  return favorites[series]?.[type]?.[id];
}
