import CRUD from "../base";

class NewsCRUD extends CRUD {
    getSeo() {
        return this.request({
            method: "GET",
            url: `${this.url}`,
        });
    }
}

export default function newsCRUD(request) {
    return new NewsCRUD({
        url: "/news-page-seo/",
        request,
    });
}
