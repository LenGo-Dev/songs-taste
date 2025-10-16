/* global GreenAudioPlayer */
import utils from "./utils.js";
import {templates, select} from "./settings.js";
import Song from "./song.js";
// import GreenAudioPlayer from "browser-sync";

class Search {
  constructor(songs, discoverStore) {
    this.songs = songs;
    this.discoverStore = discoverStore;

    const uniqCategories = new Set();

    for (const song of songs) {
      for (const category of song.categories) {
        uniqCategories.add(category);
      }
    }

    this.categories = [...uniqCategories];
    this.selectedCategory = '';
    this.searchValue = '';

    this.initPage();
  }

  initPage() {
    this.dom = {};
    this.dom.songs = [];
    this.dom.playlist = document.querySelector(select.containerOf.searchList);
    this.dom.form = document.querySelector(select.search.form);
    this.dom.input = document.querySelector(select.search.input);
    this.dom.summary = document.querySelector(select.search.summary);
    this.dom.categorySearchContainer = document.querySelector(select.containerOf.categorySearchContainer);

    this.dom.input.addEventListener("keypress", () => {
      this.searchValue = this.dom.input.value;
    });

    this.dom.input.addEventListener("change", () => {
      this.searchValue = this.dom.input.value;
    });

    this.dom.categorySearchContainer.addEventListener("change", (e) => {
      this.selectedCategory = e.target.value;
    });

    this.dom.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.renderSongs();
    });
  }

  renderCategories() {
    this.dom.categorySearchContainer.innerHTML = '';
    const generatedHTML = templates.categorySearch({categories: this.categories});

    const element = utils.createDOMFromHTML(generatedHTML);
    this.dom.categorySearchContainer = document.querySelector(select.containerOf.categorySearchContainer);
    this.dom.categorySearchContainer.appendChild(element);
  }

  renderSongs() {
    this.dom.songs = [];
    this.dom.playlist.innerHTML = '';
    this.dom.summary.innerHTML = '';

    let filtered = this.songs;

    if (this.selectedCategory || this.searchValue) {
      filtered = this.songs.filter((song) => {
        if (this.selectedCategory && this.searchValue) {
          const v = this.searchValue.toLowerCase();
          return song.categories.includes(this.selectedCategory) &&
            (song.title.toLowerCase().includes(v) || song.author.toLowerCase().includes(v));
        } else if (this.selectedCategory) {
          return song.categories.includes(this.selectedCategory);
        } else if (this.searchValue) {
          const v = this.searchValue.toLowerCase();
          return song.title.toLowerCase().includes(v) || song.author.toLowerCase().includes(v);
        } else {
          return false
        }
      });
    }

    if (filtered.length === 0) {
      this.dom.summary.innerHTML = 'Nothing found';
    } else {
      this.dom.summary.innerHTML = `We have found ${filtered.length} songs`;
    }

    for (let song of filtered) {
      const songInst = new Song(song, this.discoverStore);
      this.dom.playlist.appendChild(songInst.element);
    }

    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  }

  render() {
    this.renderSongs();
    this.renderCategories();
  }

}

export default Search;