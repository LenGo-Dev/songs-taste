export const select = {
  containerOf: {
    pages: '#pages',
    playlist: '#playlist',
    discoverList: '#discover-song',
    searchList: '#search-song',
    categoryList: '#categories',
    categorySearchContainer: "#search-category-container",
  },
  nav: {
    links: '.nav a',
  },
  templateOf: {
    playlist: "#template-playlist-item",
    categoryList: '#template-category-item',
    categorySearch: "#template-category-select",
  },
  search: {
    button: '#search-button',
    input: '#search-input',
    summary: '#search-summary',
    select: '#category-select',
    form: '#search-form',
  }
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  }
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
  },
}

export const templates = {
  playlist: Handlebars.compile(document.querySelector(select.templateOf.playlist).innerHTML),
  categoryList: Handlebars.compile(document.querySelector(select.templateOf.categoryList).innerHTML),
  categorySearch: Handlebars.compile(document.querySelector(select.templateOf.categorySearch).innerHTML),
};