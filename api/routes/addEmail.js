import CRUD from "../base";

class AddEmailCRUD extends CRUD {
  addEmail(data) {
    return this.request({
      method: "POST",
      url: `${this.url}/`,
      data,
    });
  }
}

export default function addEmailCRUD(request) {
  return new AddEmailCRUD({
    url: "/user-urls",
    request,
  });
}
