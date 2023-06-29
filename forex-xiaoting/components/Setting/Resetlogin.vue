<template>
  <div style="margin-top: 57px">
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Security"
      :title="$t('resetPasswordLogin')"
    />
    <div>
      <v-container>
        <v-text-field
          v-model="curPass"
          :label="$t('currentPassword')"
          :append-icon="hideCur ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          :append-inner-icon="hideCur ? 'mdi-map-marker' : 'mdi-map-marker-off'"
          @click:append="() => (hideCur = !hideCur)"
          clear-icon="mdi-close-circle"
          clearable
          :rules="[(v) => !!v || 'Please fill out current password']"
          :type="hideCur ? 'password' : 'text'"
        ></v-text-field>
        <br />
        <v-text-field
          v-model="newPass"
          :label="$t('newPassword')"
          :append-icon="hideNewPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          :append-inner-icon="
            hideNewPass ? 'mdi-map-marker' : 'mdi-map-marker-off'
          "
          :rules="[
            (v) => !!v || 'Please fill out new password',
            () =>
              newPass === conPass || 'New password must match confirm password',
          ]"
          @click:append="() => (hideNewPass = !hideNewPass)"
          clear-icon="mdi-close-circle"
          clearable
          :type="hideNewPass ? 'password' : 'text'"
        ></v-text-field>
        <v-text-field
          v-model="conPass"
          :label="$t('confirm') + $t('newPassword')"
          :append-icon="hideConPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          :append-inner-icon="
            hideConPass ? 'mdi-map-marker' : 'mdi-map-marker-off'
          "
          :rules="[
            (v) => !!v || 'Please type new password again',
            () =>
              newPass === conPass || 'New password must match confirm password',
          ]"
          @click:append="() => (hideConPass = !hideConPass)"
          clear-icon="mdi-close-circle"
          clearable
          :type="hideConPass ? 'password' : 'text'"
        ></v-text-field>
        <v-btn
          @click="onResetPassword()"
          :loading="loading"
          :disabled="
            newPass !== conPass || !conPass || !newPass || !curPass || loading
          "
          block
          color="#19309f"
          :dark="
            newPass === conPass ||
            !!conPass ||
            !!newPass ||
            !!curPass ||
            !loading
          "
          >{{ $t("resetPassword") }}</v-btn
        >
      </v-container>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  middleware: "checkAuth",
  data() {
    return {
      loading: false,
      curPass: "",
      hideCur: true,
      newPass: "",
      hideNewPass: true,
      conPass: "",
      hideConPass: true,
    };
  },
  methods: {
    ...mapActions("authen", ["resetPasswordLogin"]),
    async onResetPassword() {
      this.loading = true;
      var res;
      var data = {
        currentPassword: this.curPass,
        newPassword: this.newPass,
      };
      try {
        res = await this.resetPasswordLogin(data);
        this.$swal({
          toast: true,
          text: "Reset Password Success",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });

        this.loading = false;
        this.$router.back();
      } catch (error) {
        this.$swal({
          toast: true,
          text: error?.response?.data?.message || "Something went wrong",
          icon: "error",
          iconColor: "red",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.loading = false;
      }
    },
  },
};
</script>
