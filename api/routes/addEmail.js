import CRUD from '../base'

class AddEmailCRUD extends CRUD {
  addEmail(params) {
    return this.request({
      method: 'POST',
      url: `${this.url}/?${params}`,

    })
  }
}

export default function addEmailCRUD(request) {
  return new AddEmailCRUD({
    url: '/user-urls',
    request,
  })
}
