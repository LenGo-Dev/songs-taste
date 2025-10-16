import utils from "./utils.js";
import {templates, select} from "./settings.js";
import Song from "./song.js";

class Home {
  constructor(songs, discoverStore) {
    this.songs = songs;
    this.discoverStore = discoverStore;

    const uniqCategories = new Set();

    for (const song of songs) {
      for (const category of song.categories) {
        uniqCategories.add(category);
      }
    }

    this.categories = [ ...uniqCategories ];
    this.selectedCategory = '';

    this.initPage();
  }

  initPage() {
    this.dom = {};
    this.dom.songs = [];
    this.dom.playlist = document.querySelector(select.containerOf.playlist);
    this.dom.categoryList = document.querySelector(select.containerOf.categoryList);

    this.dom.categoryList.addEventListener("click", (e) => {
      e.preventDefault();

      const categoryElements = document.querySelectorAll('.categories-list-item');

      for (const categoryElement of categoryElements) {
        categoryElement.classList.remove('selected');
      }

      const selectedCategory = e.target.dataset.category || '';

      if (this.selectedCategory) {
        if (this.selectedCategory === selectedCategory) {
          this.selectedCategory = '';
        } else {
          this.selectedCategory = selectedCategory;
          e.target.classList.add('selected');
        }
      } else {
        this.selectedCategory = selectedCategory;
        e.target.classList.add('selected');
      }

      this.renderSongs();
    });
  }

  renderCategories() {
    this.dom.categoryList.innerHTML = '';

    const generatedHTML = templates.categoryList({categories: this.categories});
    const element = utils.createDOMFromHTML(generatedHTML);

    this.dom.categoryList.appendChild(element);
  }

  renderSongs() {
    this.dom.songs = [];
    this.dom.playlist.innerHTML = '';

    let filtered = this.songs;

    if (this.selectedCategory) {
      filtered = this.songs.filter((song) => {
        return song.categories.includes(this.selectedCategory);
      });
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

export default Home;