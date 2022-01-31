import CRUD from "../base";

class CompaniesCRUD extends CRUD {
  getCompaniesList(params) {
    const url = `${this.url}/${params}`;
    return this.request({
      url,
      method: "GET",
    });
  }

  addFaqPost(payload) {
    const {data, token} = payload
    const url = "/companies-faq/";

    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
      data,
    });
  }

  getFaqPosts(id) {
    const url = `/companies-faq/?company_id=${id}`;

    return this.request({
      url,
      method: "GET",
    });
  }

  getCompanyBySlag(slag) {
    const url = `${this.url}/${slag}/`;

    return this.request({
      url,
    });
  }

  getCompanyByName(data) {
    const name = data.toLowerCase()
    const url = `${this.url}/?slug=${name}`;

    return this.request({
      url,
    });
  }

  makePayment(payload) {
    const url = "/payments/";
    const {data, token} = payload

    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
      data,
    });
  }
}

export default function companiesCRUD(request) {
  return new CompaniesCRUD({
    url: "/companies",
    request,
  });
}
