import CRUD from '../base'

class CompaniesCRUD extends CRUD {

  getCompaniesList(params) {
    const url = `${this.url}/${params}`
    return this.request({
      url,
      method: 'GET',
    })
  }

  addFaqPost(data) {
    const url = '/companies-faq/'

    return this.request({
      url,
      method: 'POST',
      data,
    })
  }

  getFaqPosts(id) {
    const url = `/companies-faq/?company_id=${id}`

    return this.request({
      url,
      method: 'GET',
    })
  }

  getCompanyById(id) {
    const url = `${this.url}/${id}/`

    return this.request({
      url,
    })
  }

  makePayment(data) {
    const url = '/payments/'

    return this.request({
      url,
      method: 'POST',
      data,
    })
  }
}

export default function companiesCRUD(request) {
  return new CompaniesCRUD({
    url: '/companies',
    request,
  })
}
