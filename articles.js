export class Article {
  constructor(id, title, body, date, author) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.author = author;
  }

  liked(boolean) {
    this.liked = boolean;
  }
}

export function createArticleList(arr = []) {
  return {
    list: arr,
    addItem: function (item) {
      this.list.push(item);
    },
  };
}
