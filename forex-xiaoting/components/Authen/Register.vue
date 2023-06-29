<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
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
              v-model="fullname"
              variant="underlined"
              :label="$t('fullname')"
              clear-icon="mdi-close-circle"
              clearable
              prepend-inner-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              v-model="username"
              :rule="[(v) => !v || 'Please input email']"
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
              :append-inner-icon="
                value ? 'mdi-map-marker' : 'mdi-map-marker-off'
              "
              @click:append="() => (value = !value)"
              clear-icon="mdi-close-circle"
              :rule="[
                (v) => !v || 'Please input password',
                (v) => (v && v.length >= 6) || 'At least 6 charater',
              ]"
              minlength="6"
              clearable
              :type="value ? 'password' : 'text'"
            ></v-text-field>
            <v-text-field
              v-model="conPassword"
              prepend-inner-icon="mdi-lock"
              :label="$t('confirm') + ' ' + $t('password')"
              :rule="[
                (v) => !v || 'Please input confirm password',
                (v) => (v && v.length >= 6) || 'At least 6 charater',
              ]"
              minlength="6"
              :append-icon="value1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              :append-inner-icon="
                value1 ? 'mdi-map-marker' : 'mdi-map-marker-off'
              "
              @click:append="() => (value1 = !value1)"
              clear-icon="mdi-close-circle"
              clearable
              :type="value1 ? 'password' : 'text'"
            ></v-text-field>
            <v-btn
              class="mt-5"
              width="100%"
              :dark="!loading"
              color="#19309f"
              @click="onRegister"
              :loading="loading"
              :disabled="loading"
              >{{ $t("signup") }}</v-btn
            >

            <!-- <v-btn class="mt-5" dark text color="primary">Forgot password?</v-btn> -->
          </v-container>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import secureStorage from "../../plugins/secure-storage";
import { encryptString, decryptString } from "../../plugins/encrypt";
export default {
  data() {
    return {
      loading: false,
      valid: false,
      dialog: false,
      value: true,
      value1: true,
      fullname: null,
      username: null,
      password: null,
      conPassword: null,
      userID: "",
    };
  },
  watch: {
    dialog(cur) {
      if (cur == false) {
        this.fullname = null;
        this.username = null;
        this.password = null;
        this.conPassword = null;
        if (secureStorage.getItem("email")) {
          secureStorage.removeItem("email");
        }
      }
      if (cur == true) {
        if (secureStorage.getItem("email")) {
          this.username = secureStorage.getItem("email");
        }
      }
    },
  },

  methods: {
    ...mapActions("authen", ["register", "checkLogin"]),
    validation() {
      if (
        !this.password ||
        !this.conPassword ||
        !this.fullname ||
        !this.username
      ) {
        this.$swal({
          toast: true,
          text: "Please fill out the empty field",
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.valid = false;
      } else if (this.fullname.length < 3) {
        this.$swal({
          toast: true,
          text: "Fullname is at least 3 character",
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.valid = false;
      } else if (this.password.length < 6 || this.conPassword.length < 6) {
        this.$swal({
          toast: true,
          text: "Password is at least 6 character",
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.valid = false;
      } else if (this.password !== this.conPassword) {
        this.$swal({
          toast: true,
          text: "The Password is not match",
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
    onRegister: async function () {
      this.validation();
      if (this.valid == false) {
        return;
      }
      this.loading = true;
      let response;
      let data = {
        email: this.username,
        password: this.password,
        fullname: this.fullname,
      };
      try {
        response = await this.register(data);
      
        this.loading = false;
        if (response.status == 200) {
          // this.$refs["OPTDialog"].fullname = this.fullname;
          // this.$refs["OPTDialog"].userId = response.data.userId;
          // this.$refs["OPTDialog"].email = this.username;
          // this.$refs["OPTDialog"].password = this.password;
          this.dialog = false;
          
          this.$router.push({
            path: "/",
            query: {
              f: this.fullname,
              p: encryptString(this.password),
              id: response.data.userId,
              e: this.username,
            },
          });
          this.email = null;
          this.password = null;
          await this.checkLogin();
        } else {
          this.$swal({
            toast: true,
            text: response.data.message,
            icon: "error",
            iconColor: "red",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
          return;
        }
      } catch (error) {
        this.loading = false;

        if (error.response) {
          this.$swal({
            toast: true,
            text: error.response.data.message,
            icon: "error",
            iconColor: "red",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
          return;
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
