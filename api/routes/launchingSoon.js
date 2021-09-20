import CRUD from "../base";

class LaunchingSoonCRUD extends CRUD {
  getPosts() {
    return this.request({
      method: "GET",
      url: `${this.url}`,
    });
  }
}

export default function launchingSoonCRUD(request) {
  return new LaunchingSoonCRUD({
    url: "/blog/",
    request,
  });
}
