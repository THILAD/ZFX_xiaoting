<template>
  <v-app>
    <div>
      <WidgetsNavbar leftIcon="mdi-chevron-left" RouteTo="/Wallet" :title="$t('withdraw')" />
      <v-dialog max-width="300" v-model="dialog"><v-card><v-container>
            <h6>
              In the event that you happen to forget the passcode, please
              contact the administrator for assistance.
            </h6>
            <v-text-field label="Passcode" type="number" @keypress="$NumberFilterNoDot"
              :rules="[(v) => (v && v.length <= 6) || 'Passcode is 6 number']" v-model="passcode"></v-text-field>
            <v-btn @click="onRequestWithdraw()" :disabled="
              amount == '' ||
              amount <= 0 ||
              loading == true ||
              Number(amount) >= Number(balance)
            " :loading="loading" block color="#19039F" dark>{{ $t("confirm") }}</v-btn>
          </v-container></v-card></v-dialog>
      <v-container style="padding-right: 0; padding-bottom: 0; padding-top: 0">
        <v-row><v-col cols="6">
            <p style="margin: 19px 10px; font-weight: bold">
              {{ verifyInfo?.bankAccount?.bankType }}
            </p>
          </v-col>
          <v-col cols="6" style="display: flex; justify-content: end">
            <div class="text-center" style="margin-top: 19px; margin-right: 20px">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <p color="primary" dark v-bind="attrs" v-on="on">
                    <!-- <v-icon color="rgb(147 147 147)" size="25">mdi-web</v-icon> -->
                    <span><v-icon color="rgb(147 147 147)" size="20">{{
                      curIcon
                    }}</v-icon>{{ cur }} &#62;</span>
                  </p>
                </template>
                <v-list>
                  <v-list-item @click="changeCur('mdi-currency-usd', 'USD')">
                    <v-icon size="20">mdi-currency-usd</v-icon>
                    &nbsp;
                    <v-list-item-title>USD</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="changeCur('mdi-currency-thb', 'THB')">
                    <v-icon size="20">mdi-currency-thb</v-icon>
                    &nbsp;
                    <v-list-item-title>THB</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col></v-row>
      </v-container>
      <v-container>
        <v-text-field :label="$t('availablebalance')" disabled v-model="balance" suffix="USD"></v-text-field>
        <!-- <v-text-field :label="
          verifyInfo?.bankAccount?.bankType == 'CRYPTO'
            ? 'CRYPTO' + ' ' + $t('address')
            : $t('bankaccountnumber')
        " v-model="bankAccountNumber" disabled></v-text-field> -->
        <!-- <v-text-field v-if="verifyInfo?.bankAccount?.bankType != 'CRYPTO'" v-model="bankName" :label="$t('bankname')"
          disabled></v-text-field>
        <v-text-field v-if="verifyInfo?.bankAccount?.bankType != 'CRYPTO'" v-model="bankFirstName"
          :label="$t('bankacc') + ' ' + $t('firstname')" disabled></v-text-field> -->
        <!-- <v-text-field v-if="verifyInfo?.bankAccount?.bankType != 'CRYPTO'" v-model="bankLastName"
          :label="$t('bankacc') + ' ' + $t('surname')" disabled></v-text-field> -->
        <v-text-field :label="$t('amount')" @keypress="$NumberFilterNoDot" type="number" :prepend-inner-icon="curIcon"
          :suffix="cur" :rules="[
            (x) =>
              Number(x) <= Number(balance) ||
              'Amount must less than your balance',
          ]" autofocus v-model="amount"></v-text-field>
        <!-- <p style="color: #19309f">{{ $t("taxfee") }} 2.00%</p> -->
        <v-btn v-if="amount" block color="#19309F" dark @click="dialog = true">{{ $t("requestSent")
        }}</v-btn></v-container>
      <!-- <v-dialog v-model="dialog" style="width: fit-content">
        <v-card>
          <v-toolbar color="white">
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Withdraw</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container>
            <div>
              <v-text-field
                prefix="$"
                @keypress="$NumberFilter"
                type="number"
                v-model="amount"
                label="Amount"
              ></v-text-field>
            </div>
            <div style="text-align: center; margin-top: 10px">
              <div
                style="font-weight: bolder; display: flex; margin-bottom: 20px"
              >
                <span class="span firstOverlayLine"></span>
                &nbsp;&nbsp;Image
              </div>
              <label for="uploadImageW" class="label">
                <img
                  aspect-ratio="1"
                  :src="form.image ? form.image : '/images/image.png'"
                  alt=""
                  style="max-width: 200px; max-height: 200px; margin: 20px 0px"
                />
              </label>

              <br />
              <input
                type="file"
                id="uploadImageW"
                accept="image/*"
                @input="updateValue"
                ref="file"
                class="button-10"
                role="button"
                hidden
              />
            </div>
            <div class="my-10">
              <v-btn block color="#19309F" dark @click="onRequestWithdraw()"
                >Send Request</v-btn
              >
            </div>
          </v-container>
        </v-card>
      </v-dialog> -->
    </div>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  middleware: "checkAuth",
  data() {
    return {
      cur: "USD",
      curIcon: "mdi-currency-usd",
      dialog: false,
      isValid: true,
      amount: null,
      form: { image: undefined, input: undefined, imageFile: "" },
      imgName: "",
      balance: 0,
      verifyInfo: null,
      bankAccountNumber: "",
      bankName: "",
      bankFirstName: "",
      bankLastName: "",
      loading: false,
      passcode: "",
    };
  },
  computed: {
    ...mapGetters("wallet", ["isLoading"]),

    ...mapGetters("balance", ["BalanceInfo"]),
  },
  mounted() {
    this.onChecklogin();

    this.ongetMyVerify();
    this.getBalance();
  },
  methods: {
    ...mapActions("authen", ["checkLogin"]),
    ...mapActions("verify", ["getMyVerify"]),
    ...mapActions("balance", ["myBalance"]),

    ...mapActions("wallet", [
      "requestWithdraw",
      "upLoad",
      "getHistoryWithdraw",
    ]),
    async ongetMyVerify() {
      var res;
      try {
        res = await this.getMyVerify();
        this.verifyInfo = res.data.result;
        this.bankAccountNumber =
          res.data.result?.bankAccount?.bankAccountNumber;
        this.bankName = res.data.result?.bankAccount?.bankName;
        this.bankFirstName = res.data.result?.bankAccount?.bankFirstname;
        this.bankLastName = res.data.result?.bankAccount?.bankLastname;
      } catch (error) { }
    },
    async getBalance() {
      var res;
      try {
        res = await this.myBalance();

        this.balance = res.result.balance;
      } catch (error) { }
    },
    onOpenDialog() {
      this.dialog = true;
    },
    validation() {
      if (
        this.amount == undefined ||
        this.amount == null ||
        this.amount == ""
      ) {
        this.$swal({
          toast: true,
          text: "Please fill out amount",
          iconColor: "red",
          icon: "error",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.isValid = false;
      } else if (
        this.form.imageFile == undefined ||
        this.form.imageFile == null ||
        this.form.imageFile == ""
      ) {
        this.$swal({
          toast: true,
          text: "Please pick image",
          iconColor: "red",
          icon: "error",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    },
    clearData() {
      this.isValid = true;
      this.amount = null;
      this.form = { image: undefined, input: undefined, imageFile: "" };
    },
    changeCur(curIcon, cur) {
      this.curIcon = curIcon;
      this.cur = cur;
    },
    async onRequestWithdraw() {
      // this.validation();
      // if (this.isValid == false) {
      //   return;
      // }
      this.loading = true;
      var res;
      var data = {
        amount: this.amount,
        transferSlip: "some Image",
        passcode: this.passcode,
      };

      try {
        res = await this.requestWithdraw(data);

        if (res.status == 201) {
          this.$swal({
            toast: true,
            text: "Send Request Success",
            icon: "success",
            timer: 1800,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
          await this.getHistoryWithdraw();
          // this.$refs["myWithdrawRef"].fetch({
          //   page: 1,
          //   showType: "withdraw",
          // });
          // this.dialog = false;
          this.$router.back();

          this.clearData();
        } else {
          this.$swal({
            toast: true,
            text: "Fail",
            iconColor: "red",
            icon: "error",
            timer: 1800,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;

        this.$swal({
          toast: true,
          text: "Fail",
          iconColor: "red",
          icon: "error",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      }
    },

    async updateValue(event) {
      this.form.imageFile = event.target.files[0];
      this.form.image = this.form.imageFile
        ? URL.createObjectURL(this.form.imageFile)
        : undefined;
      this.$emit("input", this.form.imageFile);
      var res;
      var fd = new FormData();
      if (
        this.form.imageFile == undefined ||
        this.form.imageFile == null ||
        this.form.imageFile == ""
      ) {
        this.form.imageFile = "";
        fd.append("image", this.form.imageFile);
      } else {
        fd.append("image", this.form.imageFile, this.form.imageFile.name);
      }
      try {
        res = await this.upLoad(fd);
        this.imgName = res.data.file;

        if (res.status != 201) {
          this.$swal({
            toast: true,
            text: "Can't use this image",
            iconColor: "red",
            icon: "error",
            timer: 1800,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
      } catch (error) {
        this.$swal({
          toast: true,
          text: "Can't use this image",
          iconColor: "red",
          icon: "error",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      }
    },
    async onChecklogin() {
      try {
        var res = await this.checkLogin();
      } catch (error) { }
    },
  },
};
</script>
