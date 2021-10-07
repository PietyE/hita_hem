import CRUD from "../base";

class HomePageCRUD extends CRUD {}

export default function homePageCRUD(request) {
  return new HomePageCRUD({
    url: "/home-page",
    request,
  });
}
