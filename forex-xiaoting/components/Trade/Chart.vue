<template>
  <div>
    <v-dialog v-model="marketClosed" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          {{ $t("topicmarketClosed") }}
        </v-card-title>

        <v-card-text>
          {{ $t("marketClosed") }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$router.back()">
            {{ $t("back") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container>
      <v-btn
        fixed
        bottom
        left
        @click="onClickDialog()"
        fab
        dark
        style="margin-bottom: 50px"
        color="success"
        :disabled="marketClosed"
      >
        <v-icon>mdi-swap-horizontal</v-icon>
      </v-btn>
      <!-- <v-speed-dial
        v-model="fab"
        fixed
        bottom
        right
        direction="top"
        transition="slide-y-reverse-transition"
        style="margin-bottom: 50px"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="#19309f " dark fab>
            <v-icon v-if="fab" dark>mdi-close</v-icon>
            <v-icon v-else dark>mdi-menu-open</v-icon>
          </v-btn>
        </template>

        <v-btn fab dark small color="indigo">
          <v-icon>mdi-currency-usd</v-icon>
        </v-btn>
        <v-btn @click="onClickDialog()" fab dark small color="success">
          <v-icon>mdi-swap-horizontal</v-icon>
        </v-btn>
      </v-speed-dial> -->
      <v-dialog
        v-model="dialog"
        max-width="500"
        :persistent="
          minutes != 0 || seconds != 0 || isLoading == true ? true : false
        "
        ><v-card
          v-if="isStart == false && isEnded == false && isLoading == false"
        >
          <v-card-title class="py-3">
            <v-row
              ><v-col
                ><v-btn icon color="primary" @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn></v-col
              >
              <v-col align="center">
                <h5>{{ pair }}</h5></v-col
              >
              <v-col></v-col
            ></v-row>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col
                cols="4"
                align="center"
                style="padding: 3px 6px"
                v-for="(item, index) in time"
                :key="index"
              >
                <v-card
                  @click="selectedTime = index"
                  style="width: 100%"
                  :dark="selectedTime === index ? true : false"
                  :color="selectedTime === index ? '#19309F' : 'white'"
                >
                  <p style="margin: 0">{{ item }}</p>
                  <p style="margin: 0; font-size: 14px">
                    ( {{ winrate[index] }}%)
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!-- <v-sheet>
            <v-slide-group v-model="selectedTime" show-arrows>
              <v-row>
                <v-col
                  v-for="(item, index) in time"
                  :key="index"
                  align="center"
                  cols="2"
                >
                  <v-slide-item color="#19309f" v-slot="{ active, toggle }">
                    <v-btn
                      class="mx-2"
                      :input-value="active"
                      active-class="bg-active"
                      depressed
                      small
                      rounded
                      @click="toggle"
                    >
                      {{ item }}
                    </v-btn>
                  </v-slide-item>
                </v-col>
              </v-row>
            </v-slide-group>
          </v-sheet> -->
          <v-container>
            <v-text-field
              type="number"
              v-model="amount"
              prefix="$"
              @keypress="$NumberFilterNoDot"
              class="my-2"
              dense
              :label="$t('amount')"
              outlined
              :rules="[(v) => v >= 10 || 'At least 10$']"
            ></v-text-field>
            <v-row style="text-align: center">
              <v-col
                ><h4>{{ $t("choose") }}</h4>
                <v-btn
                  elevation="0"
                  :color="pickLongShort === 'Buy' ? 'success' : 'error'"
                  small
                  dark
                >
                  {{ pickLongShort }}
                </v-btn>
                <!-- <v-menu top :offset-y="true">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="3"
                    :color="pickLongShort === 'Long' ? 'success' : 'error'"
                    small
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ pickLongShort }}
                    <v-icon style="padding: 0; margin: 0">mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    @click="pickLongShort = item"
                    v-for="(item, index) in longShort"
                    :key="index"
                    dense
                  >
                    <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-menu> -->
              </v-col>

              <v-col
                ><h4>{{ $t("amount") }}</h4>
                <h4>{{ Number(amount).toLocaleString() || 0 }}$</h4></v-col
              >
            </v-row>
            <v-row>
              <v-col style="padding: 0 3px">
                <v-btn
                  color="success"
                  style="color: white"
                  dense
                  block
                  @click="pickLongShort = 'Buy'"
                  >{{ $t("buy") }}</v-btn
                >
              </v-col>
              <v-col style="padding: 0 3px">
                <v-btn
                  color="error"
                  style="color: white"
                  dense
                  block
                  @click="pickLongShort = 'Sell'"
                  >{{ $t("sell") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
          <v-btn
            @click="onClickBet()"
            class="mt-7"
            color="#19309f"
            style="color: white"
            :disabled="
              Number(amount) <= 9 || amount == ''
                ? true
                : false || btnBetLoading
            "
            dense
            :loading="btnBetLoading"
            block
            >{{ $t("confirm") }}</v-btn
          ><br />
        </v-card>
        <v-card v-if="isStart == true && isEnded == false && isLoading == false"
          ><v-container>
            <!-- <v-row>
              <v-col align="center"><h3>Countdown for result</h3> </v-col>
            </v-row> -->
            <v-row class="my-3">
              <v-col align="center" cols="12" style="padding-top: 0px">
                <h4 style="color: #19309f">{{ pair }}</h4>
              </v-col>
              <v-col align="right" cols="6">
                <v-progress-circular
                  :rotate="-90"
                  :size="100"
                  :width="15"
                  :value="(minutes * 100) / countDownTime[this.selectedTime]"
                  color="teal"
                >
                  <h4>{{ minutes }}m</h4>
                </v-progress-circular>
              </v-col>
              <v-col align="left" cols="6">
                <v-progress-circular
                  :rotate="-90"
                  :size="100"
                  :width="15"
                  :value="(seconds * 100) / 60"
                  color="teal"
                >
                  <h4>{{ seconds }}s</h4>
                </v-progress-circular>
              </v-col>
            </v-row>
            <v-row class="my-3">
              <v-col align="center">
                <v-card>
                  <h5>{{ $t("trend") }}</h5>
                  <h4
                    :style="{
                      color: pickLongShort === 'Buy' ? '#4caf50' : '#FF5252',
                    }"
                  >
                    {{ pickLongShort }}
                  </h4>
                </v-card>
              </v-col>
              <v-col align="center">
                <v-card>
                  <h5>{{ $t("price") }}</h5>
                  <h4 style="color: #19309f">
                    {{ $formatnumber2(curPrice) }}
                  </h4>
                </v-card>
              </v-col>
              <v-col align="center">
                <v-card>
                  <h5>{{ $t("amount") }}</h5>
                  <h4 style="color: #19309f">
                    {{ Number(amount).toLocaleString() }}$
                  </h4>
                </v-card></v-col
              >
            </v-row>
          </v-container></v-card
        >
        <v-card
          v-if="isEnded == true && resultBet === 'win' && isLoading == false"
          ><v-container>
            <!-- <v-row>
              <v-col align="center"><h3>Countdown for result</h3> </v-col>
            </v-row> -->
            <v-row class="my-3">
              <v-col align="center" cols="12" style="padding-top: 0px">
                <h4 style="color: #19309f">{{ pair }}</h4>
              </v-col>
              <v-col align="center" cols="12">
                <h1 style="color: #4caf50">
                  {{
                    $formatnumber2(
                      dataResult.amount + dataResult.result.reward
                    )
                  }}$
                </h1></v-col
              >
            </v-row>
            <v-row class="my-3">
              <v-col align="center">
                <v-card>
                  <h5>{{ $t("trend") }}</h5>
                  <h4
                    :style="{
                      color: pickLongShort === 'Buy' ? '#4caf50' : '#FF5252',
                    }"
                  >
                    {{ pickLongShort }}
                  </h4>
                </v-card>
              </v-col>
              <v-col align="center">
                <v-card>
                  <h5>{{ $t("price") }}</h5>
                  <h4 style="color: #19309f">
                    {{ $formatnumber2(curPrice) }}
                  </h4>
                </v-card>
              </v-col>
              <v-col align="center">
                <v-card>
                  <h5>{{ $t("lastprices") }}</h5>
                  <h4 style="color: #19309f">
                    {{ $formatnumber2(dataResult.result.finalPrice) }}$
                  </h4>
                </v-card></v-col
              >
            </v-row>
          </v-container></v-card
        >
        <v-card
          v-if="isEnded == true && resultBet === 'lose' && isLoading == false"
          ><v-container>
            <!-- <v-row>
              <v-col align="center"><h3>Countdown for result</h3> </v-col>
            </v-row> -->
            <v-row class="my-3">
              <v-col align="center" cols="12" style="padding-top: 0px">
                <h4 style="color: #19309f">{{ pair }}</h4>
              </v-col>
              <v-col align="center" cols="12">
                <h1 style="color: #ff5252">
                  -{{ $formatnumber2(dataResult.amount) }}$
                </h1></v-col
              >
            </v-row>
            <v-row class="my-3">
              <v-col align="center">
                <v-card>
                  <h5>{{ $t("trend") }}</h5>
                  <h4
                    :style="{
                      color: pickLongShort === 'Buy' ? '#4caf50' : '#FF5252',
                    }"
                  >
                    {{ pickLongShort }}
                  </h4>
                </v-card>
              </v-col>
              <v-col align="center">
                <v-card>
                  <h5>{{ $t("price") }}</h5>
                  <h4 style="color: #19309f">
                    {{ curPrice }}
                  </h4>
                </v-card>
              </v-col>
              <v-col align="center">
                <v-card>
                  <h5>{{ $t("lastprices") }}</h5>
                  <h4 style="color: #19309f">
                    {{ dataResult.result.finalPrice }}$
                  </h4>
                </v-card></v-col
              >
            </v-row>
          </v-container></v-card
        >
        <v-card
          v-if="
            (isEnded == true && isLoading == false && resultBet === '') ||
            resultBet == null
          "
          ><v-container style="background-color: #e74c3c">
            <v-row>
              <v-col align="center"
                ><v-icon size="100" color="white"
                  >mdi-emoticon-dead-outline</v-icon
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <h2>Something Went Wrong</h2>
              </v-col>
            </v-row>
            <v-btn
              @click="dialog = false"
              class="mt-7"
              style="background-color: white; color: #e74c3c"
              dark
              dense
              block
              >OK !</v-btn
            >
          </v-container></v-card
        >
        <v-card v-if="isLoading == true"
          ><v-container style="padding-bottom: 50px">
            <WidgetsLoading /> </v-container></v-card
      ></v-dialog>
      <v-row>
        <!-- <v-col cols="12" sm="6" class="pt-1" align="center">
          <v-row
            ><v-col>
              <h2>{{ lastestValue }}</h2>
            </v-col>
            <v-col>
              <p>Open {{ open }}</p>
              <p>High {{ high }}</p>
              <p>Low {{ low }}</p>
            </v-col></v-row
          >
        </v-col> -->
        <v-col cols="12" sm="6" class="pt-3">
          <div>
            <v-slide-group v-model="selectGraphTimeFrame">
              <div style="display: flex">
                <div v-for="(item, index) in btnTimeFrame" :key="index">
                  <v-slide-item color="#19309f" v-slot="{ active, toggle }">
                    <v-btn
                      :input-value="active"
                      style="margin: 0 7px"
                      active-class="bg-active blue white--text"
                      depressed
                      small
                      rounded
                      @click="
                        toggle();
                        callApiGraphData();
                      "
                    >
                      {{ item }}
                    </v-btn>
                  </v-slide-item>
                </div>
              </div>
            </v-slide-group>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-btn
      small
      v-for="(type, index) in mainIndicators"
      :key="index + type + 'mainIndicators'"
      v-on:click="setMainIndicator(type)"
      >{{ type }}</v-btn
    >
    <v-btn
      small
      v-for="(item, index) in mainIndicators"
      :key="index + 'mainIndicators' + item"
      v-on:click="setSubIndicator(item)"
      >{{ item }}</v-btn
    > -->
    <Layout :title="pair" v-on:setTheme="setTheme">
      <div id="indicator-k-line" class="k-line-chart" />
      <!-- <div class="k-line-chart-menu-container">
        <button
          v-for="type in mainIndicators"
          :key="type"
          v-on:click="setMainIndicator(type)"
        >
          {{ type }}
        </button>

        <button
          v-for="type in subIndicators"
          :key="type"
          v-on:click="setSubIndicator(type)"
        >
          {{ type }}
        </button>
      </div> -->
    </Layout>
    <!-- <v-row style="padding: 0px 3vw">
      <v-col style="padding: 0 3px">
        <v-btn
          color="success"
          style="color: white"
          dense
          block
          @click="
            pickLongShort = 'Buy';
            onClickDialog();
          "
          >{{ $t("buy") }}</v-btn
        >
      </v-col>
      <v-col style="padding: 0 3px">
        <v-btn
          color="error"
          style="color: white"
          dense
          block
          @click="
            pickLongShort = 'Sell';
            onClickDialog();
          "
          >{{ $t("sell") }}</v-btn
        >
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import { dispose, init, registerIndicator } from "klinecharts";
import Layout from "./Layout.vue";
import secureStorage from "~/plugins/secure-storage";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChartIndicator",
  components: { Layout },
  data: function () {
    return {
      marketClosed: false,
      longShort: ["Long", "Short"],
      pickLongShort: "Sell",
      time: ["60s", "120s", "180s", "240s", "300s", "360s"],
      btnTimeFrame: ["1m", "5m", "15m", "1h", "1D"],
      countDownTime: [1, 2, 3, 4, 5, 6],
      mainIndicators: ["MA", "EMA", "SAR"],
      subIndicators: ["VOL", "MACD", "KDJ"],
      connection: null,
      newData: null,
      open: 0,
      lastestValue: "",
      low: 0,
      selectGraphTimeFrame: 0,
      high: 0,
      fab: false,
      pair: "XAUUSD",
      notEnoughBalance: false,
      isLoading: false,
      resultBet: "",
      _id: "",
      isStart: false,
      minutes: 0,
      seconds: 0,
      isEnded: false,
      amount: "",
      selectedTime: 0,
      graphTimeFrame: [1, 5, 15, 1, 1],
      graphTimeFrameUnit: ["minute", "minute", "minute", "hour", "day"],
      winrate: [12, 15, 18, 22, 26, 30],
      dialog: false,
      windowHeight: (window.innerHeight * 93) / 100,
      windowWidth: window.innerWidth,
      timess: 1558688400000,
      fromDate: "",
      toDate: "",
      theme: "light",
      curPrice: 0,
      dataResult: null,
      btnBetLoading: false,
    };
  },
  computed: {
    ...mapGetters("callDataGraph", ["graphData"]),
    ...mapGetters("authen", ["isLogin"]),
  },
  mounted: function () {
    this.checkMaket().then((res) => {
      this.marketClosed = res?.currencies?.fx === "closed";
    });
    this.chart = init("indicator-k-line", {
      timezone: "Asia/Bangkok",
      styles: {
        candle: {
          tooltip: {
            showRule: "none",
          },
          priceMark: {
            show: true,
            last: {
              text: {
                show: true,
              },
            },
          },
        },
        indicator: {
          tooltip: {
            showRule: "none",
          },
        },
      },
    });

    this.paneId = this.chart.createIndicator("MACD");
    // this.chart.setStyles("dark");
    this.chart.createIndicator("EMA", false, { id: "candle_pane" });
    this.chart.createIndicator("MACD", false, { id: this.paneId });
    this.pair = this.$route.params.pair;
    this.callApiGraphData();
    this.onChecklogin();
  },
  watch: {
    dialog() {
      if (this.dialog == false) {
        this.isStart = false;
        this.minutes = 0;
        this.seconds = 0;
        this.isEnded = false;
        this.amount = "";
        this.selectedTime = 0;
        this._id = "";
        this.resultBet = "";
      }
    },
  },
  methods: {
    ...mapActions("callDataGraph", ["getGraphData"]),
    ...mapActions("bet", ["betting", "myBetById", "checkMaket"]),
    ...mapActions("wallet", ["getHistoryBet"]),
    ...mapActions("authen", ["register", "checkLogin"]),
    onClickDialog() {
      this.dialog = true;
    },
    async onChecklogin() {
      try {
        var res = await this.checkLogin();
      } catch (error) {}
    },
    async onGetResult() {
      var res;
      try {
        res = await this.myBetById(this._id);
        if (res.data.result.result != null) {
          this.resultBet = res.data?.result?.result?.status;
          this.dataResult = res.data.result;
        }
        this.isEnded = true;
        this.isStart = false;
        this.isLoading = false;
        await this.getHistoryBet();
      } catch (error) {
        await this.getHistoryBet();

        this.isLoading = false;
      }
    },
    async onClickBet() {
      this.btnBetLoading = true;
      var res;

      var data = {
        amount: Number(this.amount),
        bet: "C:" + this.pair,
        type:
          String(this.pickLongShort).toLocaleLowerCase() === "buy"
            ? "long"
            : "short",
        timer: this.countDownTime[this.selectedTime] * 60,
      };
      try {
        res = await this.betting(data);
        if (res.status == 201) {
          this.startCountDown();
          this._id = res.data.result._id;
          this.curPrice = res.data.result.price;
          await this.getHistoryBet();
        }
        this.btnBetLoading = false;
        this.isLoading = false;
      } catch (error) {
        this.btnBetLoading = false;

        this.isLoading = false;

        this.$swal({
          toast: true,
          text: error.response?.data?.message,
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      }
    },

    updateRemaining(distance) {
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    },
    tick() {
      if (this.seconds == 0) {
        this.minutes - 1 < 0
          ? (this.minutes = 0)
          : (this.minutes = this.minutes - 1);
        this.seconds = 60;
        this.seconds -= 1;
      } else {
        this.seconds -= 1;
      }

      if (this.minutes === 0 && this.seconds === 0) {
        this.isLoading = true;
        clearInterval(this.timer);
        setTimeout(() => {
          this.onGetResult();
        }, 2000);
      }
    },
    startCountDown() {
      this.minutes = this.countDownTime[this.selectedTime];
      this.isStart = true;
      this.tick();
      this.timer = setInterval(this.tick.bind(this), 1000);
    },
    setTheme() {
      if (this.theme === "light") {
        this.theme = "dark";
        this.chart.setStyles(this.theme);
      } else {
        this.theme = "light";

        this.chart.setStyles(this.theme);
      }
    },
    callApiGraphData: async function () {
      const date = new Date();

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.fromDate = [
        String(Number(year) - 1),
        month >= 10 ? month : "0" + month,
        day >= 10 ? day : "0" + day,
      ].join("-");
      this.toDate = [
        year,
        month >= 10 ? month : "0" + month,
        day >= 10 ? day : "0" + day,
      ].join("-");
      var data = {
        pair: this.pair,
        fromDate: this.fromDate,
        toDate: this.toDate,
        timeFrame: this.graphTimeFrame[Number(this.selectGraphTimeFrame)],
        timeFrameUnit:
          this.graphTimeFrameUnit[Number(this.selectGraphTimeFrame)],
      };
      var res;
      try {
        res = await this.getGraphData(data);
        // this.chart = init("indicator-k-line", {
        //   timezone: "Asia/Bangkok",
        //   styles: {
        //     candle: {
        //       tooltip: {
        //         showRule: "none",
        //       },
        //       priceMark: {
        //         show: true,
        //         last: {
        //           text: {
        //             show: true,
        //           },
        //         },
        //       },
        //     },
        //     indicator: {
        //       tooltip: {
        //         showRule: "none",
        //       },
        //     },
        //   },
        // });

        this.chart.applyNewData(this.generatedDataList());
        // console.log(this.chart);
        // setTimeout(() => {
        //   var currentData = this.chart.getDataList();

        //   // Get the index of the last data point
        //   var lastIndex = currentData.length - 1;

        //   // Retrieve the last data point
        //   var lastDataPoint = currentData[lastIndex];

        //   // Modify the desired properties of the last data point
        //   lastDataPoint.close = 1950; // Set the new closing price

        //   // Update the chart with the modified data
        //   currentData[lastIndex] = lastDataPoint;
        //   this.chart.applyNewData(currentData);
        //   setTimeout(() => {
        //     lastDataPoint.close = 1930; // Set the new closing price

        //     // Update the chart with the modified data
        //     currentData[lastIndex] = lastDataPoint;
        //     this.chart.applyNewData(currentData);
        //     setTimeout(() => {
        //       lastDataPoint.close = 1945; // Set the new closing price

        //       // Update the chart with the modified data
        //       currentData[lastIndex] = lastDataPoint;
        //       this.chart.applyNewData(currentData);
        //     }, 1000);
        //   }, 1000);
        // }, 2000);
        // this.connection = new WebSocket("wss://socket.polygon.io/forex");
        // this.connection.onopen = (e) => {
        //   this.connection.send(
        //     JSON.stringify({
        //       action: "auth",
        //       params: process.env.POLYGONTOKEN,
        //     })
        //   );

        //   this.connection.send(
        //     JSON.stringify({
        //       action: "subscribe",
        //       params: `C.C:${
        //         this.pair.substring(0, 3) + "-" + this.pair.substring(3)
        //       }`,
        //     })
        //   );
        //   this.connection.onmessage = (e) => {
        //     console.log(e);
        //     var currentData = this.chart.getDataList();
        //     var lastIndex = currentData.length - 1;

        //     var lastDataPoint = currentData[lastIndex];
        //     var data = JSON.parse(e.data);
        //     var obj = data[0];
        //     lastDataPoint.close = obj.a;

        //     currentData[lastIndex] = lastDataPoint;
        //     this.chart.applyNewData(currentData);
        //   };
        // };
        setInterval(() => {
          this.$axios({
            url:
              `https://api.polygon.io/v2/snapshot/locale/global/markets/forex/tickers?tickers=C:${this.pair}&apiKey=` +
              process.env.POLYGONTOKEN,
          }).then((x) => {
            // console.log(this.pair.substring(0, 3) + this.pair.substring(3));
            let lastQ = x.data?.tickers[0]["lastQuote"];

            const { a: ask, b: bid } = lastQ;
            const { o, l, h, c, v, turnover } = x.data?.tickers[0]?.min;
            var currentData = this.chart.getDataList();
            var lastIndex = currentData.length - 1;
            var lastDataPoint = currentData[lastIndex];
            lastDataPoint.open = o;
            lastDataPoint.low = l;
            lastDataPoint.high = h;
            lastDataPoint.close = ask;
            lastDataPoint.volume = v;
            lastDataPoint.turnover = turnover;

            currentData[lastIndex] = lastDataPoint;
            this.chart.applyNewData(currentData);
          });
        }, 3000);
        this.connection = new WebSocket("wss://socket.polygon.io/forex");
        let subscribePair =
          this.pair.substring(0, 3) + "-" + this.pair.substring(3);
        this.connection.onopen = (e) => {
          this.connection.send(
            JSON.stringify({
              action: "auth",
              params: process.env.POLYGONTOKEN,
            })
          );

          this.connection.send(
            JSON.stringify({
              action: "subscribe",
              params: `CA.C:${subscribePair}`,
            })
          );
          this.connection.onmessage = (e) => {
            this.value = JSON.parse(e.data);
            if (this.value[0].c) {
              this.newData = {
                open: this.value[0].o,
                low: this.value[0].l,
                high: this.value[0].h,
                close: this.value[0].c,
                volume: this.value[0].v,
                timestamp: this.value[0].s,
              };
              this.newData.turnover =
                ((this.newData.open +
                  this.newData.close +
                  this.newData.high +
                  this.newData.low) /
                  4) *
                this.newData.volume;
            }
            if (this.newData) {
              this.lastestValue = this.newData.high;
              this.open = this.newData.open;
              this.high = this.newData.high;
              this.low = this.newData.low;
              this.chart.updateData(this.newData);
            }
          };
        };
      } catch (error) {}
    },
    setMainIndicator: function (name) {
      this.chart.createIndicator(name, false, { id: "candle_pane" });
    },
    setSubIndicator: function (name) {
      this.chart.createIndicator(name, false, { id: this.paneId });
    },
    generatedDataList() {
      const dataList = [];

      for (let index = 0; index < this.graphData.length; index++) {
        const kLineData = {
          open: this.graphData[index].o,
          low: this.graphData[index].l,
          high: this.graphData[index].h,
          close: this.graphData[index].c,
          volume: this.graphData[index].vw,
          timestamp: this.graphData[index].t,
        };
        kLineData.turnover =
          ((kLineData.open + kLineData.close + kLineData.high + kLineData.low) /
            4) *
          kLineData.volume;
        // dataList.unshift(kLineData);
        dataList.unshift(kLineData);
      }
      this.lastestValue = dataList[dataList.length - 1].high;
      this.open = dataList[dataList.length - 1].open;
      this.high = dataList[dataList.length - 1].high;
      this.low = dataList[dataList.length - 1].low;

      return dataList;
    },
  },
  unmounted: function () {
    dispose("indicator-k-line");
  },
};
</script>
<style scoped>
@media (max-width: 400px) {
  .time-btn {
    width: 50px;
  }
}
</style>
