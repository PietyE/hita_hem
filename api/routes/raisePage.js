import CRUD from "../base";

class RaisePageCRUD extends CRUD {
  sendFormData(data) {
    const url = "/raise-form/";
    return this.request({
      url,
      data,
      method: "POST",
    });
  }
}

export default function raisePageCRUD(request) {
  return new RaisePageCRUD({
    url: "/raise-page/",
    request,
  });
}
