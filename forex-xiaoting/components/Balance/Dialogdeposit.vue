<template>
  <div>
    <v-dialog v-model="dialog" style="width: fit-content">
      <v-card>
        <v-container>
          <div>
            <v-text-field
              prefix="$"
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

            <img
              aspect-ratio="1"
              :src="form.image ? form.image : '/images/image.png'"
              alt=""
              style="max-width: 200px; max-height: 200px; margin: 20px 0px"
            /><br />
            <input
              type="file"
              id="uploadImage"
              accept="capture=camera,image/*"
              @input="updateValue"
              ref="file"
              class="button-10"
              role="button"
              capture="camera"
              multiple
              hidden
            />
            <label
              for="uploadImage"
              class="label"
              style="
                margin-top: 10px;
                background-color: red;
                padding: 7px;
                border-radius: 5px;
                color: white;
              "
            >
              <b>Pick</b>
              <v-icon style="color: white"> mdi-image-edit-outline </v-icon>
            </label>
          </div>
          <div class="my-10">
            <v-btn block color="primary" dark @click="onRequestDeposit()"
              >Send Request</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>
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
    },
    ...mapActions("authen", ["checkLogin"]),
    ...mapActions("wallet", ["requestDeposit", "upLoad"]),
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
        transferSlip: this.form.imageFile.name,
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
