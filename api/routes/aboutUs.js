import CRUD from '../base'

class AboutUsCRUD extends CRUD {}

export default function aboutAsCRUD(request) {
  return new AboutUsCRUD({
    url: '/about-us/',
    request,
  })
}
