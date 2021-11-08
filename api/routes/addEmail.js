import CRUD from "../base";

class AddEmailCRUD extends CRUD {
  addEmail(payload) {
    const {email, token} = payload
    const data = {email: email}
    return this.request({
      method: "POST",
      url: `${this.url}/`,
      headers: {
        "x-recaptcha-token": token,
      },
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
