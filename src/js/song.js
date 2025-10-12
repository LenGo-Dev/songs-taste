import utils from "./utils.js";
import {templates, select} from "./settings.js";

class Song {
  constructor(data){
    this.data = data;

    this.getElements();
    this.render();
  }

  getElements() {
    this.dom = {};
    this.dom.playlist = document.querySelector('#playlist');
  }

  render() {
    const generatedHTML = templates.playlist(this.data);

    this.element = utils.createDOMFromHTML(generatedHTML);
    this.dom.playlist = document.querySelector(select.containerOf.playlist);
    this.dom.playlist.appendChild(this.element);
  }
}

export default Song;