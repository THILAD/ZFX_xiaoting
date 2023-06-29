import secureStorage from "../plugins/secure-storage";
export default ({ $auth, isHMR, app, store, route, error, redirect }) => {
  try {
    if (
      !secureStorage.getItem("token") ||
      secureStorage == null ||
      secureStorage.getItem("token") == undefined
    ) {
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);
      redirect("/");
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
  } catch (err) {
    
  }
};
