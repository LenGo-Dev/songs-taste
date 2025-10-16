import {select, classNames, settings} from './settings.js';
import Discover from './discover.js';
import Search from './search.js';
import Home from './home.js';
import DiscoverStore from "./discover-store.js";


const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id === idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of [...thisApp.navLinks]) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        /*get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },

  getRandomId() {
    const thisApp = this;
    let len = 0;

    if (thisApp.data && Array.isArray(thisApp.data.songs)) {
      len = thisApp.data.songs.length;
    }

    return Math.floor(Math.random() * len);
  },

  activatePage: function (pageId) {
    const thisApp = this;
    /* add class "active" to matching pages, remove from non-matching */
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /* add class "active" to matching links, remove from non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }

    if (pageId === 'home') {
      thisApp.home.render();
    } else if (pageId === 'discover') {
      thisApp.discover.render();
    } else if (pageId === 'search') {
      thisApp.search.render();
    }
  },

  initHome() {
    this.home = new Home(this.data.songs, this.discoverStore);
  },

  initDiscover() {
    this.discover = new Discover(this.data.songs, this.discoverStore);
  },

  initSearch() {
    this.search = new Search(this.data.songs, this.discoverStore);
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.data.songs = parsedResponse;
        thisApp.discoverStore = new DiscoverStore(thisApp.data.songs);

        thisApp.initHome();
        thisApp.initSearch();
        thisApp.initDiscover();

        thisApp.initPages();
      });
  },

  init: function () {
    this.initData();

    document.querySelectorAll("button").forEach(btn => {
      btn.textContent = btn.textContent.toUpperCase();
    });

    document.querySelectorAll('.page-title').forEach(title => {
      title.textContent = title.textContent.toUpperCase();
    });

    document.querySelectorAll('.page-subtitle h3').forEach(subtitle => {
      subtitle.textContent = subtitle.textContent.toUpperCase();
    });

    document.querySelectorAll('a').forEach(nav => {
      nav.textContent = nav.textContent.toUpperCase();
    });
    document.querySelectorAll('.section-title h2').forEach(sectionTitle => {
      sectionTitle.textContent = sectionTitle.textContent.toUpperCase();
    });
  },
}

app.init();