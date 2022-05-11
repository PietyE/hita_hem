import CRUD from "../base";

class FaqCRUD extends CRUD {
    getCategoriesList() {
        const url = '/faq-page-categories/';
        return this.request({
            url,
            method: "GET",
        });
    }

    faqSearch(params) {
        const url = `${this.url}/?search=${params}`;
        return this.request({
            url,
            method: "GET",
        });
    }

    getQuestion(params) {
        const url = `${this.url}/${params}`;
        return this.request({
            url,
            method: "GET",
        });
    }

    getByCategory(params) {
        const url = `${this.url}/?category_pk=${params}`;
        return this.request({
            url,
            method: "GET",
        });
    }

    getFaqPageSeo() {
        const url = '/faq-page-seo/';
        return this.request({
            url,
            method: "GET",
        });
    }

}




export default function faqCRUD(request) {
    return new FaqCRUD({
        url: "/faq-page",
        request,
    });
}