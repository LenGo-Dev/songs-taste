export const select = {
  containerOf: {
    pages: '#pages',
    playlist: '#playlist',
    discoverList: '#discover-song',
  },
  nav: {
    links: '.nav a',
  },
  templateOf: {
    playlist: "#template-playlist-item",
  },
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
};