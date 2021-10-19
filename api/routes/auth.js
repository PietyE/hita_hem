import CRUD from "../base";

class AuthCRUD extends CRUD {
  signUp(data) {
    const url = `${this.url}/`;
    return this.request({
      url,
      data,
      method: "POST",
    });
  }

  signIn(data) {
    const url = `${this.url}/login/`;
    return this.request({
      url,
      method: "POST",
      data,
    });
  }

  logOut() {
    const url = `${this.url}/auth/logout/`;
    return this.request({
      url,
      method: "POST",
    });
  }

  resetPassword(data) {
    const url = `${this.url}/reset_password/`;
    return this.request({
      url,
      method: "POST",
      data,
    });
  }

  changePassword(data) {
    const url = `${this.url}/change_password/`;
    return this.request({
      url,
      method: "POST",
      data,
    });
  }
  changeEmail(data) {
    const url = `${this.url}/change_email/`;
    return this.request({
      url,
      method: "POST",
      data,
    });
  }

  getUser(id) {
    const url = `${this.url}/${id}/`;
    return this.request({
      url,
      method: "GET",
    });
  }

  createProfile(data) {
    const url = "/profile/";
    return this.request({
      url,
      method: "POST",
      data,
    });
  }
  changeAvatar(data) {
    const url = "/profile/image/";
    return this.request({
      url,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      data,
    });
  }

  deleteAvatar() {
    const url = "/profile/image/";
    return this.request({
      url,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data;",
      },
       data: null,
    });
  }

  changeProfile(data) {
    const url = "/profile/patch/";
    return this.request({
      url,
      method: "PATCH",
      data,
    });
  }

  deleteUser(params) {
    const url = `${this.url}/${params}/`;
    return this.request({
      url,
      method: "DELETE",
    });
  }

  requestForChangingPassword() {
    const url = `${this.url}/send_notification_change_password/`;
    return this.request({
      url,
      method: "POST",
    });
  }

  requestForChangingEmail() {
    const url = `${this.url}/send_notification_change_email/`;
    return this.request({
      url,
      method: "POST",
    });
  }

  requestForCheckingToken(params) {
    const url = `/tokens/${params}`;
    return this.request({
      url,
      method: "DELETE",
    });
  }


  requestForQuiz() {
    const url = '/quiz/questions/';
    return this.request({
      url,
      method: "GET",
    });
  }



}

export default function authCRUD(request) {
  return new AuthCRUD({
    url: "/user",
    request,
  });
}
