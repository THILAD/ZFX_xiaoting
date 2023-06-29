<template>
  <div>
    <div>
      <!-- <WidgetsNavbar
        RouteTo="back"
        title="Deposit"
        leftIcon="mdi-chevron-left"
        rightIcon="mdi-beaker-plus-outline"
        :onClickRightIcon="onOpenDialog"
      />
      <div>
        <BalanceMyrequest
          title="My Deposit Request"
          showType="deposit"
          ref="myDepositRef"
        />
      </div> -->
      <v-dialog v-model="dialog" style="width: fit-content">
        <v-card>
          <v-toolbar color="white">
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Deposit</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container>
            <div>
              <v-text-field
                prefix="$"
                type="number"
                @keypress="$NumberFilter"
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

              <label for="uploadImageD" class="label">
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
                id="uploadImageD"
                accept="image/*"
                @input="updateValue"
                ref="file"
                class="button-10"
                role="button"
                hidden
              />
            </div>
            <div class="my-10">
              <v-btn block color="#19309F" dark @click="onRequestDeposit()"
                >Send Request</v-btn
              >
            </div>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- <BalanceDialogdeposit ref="myDialogDeposit" /> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isValid: true,
      amount: null,
      dialog: false,
      form: { image: undefined, input: undefined, imageFile: "" },
      imgName: "",
    };
  },
  computed: {
    ...mapGetters("wallet", ["isLoading"]),
  },
  mounted() {
    this.onChecklogin();
  },
  methods: {
    onOpenDialog() {
      this.dialog = true;
      // this.$refs["myDialogDeposit"].dialog = true;
    },

    ...mapActions("authen", ["checkLogin"]),
    ...mapActions("wallet", ["requestDeposit", "upLoad", "getHistoryDeposit"]),

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
    async onRequestDeposit() {
      this.validation();
      if (this.isValid == false) {
        return;
      }
      var res;
      var data = {
        amount: this.amount,
        transferSlip: this.imgName,
      };
      try {
        res = await this.requestDeposit(data);

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
          await this.getHistoryDeposit();
          // this.$refs.myDepositRef.fetch({
          //   page: 1,
          //   showType: "deposit",
          // });
          this.dialog = false;
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
      } catch (error) {
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

    async onChecklogin() {
      try {
        var res = await this.checkLogin();
      } catch (error) {}
    },
  },
};
</script>
