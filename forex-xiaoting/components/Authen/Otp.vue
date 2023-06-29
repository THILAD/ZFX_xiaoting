<template>
  <div style="background-color: white; height: 100vh">
    <v-container>
      <center>
        <v-img src="/email.jpeg" style="width: 200px; height: 200px"></v-img>
      </center>
      <center>
        <h2>OTP Verification</h2>

        <!-- <v-text-field
          v-model="email"
          dense
          solo
          :append-icon="editEmail ? 'mdi-check' : 'mdi-pencil'"
          @click:append="editEmail = !editEmail"
        ></v-text-field> -->
        <v-text-field v-model="email" dense solo v-if="editEmail" type="email"
          ><template v-slot:append>
            <v-icon color="#19309f" @click="resendOTP()">mdi-check</v-icon>
          </template></v-text-field
        >
        <h3 v-else>
          {{ email }}&nbsp;
          <v-icon
            v-if="countdown == 0"
            color="#19309F"
            @click="editEmail = true"
            >mdi-pencil</v-icon
          >
        </h3>
        <p>{{ $t("thankForRes") }}</p>
      </center>

      <v-otp-input
        v-model="opt"
        length="6"
        type="number"
        size="10"
      ></v-otp-input>
      <center>
        <p v-if="countdown > 0">{{ $t("ResendIn") }} {{ countdown }}s</p>
        <p v-else>
          OTP {{ $t("notReceived") }}
          <span style="color: #19309f" @click="resendOTP()">{{
            $t("RESEND")
          }}</span>
        </p>
      </center>

      <br />
      <v-btn
        block
        color="#19309F"
        @click="onVerifyOTP()"
        :loading="loading"
        :disabled="loading || opt.length != 6"
        :dark="!loading && opt.length == 6"
        >{{ $t("confirm") }}</v-btn
      >
    </v-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { encryptString, decryptString } from "../../plugins/encrypt";

export default {
  data() {
    return {
      userId: "",
      email: "",
      dialog: false,
      opt: "",
      loading: false,
      email: "",
      password: "",
      countdown: 60,
      editEmail: false,
    };
  },
  mounted() {
    this.email = this.$route.query.e;
    this.startCountdown();
  },
  methods: {
    ...mapActions("verify", ["verifyOTP"]),
    ...mapActions("authen", ["register", "login", "checkLogin"]),

    startCountdown() {
      const countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
    },
    async resendOTP() {
      this.editEmail = false;
      let res;
      this.countdown = 60;
      this.startCountdown();
      let data = {
        email: this.email,
        password: decryptString(this.$route.query.p),
        fullname: this.$route.query.f,
      };
      this.loading = true;
      try {
        res = await this.register(data);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async onVerifyOTP() {
      this.loading = true;
      var res;
      var data = { otp: this.opt, userId: this.$route.query.id };
      try {
        res = await this.verifyOTP(data);
        this.loading = false;
        this.$swal({
          toast: true,
          text: "Register Success",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        let datalogin = {
          email: this.email,
          password: decryptString(this.$route.query.p),
        };

        await this.login(datalogin);
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
        this.$router.push("/");
      } catch (error) {
        this.loading = false;
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
    },
  },
};
</script>
