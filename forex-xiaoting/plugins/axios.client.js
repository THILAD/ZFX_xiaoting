import secureStorage from "./secure-storage";
import { mapMutations } from "vuex";

export default function ({ $axios, store, redirect }) {
  $axios.onRequest((request) => {
    if (request.url.includes("polygon")) {
      return request;
    }
    let token = "";
    if (
      secureStorage.getItem("token") ||
      secureStorage.getItem("token") != undefined
    ) {
      token = secureStorage.getItem("token");
    }

    if (token != "") {
      request.headers.common["Authorization"] = `Bearer ${token}`;
    }
    // else {
    // request.headers['authorizations'] = `Bearer ${access_token}`
    // request.headers["secretid"] = process.env.secretid;
    //   request.headers['secretkey'] = "mysecretkey!1qaz2wsx"_app
    // }
    // $axios.onErrorCaptured(() => {
    //   if (code == 401) {
    //     redirect("/");
    //   }
    // });
    return request;
  });

  $axios.onError((error) => {
    // console.log(error.response.config.url.includes("/me"));
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      redirect("/");
      store.commit("authen/SET_LOGOUT");
      store.$swal({
        toast: true,
        text: "Please Login",
        icon: "error",
        iconColor: "red",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top-end",
      });
    }
  });
}
