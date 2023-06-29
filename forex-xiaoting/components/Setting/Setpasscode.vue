<template>
  <div>
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Security"
      :title="$t('withdrawPassword')"
    />
    <v-container style="margin-top: 58px">
      <center>
        <h3 style="color: #fb8c00">{{ $t("warning") }}</h3>
        <h4 v-if="myinfo?.user?.passcode != null" style="color: #b00020">
          {{ $t("alreadySetPasscode") }}
        </h4>
      </center>
      <h5>&nbsp;&nbsp;&nbsp; {{ $t("warnPasscode") }}</h5>
      <br />
      <v-text-field
        v-model="passcode"
        v-if="isLogin && myinfo?.user?.passcode == null"
        label="Passcode"
        type="number"
        @keypress="$NumberFilterNoDot"
        :rules="[(v) => (v && v.length <= 6) || 'Passcode is 6 number']"
      ></v-text-field>
      <v-btn
        v-if="isLogin && myinfo?.user?.passcode == null"
        @click="onSetPasscode()"
        color="#19309F"
        dark
        style="position: absolute; bottom: 3%; left: 5%; right: 5%"
        >{{ $t("confirm") }}</v-btn
      >
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  middleware: "checkAuth",
  data() {
    return {
      passcode: "",
      myinfo: null,
    };
  },
  mounted() {
    this.checkLogin();
    this.getMyinfo().then((x) => {
      this.myinfo = x;
    });
  },
  computed: {
    ...mapGetters("authen", ["isLogin"]),
  },
  methods: {
    ...mapActions("authen", ["login", "checkLogin"]),
    ...mapActions("profile", ["getMyinfo"]),
    ...mapActions("setting", ["setPasscode"]),

    validator() {
      if (
        this.passcode === "" ||
        this.passcode === null ||
        String(this.passcode).length != 6
      ) {
        return true;
      }
      const regex = /[!@#$%^&*(),.?":{}|<>]/;
      if (regex.test(String(this.passcode))) {
        return true;
      }
      return false;
    },
    async onSetPasscode() {
      if (this.validator()) {
        this.$swal({
          toast: true,
          text: "Passcode is  6 number",
          iconColor: "red",
          icon: "error",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        return;
      }

      var res;

      try {
        res = await this.setPasscode({ passcode: this.passcode });

        this.$swal({
          toast: true,
          text: this.$t("complete"),
          icon: "success",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.$router.push("/Wallet");
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>
