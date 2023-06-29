<template>
  <div>
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Staking"
      :title="$t('miningConfirmation')"
    />
    <v-container style="margin-top: 57px">
      <center>
        <h3>XAU</h3>
        <h1>{{ list[this.index].interest }}%</h1>
        <p>Dialy Rate</p>
      </center>
    </v-container>
    <br />
    <v-container>
      <v-row style="padding: 0 12px"
        ><v-col cols="6" align="start"
          ><p>
            Stacking coin <span><b>XAU</b></span>
          </p></v-col
        >
        <v-col cols="6" align="end"
          ><p>
            Profit coin <span><b>XAU</b></span>
          </p></v-col
        >
        <v-col cols="6" align="start"
          ><p>
            Remaining <span><b>unlimited</b></span>
          </p></v-col
        >
        <v-col cols="6" align="end"
          ><p>
            Duration <span><b>1Day</b></span>
          </p></v-col
        ></v-row
      >
    </v-container>
    <br />
    <v-container>
      <v-row style="height: 10px; background-color: rgb(223, 223, 223)"></v-row>
    </v-container>
    <v-container>
      <h6>Number of stacking</h6>
      <v-text-field
        v-model="amount"
        :placeholder="
          list[this.index].min + '-' + list[this.index].max + ' USD'
        "
        @copy.prevent
        @paste.prevent
        @keypress="$NumberFilterNoDot"
      ></v-text-field>
    </v-container>
    <v-container
      ><v-row
        ><v-col cols="12" align="end"
          ><p>
            Available Balance: {{ $formatnumber(BalanceInfo?.balance) }} USD
          </p></v-col
        ></v-row
      ></v-container
    >
    <v-btn
      :disabled="disableBtn()"
      :dark="!disableBtn()"
      color="#19309F"
      @click="onRequest()"
      style="position: absolute; bottom: 5%; left: 5%; right: 5%"
      >Staking now</v-btn
    >
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      amount: "",
      index: 0,
      list: [
        { interest: 4, min: 99, max: 999 },
        { interest: 5, min: 1000, max: 10000 },
        { interest: 6, min: 10999, max: 50000 },
        { interest: 7, min: 50999, max: 100000 },
        { interest: 7.5, min: 109999, max: 500000 },
        { interest: 8, min: 509999, max: 1000000 },
      ],
    };
  },
  mounted() {
    this.index = this.$route.params.position;
    this.myBalance();
    this.checkLogin();
  },
  computed: {
    ...mapGetters("balance", ["BalanceInfo"]),
    ...mapGetters("authen", ["isLogin"]),
  },
  methods: {
    ...mapActions("balance", ["myBalance"]),
    ...mapActions("authen", ["checkLogin", "logout"]),
    ...mapActions("staking", ["requestStaking"]),
    async onRequest() {
      if (this.isLogin == true) {
        var res;
        var data = { amount: Number(this.amount), savingTime: 1 };
        try {
          res = await this.requestStaking(data);

          if (res.status == 201) {
            this.$swal({
              toast: true,
              text: "Staking success",
              icon: "success",
              timer: 1800,
              timerProgressBar: true,
              showConfirmButton: false,
              position: "top-end",
            });
            this.$router.back();
          }
        } catch (error) {
          this.$swal({
            toast: true,
            text: "Something went wrong",
            iconColor: "red",
            icon: "error",
            timer: 1800,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
      } else {
        this.$router.push("/");
        this.$swal({
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
    },

    disableBtn() {
      return (
        this.amount == "" ||
        Number(this.amount) < Number(this.list[this.index].min) ||
        Number(this.amount) > Number(this.list[this.index].max) ||
        Number(this.amount) > Number(this.BalanceInfo?.balance)
      );
    },
  },
};
</script>
