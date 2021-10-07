import CRUD from "../base";

class DocumentsCRUD extends CRUD {
  getDocuments() {
    const url = `${this.url}/`;
    return this.request({
      url,
      method: "GET",
    });
  }
}

export default function documentsCRUD(request) {
  return new DocumentsCRUD({
    url: "/accumeo-documents",
    request,
  });
}
