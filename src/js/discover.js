import utils from "./utils.js";
import {templates, select} from "./settings.js";
import Song from "./song.js";

class Discover {
  constructor(songs, discoverStore) {
    this.songs = songs;
    this.discoverStore = discoverStore;

    this.getElements();
  }

  getElements() {
    this.dom = {};
    this.dom.playlist = document.querySelector('#discover');
  }

  getRandomId(songs) {
    const len = songs.length;

    return Math.floor(Math.random() * len);
  }

  render() {
    this.dom.playlist = document.querySelector(select.containerOf.discoverList);
    this.dom.playlist.innerHTML = '';

    let filtered = this.discoverStore.getSongs();

    if (filtered.length === 0) {
      filtered = this.songs;
    }

    const song = filtered[this.getRandomId(filtered)];

    const songInst = new Song(song, this.discoverStore);
    this.dom.playlist.appendChild(songInst.element);

    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  }
}

export default Discover;