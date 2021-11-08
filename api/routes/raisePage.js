import CRUD from "../base";

class RaisePageCRUD extends CRUD {
  sendFormData(payload) {
    const {data, token} = payload
    const url = "/raise-form/";
    return this.request({
      url,
      data,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
    });
  }
}

export default function raisePageCRUD(request) {
  return new RaisePageCRUD({
    url: "/raise-page/",
    request,
  });
}
