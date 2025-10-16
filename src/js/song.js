import {templates} from "./settings.js";
import utils from "./utils.js";

class Song {
  constructor(song, discoverStore) {
    this.song = song;
    this.element = null;
    this.discoverStore = discoverStore;

    this.render();
  }

  render() {
    const generatedHTML = templates.playlist(this.song);

    this.element = utils.createDOMFromHTML(generatedHTML);

    setTimeout(() => {
      const audio = this.element.querySelector('.player-song');

      audio.addEventListener('play', () => {
        this.discoverStore.register(this.song)
      });
    });
  }
}

export default Song;
