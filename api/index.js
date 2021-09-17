import axios from "axios";

import aboutAsCRUD from "./routes/aboutUs";
import addEmailCRUD from "./routes/addEmail";
import companiesCRUD from "./routes/companies";
import authCRUD from "./routes/auth";
import homePageCRUD from "./routes/homePage";
import launchingSoonCRUD from "./routes/launchingSoon";
import raisePageCRUD from "./routes/raisePage";
import documentsCRUD from "./routes/documents";

const _baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

class Client {
  constructor(baseURL) {
    this.instanse = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json; charset=utf-8; ",
      },
    });

    this.instanse.interceptors.request.use((config) => {
      if (!this.token) {
        config.headers = {
          ...config.headers,
          "Accept-Language": this.language || "en",
        };
        return config;
      }
      config.headers = {
        ...config.headers,
        "Accept-Language": this.language || "en",
        Authorization: `Bearer ${this.token}`,
      };
      return config;
    });

    this.aboutAs = aboutAsCRUD(this.instanse);
    this.addEmail = addEmailCRUD(this.instanse);
    this.companies = companiesCRUD(this.instanse);
    this.auth = authCRUD(this.instanse);
    this.homePage = homePageCRUD(this.instanse);
    this.launchingSoon = launchingSoonCRUD(this.instanse);
    this.raisePage = raisePageCRUD(this.instanse);
    this.documents = documentsCRUD(this.instanse);
  }

  setToken(token) {
    this.token = token;
  }
  deleteToken() {
    delete this.token;
  }
  setLanguage(language) {
    this.language = language;
  }
}

const api = new Client(_baseURL);

export const { post } = api;

export default api;
