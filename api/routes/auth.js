import CRUD from "../base";

class AuthCRUD extends CRUD {
  signUp(payload) {
    const {data, token} = payload
    const url = `${this.url}/`;
    return this.request({
      url,
      data,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
    });
  }

  signIn(payload) {
    const {data, token, session_key} = payload
    const url = `${this.url}/login/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
        "x-session-key": session_key,
      },
      data,
    });
  }

  signInWithGoogle(payload) {
    const {token, session_key} = payload
    const data = payload?.is_agree ? {token: token, is_agree: payload?.is_agree} : {token: token}
    const url = `${this.url}/sign_in_google/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-session-key": session_key,
      },
      data,
    });
  }

  logOut(payload) {
    const {data, token} = payload
    const url = `${this.url}/auth/logout/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
    });
  }

  resetPassword(payload) {
    const {data, token} = payload
    const url = `${this.url}/reset_password/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
      data,
    });
  }

  changePassword(payload) {
    const {data, token} = payload
    const url = `${this.url}/change_password/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
      data,
    });
  }
  changeEmail(payload) {
    const {data, token} = payload
    const url = `${this.url}/change_email/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
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

  getSelf() {
    const url = `${this.url}/self/`;
    return this.request({
      url,
      method: "GET",
    });
  }



  createProfile(payload) {
    const {data, token} = payload
    const url = "/profile/";
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
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

  changeProfile(payload) {
    const {data, token} = payload
    const url = "/profile/patch/";
    return this.request({
      url,
      method: "PATCH",
      headers: {
        "x-recaptcha-token": token,
      },
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

  requestForChangingPassword(payload) {
    const {data, token} = payload
    const url = `${this.url}/send_notification_change_password/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
    });
  }

  requestForResetPassword(payload) {
    const {data, token} = payload
    const url = `${this.url}/send_notification_reset_password/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
      data,
    });
  }

  requestForChangingEmail(payload) {
    const {data, token} = payload
    const url = `${this.url}/send_notification_change_email/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
    });
  }

  requestForTokenVerification(params) {
    const url = `/tokens/${params}/`;
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

  checkQuizAnswers(data) {
    const url = `${this.url}/quiz/`;
    return this.request({
      url,
      method: "POST",
      data,
    });
  }

    requestForPasswordResetTokenVerification(params) {
        const url = `/tokens/${params?.key}/`;
        return this.request({
            url,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${params?.key}`,
            },
        });
    }

  requestActivationTokenVerification(data) {
    const url = `${this.url}/activation/`;
    return this.request({
      url,
      method: "POST",
      data
    });
  }

  checkEmailAndPassword(payload) {
    const {data, token} = payload
    const url = `${this.url}/verification_for_registration/`;
    return this.request({
      url,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
      data
    });
  }


  requestLoginWithBankId(params) {
    const url = `${this.url}/get_redirect_url_bank_id/${params}`;
    // const url = `${this.url}/get_redirect_url_bank_id/`;

    return this.request({
      url,
      method: "GET",
    });
  }

  loginWithBankId(payload) {
    const {grand_id_session, session_key} = payload
    const data = payload?.email?{
      email: payload?.email,
      is_agree: payload?.is_agree,
      grand_id_session: grand_id_session,
    }:{grand_id_session: grand_id_session}
    const url = `${this.url}/sign_in_bank_id/`;
    return this.request({
      url,
      data,
      method: "POST",
      headers: {
        "x-session-key": session_key,
      },
    });
  }

  requestSubscribeList() {
    const url = '/subscribe/groups/';
    return this.request({
      url,
      method: "GET",
    });
  }

  unsubscribe(payload) {
    const {data, token} = payload

    const url = `${this.url}/update_user_unsubscribes/`;
    return this.request({
      url,
      data,
      method: "POST",
      headers: {
        "x-recaptcha-token": token,
      },
    });
  }

}

export default function authCRUD(request) {
  return new AuthCRUD({
    url: "/user",
    request,
  });
}
