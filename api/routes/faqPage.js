import CRUD from "../base";

class FaqCRUD extends CRUD {
    getCategoriesList() {
        const url = `${this.url}/`;
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
}




export default function faqCRUD(request) {
    return new FaqCRUD({
        url: "/faq-page",
        request,
    });
}