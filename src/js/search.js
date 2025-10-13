import utils from "./utils.js";
import {templates, select} from "./settings.js";

class Search {
  constructor(songs) {
    this.songs = songs;

    this.initPage();
  }

  initPage() {
    this.dom = {};
    this.dom.playlist = document.querySelector(select.containerOf.searchList);
    this.dom.form = document.querySelector(select.search.form);
    this.dom.input = document.querySelector(select.search.input);
    this.dom.summary = document.querySelector(select.search.summary);

    this.dom.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.render(this.dom.input.value);
    });
  }

  render(value) {
    this.dom.playlist.innerHTML = '';
    this.dom.summary.innerHTML = '';

    let filtered = [...this.songs];

    if (value) {
      filtered = this.songs.filter(song => {
        const v = value.toLowerCase();
        return song.title.toLowerCase().includes(v) || song.author.toLowerCase().includes(v);
      })
    }

    if (filtered.length === 0) {
      this.dom.summary.innerHTML = 'Nothing found';
    } else {
      this.dom.summary.innerHTML = `We have found ${filtered.length} songs`;
    }

    for (let song of filtered) {
      const generatedHTML = templates.playlist(song);
      const element = utils.createDOMFromHTML(generatedHTML);

      this.dom.playlist.appendChild(element);
    }
  }
}

export default Search;