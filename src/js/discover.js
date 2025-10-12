import utils from "./utils.js";
import {templates, select} from "./settings.js";

class Discover {
  constructor(data){
    this.data = data;

    this.getElements();
    this.render();
  }

  getElements() {
    this.dom = {};
    this.dom.playlist = document.querySelector('#discover');
  }

  render() {
    const generatedHTML = templates.playlist(this.data);

    this.element = utils.createDOMFromHTML(generatedHTML);
    this.dom.playlist = document.querySelector(select.containerOf.discoverList);
    this.dom.playlist.innerHTML = '';
    this.dom.playlist.appendChild(this.element);
  }

  reRender(data) {
    this.data = data;
    this.render();
  }
}

export default Discover;