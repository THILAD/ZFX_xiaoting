<template>
  <div>
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Profile"
      :title="$t('verify')"
    />

    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialog"
      persistent
    >
      <v-card>
        <v-toolbar color="#19309f" dark>{{ $t("requestSent") }}</v-toolbar>
        <v-card-text>
          <div class="text-h6">{{ $t("dialogverify") }}</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="routhBack()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-stepper v-model="step">
        <v-stepper-header style="justify-content: center">
          <v-stepper-step editable step="1" color="#19309f">
            <p class="my-auto mx-0">{{ $t("personalinfo") }}</p>
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step editable step="2" color="#19309f">
            <p class="my-auto">{{ $t("accinfo") }}</p>
          </v-stepper-step>
          <v-divider></v-divider>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="mb-10">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="email"
                      dense
                      :rules="[
                        (v) => !!v || 'Email is required',
                        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                      ]"
                      :label="$t('email')"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="name"
                      dense
                      :rules="[(v) => !!v || 'Name is required']"
                      :label="$t('firstname')"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="surname"
                      dense
                      :rules="[(v) => !!v || 'Surname is required']"
                      :label="$t('surname')"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="tel"
                      dense
                      @keypress="$NumberFilter"
                      :rules="[(v) => !!v || 'Tel is required']"
                      :label="$t('tel')"
                      required
                    ></v-text-field> </v-col></v-row
              ></v-container>
            </div>

            <v-btn @click="nextStep()" color="#19309f" dark>
              {{ $t("continue") }}
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <div class="mb-10">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <div style="text-align: center; margin-top: 10px">
                      <div
                        style="
                          font-weight: bolder;
                          display: flex;
                          margin-bottom: 20px;
                        "
                      >
                        <span class="span firstOverlayLine"></span>

                        <v-switch
                          :disabled="
                            status === 'pending'
                              ? true
                              : status === 'approved'
                              ? true
                              : false
                          "
                          v-model="imageType"
                          hide-details
                          inset
                          :label="
                            imageType == true
                              ? $t('passport')
                              : $t('identitynumber')
                          "
                        ></v-switch>
                      </div>
                      <label
                        :for="'uploadImage' + inputImageId"
                        class="label"
                        :disabled="
                          status === 'pending'
                            ? true
                            : status === 'approved'
                            ? true
                            : false
                        "
                      >
                        <img
                          aspect-ratio="1"
                          crossorigin="anonymous"
                          :src="
                            identityImg.image
                              ? identityImg.image
                              : '/images/image.png'
                          "
                          alt=""
                          style="
                            max-width: 130px;
                            max-height: 130px;
                            margin: 20px 0px;
                          "
                        />
                      </label>

                      <br />
                      <input
                        :disabled="
                          status === 'pending'
                            ? true
                            : status === 'approved'
                            ? true
                            : false
                        "
                        type="file"
                        :id="'uploadImage' + inputImageId"
                        accept="image/*"
                        @input="updateValueIdentity"
                        ref="file"
                        class="button-10"
                        role="button"
                        hidden
                      />
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="select"
                      dense
                      :items="bankTypes"
                      :rules="[(v) => !!v || 'Bank type is required']"
                      :label="$t('banktype')"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="bankAccountNumber"
                      dense
                      :rules="[(v) => !!v || 'Bank Account Number is required']"
                      :label="
                        select === 'BANK'
                          ? $t('bankaccountnumber')
                          : 'CRYPTO' + $t('address')
                      "
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" v-if="select === 'BANK'">
                    <v-text-field
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="bankName"
                      dense
                      :rules="[(v) => !!v || 'Bank Name is required']"
                      :label="$t('bankname')"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" v-if="select === 'BANK'">
                    <v-text-field
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="bankFirstName"
                      dense
                      :rules="[
                        (v) => !!v || 'Bank Account First Name is required',
                      ]"
                      :label="$t('bankacc') + ' ' + $t('firstname')"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" v-if="select === 'BANK'">
                    <v-text-field
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="bankLastName"
                      dense
                      :rules="[
                        (v) => !!v || 'Bank Account First Name is required',
                      ]"
                      :label="$t('bankacc') + ' ' + $t('surname')"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :disabled="
                        status === 'pending'
                          ? true
                          : status === 'approved'
                          ? true
                          : false
                      "
                      v-model="identityNum"
                      dense
                      :rules="[
                        (v) => !!v || 'Identification number is required',
                      ]"
                      :label="
                        imageType == true
                          ? $t('passport')
                          : $t('identitynumber')
                      "
                      @keypress="$NumberFilter"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div style="display: flex; justify-content: end">
              <v-btn text @click="backStep()"> {{ $t("back") }} </v-btn>
              <v-btn
                color="#19309f"
                @click="onVerify"
                style="color: white"
                :disabled="
                  identityImgPath == '' || status === 'pending'
                    ? true
                    : status === 'approved'
                    ? true
                    : false || loading
                "
                :loading="loading"
              >
                {{ $t("verify") }}
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      inputImageId: 0,
      message: "",
      loading: false,
      dialog: false,
      step: 1,
      imageType: false,
      valid: false,
      valid2: false,
      lazy: true,
      name: "",
      surname: "",
      email: "",
      tel: "",
      bankTypes: ["BANK", "CRYPTO"],
      select: "BANK",
      bankAccountNumber: "",
      bankName: "",
      bankFirstName: "",
      bankLastName: "",
      identityNum: "",
      identityImgPath: "",
      identityImg: { image: undefined, input: undefined, imageFile: "" },
      status: "",
    };
  },
  mounted() {
    this.status = this.$route.params.status;
    this.getVerify();
  },
  methods: {
    ...mapActions("verify", ["uploadVerify", "createVerify", "getMyVerify"]),
    async getVerify() {
      var res;
      try {
        res = await this.getMyVerify();
        if (res.status == 200 && res.data.result != null) {
          res.data.result.identityType == "PASSPORT"
            ? (this.imageType = true)
            : (this.imageType = false);
          this.name = res.data.result.firstname;
          this.surname = res.data.result.lastname;
          this.email = res.data.result.email;
          this.tel = res.data.result.phoneNumber;
          this.select = res.data.result.bankAccount.bankType;
          this.bankAccountNumber =
            res.data.result.bankAccount.bankAccountNumber;
          this.bankName = res.data.result.bankAccount.bankName;
          this.bankFirstName = res.data.result.bankAccount.bankFirstname;
          this.bankLastName = res.data.result.bankAccount.bankLastname;
          this.identityNum = res.data.result.identityCardNumber;
          this.identityImgPath = res.data.result.identityImage;
          this.identityImg.image =
            process.env.BASE_URL +
            "/image/identify/" +
            res.data.result.identityImage;
        }
      } catch (error) {}
    },
    getinputImageId() {
      const randomNumber = Math.floor(Math.random() * 900) + 100;
      this.inputImageId = randomNumber;
    },
    nextStep() {
      this.step = Number(this.step) + 1;
    },
    backStep() {
      this.step = Number(this.step) - 1;
    },
    async updateValueIdentity(event) {
      this.loading = true;
      this.identityImg.imageFile = event.target.files[0];

      this.$emit("input", this.identityImg.imageFile);
      var fd = new FormData();
      if (
        this.identityImg.imageFile == undefined ||
        this.identityImg.imageFile == null ||
        this.identityImg.imageFile == ""
      ) {
        this.identityImg.imageFile = "";
        fd.append("image", this.identityImg.imageFile);
      } else {
        fd.append(
          "image",
          this.identityImg.imageFile,
          this.identityImg.imageFile.name
        );
      }
      var res;
      try {
        res = await this.uploadVerify(fd);
        if (res.status == 201) {
          this.identityImgPath = res.data.file;
          this.loading = false;
          this.identityImg.image = this.identityImg.imageFile
            ? URL.createObjectURL(this.identityImg.imageFile)
            : undefined;
          this.getinputImageId();
        }
      } catch (error) {
        this.loading = false;
      }
    },
    routhBack() {
      this.dialog = false;
      this.$router.push("/Wallet");
    },

    async onVerify() {
      if (!this.$refs.form.validate()) {
        return;
      }
      var data = {
        email: this.email,
        lastname: this.surname,
        firstname: this.name,
        phoneNumber: this.tel,
        bankAccountNumber: this.bankAccountNumber,
        bankName: this.bankName,
        bankType: this.select, // CRYPTO || BANK
        bankFirstname: this.bankFirstName,
        bankLastname: this.bankLastName,
        identityImage: this.identityImgPath,
        identityType: this.imageType == true ? "PASSPORT" : "IDENTITYCARD", //PASSPORT || IDENTITYCARD
        identityCardNumber: this.identityNum,
      };
      var res;
      try {
        res = await this.createVerify(data);

        if (res.status == 201) {
          this.message = res?.data?.message;
          this.dialog = true;
        }
      } catch (error) {
        this.message = error?.response?.data?.message;
        this.dialog = true;
      }
    },
  },
};
</script>
<style>
@media only screen and (max-width: 959.98px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: block;
  }
  .v-stepper:not(.v-stepper--vertical) .v-stepper__step__step {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
