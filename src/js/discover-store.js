class DiscoverStore {
  constructor(songs) {
    this.categories = {};
    this.songs = songs;
  }

  register(song) {
    for (const category of song.categories) {
      if (this.categories[category]) {
        this.categories[category] += 1;
      } else {
        this.categories[category] = 1;
      }
    }
  }

  getMaxCategory() {
    let max = 0;
    let maxCategory = '';

    for (const category in this.categories) {
      if (this.categories[category] > max) {
        max = this.categories[category];
        maxCategory = category;
      }
    }

    return maxCategory;
  }

  getSongs() {
    const category = this.getMaxCategory();

    if (category) {
      return this.songs.filter(song => {
        return song.categories.includes(category);
      });
    }

    return [];
  }
}

export default DiscoverStore;