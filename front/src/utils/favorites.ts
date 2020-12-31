let favorites = {}

readFavorites()

export function readFavorites() {
  const favs = localStorage.getItem('favorites')

  if (favs) {
    try {
      favorites = JSON.parse(favs)
    } catch (e) {
      favorites = {}
      writeFavorites()
    }
  }
}

export function writeFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

export function setFavorite(year, type, id, val) {
  if (favorites[year]) {
    if (favorites[year][type]) {
      favorites[year][type][id] = val
    } else {
      favorites[year][type] = {
        [id]: val
      }
    }
  } else {
    favorites[year] = {
      [type]: {
        [id]: val
      }
    }
  }

  writeFavorites()
}

export function isFavorite(year, type, id) {
  return favorites[year]?.[type]?.[id]
}
