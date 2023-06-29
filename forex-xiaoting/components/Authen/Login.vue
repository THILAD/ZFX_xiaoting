<template>
  <div>
    <v-dialog v-model="alertVerDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          {{ $t("pleaseVerify") }}
        </v-card-title>

        <v-card-text v-html="$t('alertLoginVerify')"> </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onGoRegisterAgain()">
            {{ $t("signup") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isLoading" :scrim="false" persistent max-width="400">
      <v-card color="#19309F" dark class="py-3">
        <v-card-text>
          {{ $t("pleasewait") }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar elevation="0">
          <v-btn icon dark @click="dialog = false">
            <v-icon color="grey">mdi-close</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
          <!-- <v-btn plain color="#1976D2"><b>Sign up</b></v-btn> -->
        </v-toolbar>
        <v-container class="my-10" style="max-width: 90%">
          <h2>{{ $t("welcome") }}</h2>
          <v-img
            class="mx-auto my-2"
            src="/logo.jpeg"
            width="80"
            height="80"
          ></v-img>
          <v-text-field
            v-model="email"
            variant="underlined"
            :label="$t('username')"
            clear-icon="mdi-close-circle"
            clearable
            prepend-inner-icon="mdi-email-multiple-outline"
          ></v-text-field>
          <v-text-field
            v-model="password"
            prepend-inner-icon="mdi-lock"
            :label="$t('password')"
            :append-icon="value ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :append-inner-icon="value ? 'mdi-map-marker' : 'mdi-map-marker-off'"
            @click:append="() => (value = !value)"
            clear-icon="mdi-close-circle"
            clearable
            :type="value ? 'password' : 'text'"
          ></v-text-field>
          <center>
            {{ $t("noAcc") }}
            <span style="color: #19309f" @click="noAcc()">{{
              $t("signup")
            }}</span>
          </center>
          <br />

          <v-btn
            class="mt-5"
            width="100%"
            dark
            color="#19309f"
            @click="onLogin"
            >{{ $t("login") }}</v-btn
          >

          <!-- <v-btn class="mt-5" dark text color="primary">Forgot password?</v-btn> -->
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import secureStorage from "../../plugins/secure-storage";
export default {
  data() {
    return {
      isLoading: false,
      dialog: false,
      value: true,
      email: null,
      password: null,
      alertVerDialog: false,
    };
  },
  watch: {
    dialog(cur) {
      if (cur == false) {
        this.email = null;
        this.password = null;
      }
    },
  },
  methods: {
    ...mapActions("authen", ["login", "checkLogin"]),
    onGoRegisterAgain() {
      secureStorage.setItem("email", this.email);
      this.alertVerDialog = false;
      this.$emit("openRegister");
      this.dialog = false;
    },
    noAcc() {
      this.$emit("openRegister");
      this.dialog = false;
    },
    onLogin: async function () {
      this.isLoading = true;
      let response;
      let data = {
        email: this.email,
        password: this.password,
      };
      try {
        response = await this.login(data);
        if (response.status == 200) {
          this.email = null;
          this.password = null;
          this.dialog = false;
          this.$swal({
            toast: true,
            text: "Login",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
          await this.checkLogin();
        } else {
          this.$swal({
            toast: true,
            text: "Something went wrong",
            icon: "error",
            iconColor: "red",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        if (error.response.data.message === "Please verify your email!") {
          this.alertVerDialog = true;
        } else {
          this.$swal({
            toast: true,
            text: error.response.data.message || "Something went wrong",
            icon: "error",
            iconColor: "red",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
      }
    },
  },
};
</script>
<style scoped>
.v-btn {
  text-transform: none;
  padding: 0 !important;
}
</style>
