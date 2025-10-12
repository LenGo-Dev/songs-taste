import {select, classNames, settings} from './settings.js';
import Song from './song.js';
import Discover from './discover.js';

const app = {


  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');
    console.log('111', idFromHash);
    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id === idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    console.log(pageMatchingHash);
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
    const len = thisApp?.data?.songs?.length ?? 0;

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

    if (pageId === 'discover') {
      // gen random id
      thisApp.discover.reRender(thisApp.data.songs[thisApp.getRandomId()])
    }

  },
  initList() {
    const thisApp = this;

    for (let songData of thisApp.data.songs) {
      thisApp.songs.push(new Song(songData));
    }

    thisApp.discover = new Discover(thisApp.data.songs[thisApp.getRandomId()]);

  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    thisApp.songs = [];

    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
        thisApp.data.songs = parsedResponse;
        thisApp.initList();
      });

    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  init: function () {

    const thisApp = this;

    thisApp.initData();
    thisApp.initPages();
  },

}


app.init();