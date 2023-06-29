<template>
  <div style="margin-top: 57px">
    <!-- <v-row style="margin: 4px">
      <v-col cols="2" align="center">
        <v-app-bar-nav-icon @click="router('/Profile')"
          ><v-icon color="#19309F">mdi-account</v-icon></v-app-bar-nav-icon
        >
      </v-col>
      <v-col cols="8" align="center" class="my-auto">
        <h3 style="color: #19309f; position: relative; top: 10px"></h3>
      </v-col>
      <v-col cols="2" align="center">
        <v-app-bar-nav-icon @click="router('/Setting')"
          ><v-icon color="#19309F">mdi-cog-outline</v-icon></v-app-bar-nav-icon
        >
      </v-col>
    </v-row> -->

    <v-app-bar style="background-color: white" app density="compact">
      <v-row>
        <v-col cols="2" align="center">
          <v-app-bar-nav-icon @click="router('/Profile')"
            ><v-icon color="#19309F">mdi-account</v-icon></v-app-bar-nav-icon
          >
        </v-col>
        <v-col cols="8" align="center" class="my-auto">
          <h3 style="color: #19309f">{{ $t("wallet") }}</h3>
        </v-col>
        <v-col cols="2" align="center">
          <v-app-bar-nav-icon @click="router('/Setting')"
            ><v-icon color="#19309F"
              >mdi-cog-outline</v-icon
            ></v-app-bar-nav-icon
          >
        </v-col>
      </v-row>
    </v-app-bar>
    <v-card
      class="mx-auto wallet"
      style="margin: 6px; background-color: #19309f; height: 120px"
    >
      <div>
        <div class="font-weight-black">
          <span
            style="color: #bbdefb; padding: 20px; position: relative; top: 20px"
          >
            {{ $t("totalbalance") }}[USD]
          </span>
        </div>
        <div class="text-caption">
          <h4
            style="
              position: relative;
              top: 35px;
              left: 22px;
              font-weight: bold;
              font-size: 22px;
              color: rgb(255, 255, 255);
            "
          >
            {{ $formatnumber(BalanceInfo?.balance) || 0 }}
            <span style="font-size: 16px">USD</span>
          </h4>
        </div>
      </div>
    </v-card>
    <!-- menu -->

    <div style="padding: 15px">
      <v-row
        justify="space-between"
        style="background-color: #ffffff; border-radius: 5px"
      >
        <v-col
          cols="4"
          align="center"
          @click="openInNewTab('https://direct.lc.chat/15630159/')"
        >
          <v-icon color="#19309F" large style="font-weight: bold"
            >mdi-cash-multiple</v-icon
          >
          <p>{{ $t("deposit") }}</p>
        </v-col>
        <v-col
          cols="4"
          align="center"
          @click="onClickWithdraw('/Request/Withdraw')"
        >
          <v-icon color="#19309F" large>mdi-cash-fast</v-icon>
          <p>{{ $t("withdraw") }}</p> </v-col
        ><v-col cols="4" align="center">
          <v-icon
            color="#19309F"
            large
            @click="openInNewTab('https://direct.lc.chat/15630159/')"
            >mdi-chat</v-icon
          >
          <p>{{ $t("service") }}</p>
        </v-col>
      </v-row>
    </div>

    <div class="wraper">
      <div class="my-3">
        <v-tabs
          v-model="tab"
          color="deep-purple-accent-12"
          align-tabs="center"
          dense
          fixed-tabs
        >
          <v-tab :value="0" style="padding: 0">{{ $t("deposit") }}</v-tab>
          <v-tab :value="1">{{ $t("withdraw") }}</v-tab>
          <v-tab :value="2">{{ $t("position") }}</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item :value="0">
            <div class="history">
              <!-- Deposit -->
              <p>{{ $t("history") }} {{ $t("deposit") }}</p>
            </div>
            <vue-loadmore :on-refresh="onRefreshDeposit">
              <div class="item_transection">
                <v-row
                  style="
                    height: 80px;
                    margin-top: 7px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    font-size: 14px;
                    border-bottom: #c2c1c1 solid 1px;
                  "
                  v-for="(item, index) in stateDeposit"
                  :key="'deposit' + index"
                >
                  <v-col align-start cols="6">
                    <div class="in-item">
                      <h4 style="color: #4caf50; font-weight: bold">
                        +{{ $formatnumber(item.amount) }} USD
                      </h4>
                      <p style="font-size: 12px; color: #888888">
                        {{ $FormatDateTime(item.updatedAt) }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="item-right">
                      <span
                        v-if="item.isSuccess == true"
                        style="color: #4caf50; position: relative; top: 23px"
                      >
                        {{ $t("approved") }}</span
                      >
                      <span
                        v-else
                        style="color: #ff9966; position: relative; top: 23px"
                      >
                        {{ $t("pending") }}!</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </div>
            </vue-loadmore>
          </v-window-item>
          <v-window-item :value="1">
            <div class="history">
              <!-- Withdraw -->
              <p>{{ $t("history") }} {{ $t("withdraw") }}</p>
            </div>
            <vue-loadmore :on-refresh="onRefreshWithdraw">
              <div class="item_transection">
                <v-row
                  style="
                    height: 80px;
                    margin-top: 7px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    font-size: 14px;
                    border-bottom: #c2c1c1 solid 1px;
                  "
                  v-for="(item, index) in stateWithdraw"
                  :key="'withdraw' + index"
                >
                  <v-col align-start cols="6">
                    <div class="in-item">
                      <h4 style="color: #ff5252; font-weight: bold">
                        -{{ $formatnumber(item.amount) }} USD
                      </h4>
                      <p style="font-size: 12px; color: #888888">
                        {{ $FormatDateTime(item.updatedAt) }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="item-right">
                      <span
                        v-if="item.isSuccess == true"
                        style="color: #4caf50; position: relative; top: 23px"
                      >
                        {{ $t("approved") }}</span
                      >
                      <span
                        v-else
                        style="color: #ff9966; position: relative; top: 23px"
                      >
                        {{ $t("pending") }}!</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </div>
            </vue-loadmore>
          </v-window-item>

          <v-window-item :value="2">
            <div
              class="history"
              style="width: 100%; border-bottom: #c2c1c1 1px solid"
            >
              <!-- Position -->
              <p>{{ $t("history") }} {{ $t("position") }}</p>
            </div>
            <vue-loadmore :on-refresh="onRefreshPosition">
              <div
                class="item_transection"
                v-for="(item, index) in stateBet"
                :key="'bet' + index"
              >
                <!-- Position -->
                <v-row
                  style="
                    height: 80px;

                    background-color: #ffffff;
                    border-radius: 20px;
                    font-size: 14px;
                  "
                >
                  <v-col align-start cols="6">
                    <div class="in-itemposition" style="padding: 20px">
                      <div class="flex" style="display: flex">
                        <h3
                          style="
                            font-weight: bold;
                            font-size: 16px;
                            color: #212121;
                          "
                        >
                          {{ item.bet.substring(2) }}
                        </h3>
                        &nbsp;&nbsp;
                        <h4
                          v-if="item.type == 'long'"
                          style="
                            color: #4caf50;
                            font-weight: bold;
                            font-size: 12px;
                          "
                        >
                          Buy {{ item.amount }}
                        </h4>
                        <h4
                          v-else
                          style="
                            color: #ff5252;
                            font-weight: bold;
                            font-size: 12px;
                          "
                        >
                          Sell
                          {{ item.amount }}
                        </h4>
                      </div>
                      <p
                        style="font-size: 12px; color: #ff9966"
                        v-if="item.result == null"
                      >
                        {{ item.price }} &rarr; {{ $t("pending") }}!
                      </p>
                      <p style="font-size: 12px; color: #888888" v-else>
                        {{ item.price }} &rarr; {{ item.result.finalPrice }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="6" justify-end>
                    <div
                      class="item-rightposition"
                      justify-end
                      style="
                        align-items: center;
                        position: relative;
                        right: 30px;
                      "
                    >
                      <h3
                        v-if="
                          item.result != null && item.result.status === 'win'
                        "
                        style="
                          display: flex;
                          justify-content: end;
                          font-weight: bold;
                          position: relative;
                          top: 22px;
                          color: #4caf50;
                        "
                      >
                        +{{ $formatnumber(item.amount + item.result.reward) }}
                        USD
                      </h3>
                      <h3
                        v-else-if="
                          item.result != null && item.result.status === 'lose'
                        "
                        style="
                          display: flex;
                          justify-content: end;
                          font-weight: bold;
                          position: relative;
                          top: 22px;
                          color: #ff5252;
                        "
                      >
                        -{{ $formatnumber(item.amount) }} USD
                      </h3>
                      <h3
                        v-else
                        style="
                          display: flex;
                          justify-content: end;
                          font-weight: bold;
                          position: relative;
                          top: 22px;
                          color: #ff9966;
                        "
                      >
                        {{ $t("pending") }} !
                      </h3>
                      <br />
                      <p
                        style="
                          font-size: 12px;
                          color: #888888;
                          display: flex;
                          justify-content: end;
                          position: relative;
                          bottom: 2px;
                        "
                      >
                        {{ $FormatDateTime(item.updatedAt) }}
                      </p>
                    </div>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <!-- <v-row
                  style="
                    height: 80px;
                    border-bottom: #c2c1c1 solid 1px;
                    background-color: #ffffff;
                    border-radius: 20px;
                    font-size: 14px;
                  "
                >
                  <v-col align-start cols="6">
                    <div class="in-itemposition" style="padding: 20px">
                      <div class="flex" style="display: flex">
                        <h3
                          style="
                            font-weight: bold;
                            font-size: 16px;
                            color: #212121;
                          "
                        >
                          XAUUSD
                        </h3>
                        &nbsp;&nbsp;
                        <h4
                          style="
                            color: #19309f;
                            font-weight: bold;
                            font-size: 12px;
                          "
                        >
                          buy 1000
                        </h4>
                      </div>
                      <p style="font-size: 12px; color: #888888">
                        4012.43 &rarr; 2748.23
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="6" justify-end>
                    <div
                      class="item-rightposition"
                      justify-end
                      style="align-items: center; position: relative; right: 30px"
                    >
                      <h3
                        style="
                          display: flex;
                          justify-content: end;
                          font-weight: bold;
                          position: relative;
                          top: 22px;
                          color: #19309f;
                        "
                      >
                        16,613.12
                      </h3>
                      <br />
                      <p
                        style="
                          font-size: 12px;
                          color: #888888;
                          display: flex;
                          justify-content: end;
                          position: relative;
                          bottom: 2px;
                        "
                      >
                        2022-09-19 15:28:10
                      </p>
                    </div>
                  </v-col>
                </v-row>
  
                <v-row
                  style="
                    height: 80px;
                    border-bottom: #c2c1c1 solid 1px;
                    background-color: #ffffff;
                    border-radius: 20px;
                    font-size: 14px;
                  "
                >
                  <v-col align-start cols="6">
                    <div class="in-itemposition" style="padding: 20px">
                      <div class="flex" style="display: flex">
                        <h3
                          style="
                            font-weight: bold;
                            font-size: 16px;
                            color: #212121;
                          "
                        >
                          XAUUSD
                        </h3>
                        &nbsp;&nbsp;
                        <h4
                          style="
                            color: #19309f;
                            font-weight: bold;
                            font-size: 12px;
                          "
                        >
                          buy 1000
                        </h4>
                      </div>
                      <p style="font-size: 12px; color: #888888">
                        4012.43 &rarr; 2748.23
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="6" justify-end>
                    <div
                      class="item-rightposition"
                      justify-end
                      style="align-items: center; position: relative; right: 30px"
                    >
                      <h3
                        style="
                          display: flex;
                          justify-content: end;
                          font-weight: bold;
                          position: relative;
                          top: 22px;
                          color: #19309f;
                        "
                      >
                        16,613.12
                      </h3>
                      <br />
                      <p
                        style="
                          font-size: 12px;
                          color: #888888;
                          display: flex;
                          justify-content: end;
                          position: relative;
                          bottom: 2px;
                        "
                      >
                        2022-09-19 15:28:10
                      </p>
                    </div>
                  </v-col>
                </v-row> -->
              </div>
            </vue-loadmore>
          </v-window-item>
        </v-window>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import secureStorage from "../../plugins/secure-storage";
export default {
  data() {
    return {
      tab: 0,
      verifyInfo: null,
      image: require("~/static/images/audusd.jpeg"),
    };
  },

  mounted() {
    this.myBalance();
    this.checkLogin();
    this.getMyinfo();

    if (!secureStorage.getItem("withdraw")) {
      this.getHistoryWithdraw();
    } else {
      this.SET_HISTORY_WITHDRAW();
    }
    if (!secureStorage.getItem("position")) {
      this.getHistoryBet();
    } else {
      this.SET_HISTORY_BET();
    }
    if (!secureStorage.getItem("deposit")) {
      this.getHistoryDeposit();
    } else {
      this.SET_HISTORY_DEPOSIT();
    }
  },
  computed: {
    ...mapGetters("balance", ["BalanceInfo"]),
    ...mapGetters("wallet", ["stateBet", "stateDeposit", "stateWithdraw"]),
    ...mapGetters("profile", ["stateMyInfo"]),
  },
  methods: {
    ...mapActions("authen", ["checkLogin"]),
    ...mapActions("balance", ["myBalance"]),
    ...mapActions("wallet", [
      "getHistoryWithdraw",
      "getHistoryBet",
      "getHistoryDeposit",
    ]),
    ...mapActions("profile", ["getMyinfo"]),

    ...mapMutations("wallet", [
      "SET_HISTORY_DEPOSIT",
      "SET_HISTORY_WITHDRAW",
      "SET_HISTORY_BET",
    ]),
    async ongetMyVerify() {
      var res;
      try {
        res = await this.getMyVerify();
        this.verifyInfo = res.data.result;
      } catch (error) {}
    },
    router(path) {
      this.$router.push(path);
    },
    onClickWithdraw(path) {
      if (this.stateMyInfo?.user?.isVerified?.status === "approved") {
        this.$router.push(path);
      } else {
        this.$swal({
          toast: true,
          text: "Please verify your account",
          iconColor: "red",
          icon: "error",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      }
    },
    openInNewTab(url) {
      window.open(url, "_blank", "noreferrer");
    },
    async onRefreshDeposit(done) {
      await this.getHistoryDeposit();
      done();
    },
    async onRefreshWithdraw(done) {
      await this.getHistoryWithdraw();
      done();
    },
    async onRefreshPosition(done) {
      await this.getHistoryBet();
      done();
    },
  },
};
</script>

<style>
.wraper {
  background-color: #f2f3f5;
  width: 100%;
  height: 600px;
  border-radius: 20px;
}

.history {
  width: 100%;
  height: 40px;
  background-color: #f2f3f5;
  border-bottom: #c2c1c1 1px solid;
}

.history p {
  padding: 10px;
  color: #c2c1c1;
}

.item_transection v-row {
  height: 90px;
  padding: 5px;
  position: absolute;
}

.item_transection {
  margin-top: 10px;
}

.item_transection .in-item {
  padding: 20px;
}

.item_transection .item-right {
  display: flex;
  justify-content: center;
}

.item_transection .item-right v-badge {
  position: relative;
  top: 20px;
}
</style>
