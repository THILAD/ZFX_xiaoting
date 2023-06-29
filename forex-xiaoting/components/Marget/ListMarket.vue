<template>
  <div style="margin-top: 53px; margin-bottom: 50px">
    <AuthenLogin ref="loginRef" />

    <WidgetsNavbar :title="$t('market')" />
    <div class="my-3">
      <v-row>
        <v-col align="center" style="position: relative"
          ><h5>{{ $t("symbol") }} {{ $t("pair") }}</h5></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5>{{ $t("price") }}</h5></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5>{{ $t("trade") }}</h5></v-col
        >
      </v-row>
      <v-divider class="mt-4"></v-divider>
    </div>
    <div class="my-2" @click="onSelect('XAUUSD')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/xauusd.jpeg"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">XAU/USD</span>
        </v-col>
        <v-col align="center" style="position: relative"
          ><h5
            :style="{
              color: xauusdColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateXAUUSD }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('XAUUSD')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="my-2" @click="onSelect('XAGUSD')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/xagusd.jpeg"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">XAG/USD</span></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5
            class="my-auto"
            :style="{
              color: xagusdColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateXAGUSD }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('XAGUSD')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="my-2" @click="onSelect('USDJPY')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/usdjpy.jpeg"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">USD/JPY</span></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5
            class="my-auto"
            :style="{
              color: usdjpyColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateUSDJPY }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('USDJPY')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="my-2" @click="onSelect('AUDUSD')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/audusd.jpeg"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">AUD/USD</span></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5
            class="my-auto"
            :style="{
              color: audusdColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateAUDUSD }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('AUDUSD')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="my-2" @click="onSelect('EURUSD')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/eurusd.jpeg"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">EUR/USD</span></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5
            class="my-auto"
            :style="{
              color: eurusdColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateEURUSD }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('EURUSD')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="my-2" @click="onSelect('USDCAD')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/usdcan.jpeg"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">USD/CAD</span></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5
            class="my-auto"
            :style="{
              color: usdcadColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateUSDCAD }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('USDCAD')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="my-2" @click="onSelect('GBPUSD')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/gbpuad.jpeg"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">GBP/USD</span></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5
            class="my-auto"
            :style="{
              color: gbpuadColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateGBPUAD }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('GBPUSD')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="my-2" @click="onSelect('USDCNH')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/usdcnh.jpeg"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">USD/CNH</span></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5
            class="my-auto"
            :style="{
              color: usdcnhColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateUSDCNH }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('USDCNH')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="my-2" @click="onSelect('USDSEK')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/usdsek.png"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">USD/SEK</span></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5
            class="my-auto"
            :style="{
              color: usdsekColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateUSDSEK }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('USDSEK')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
    <div class="my-2" @click="onSelect('USDTHB')">
      <v-row class="my-1">
        <v-col align="center" style="display: flex; align-items: center"
          ><v-img
            src="/images/usdthb.png"
            style="max-width: 33px; max-height: 33px; border-radius: 100%"
          ></v-img>
          &nbsp;
          <span style="font-size: 10px !important">USD/THB</span></v-col
        >
        <v-col align="center" style="position: relative"
          ><h5
            class="my-auto"
            :style="{
              color: usdthbColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            {{ stateUSDTHB }}
          </h5></v-col
        >
        <v-col align="center">
          <v-btn
            color="#19309F"
            dark
            elevation="2"
            x-small
            @click="onSelect('USDTHB')"
            >{{ $t("trade") }}</v-btn
          ></v-col
        >
      </v-row>
      <v-divider></v-divider>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import secureStorage from "~/plugins/secure-storage";

export default {
  created() {
    this.connection = new WebSocket("wss://socket.polygon.io/forex");
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
          params:
            "C.C:XAU-USD,C.C:XAG-USD,C.C:USD-JPY,C.C:AUD-USD,C.C:EUR-USD,C.C:USD-CAD,C.C:GBP-USD,C.C:USD-CNH,C.C:USD-SEK,C.C:USD-THB",
        })
      );
      this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data);
        var obj = data[0];
        var data = {
          key: obj.p,
          value: obj.a,
        };
        this.$store.commit("callDataGraph/SET_STATE_MARKET_LIST", data);
        // if (obj.p === "XAU/USD") {
        //   this.xauusd = obj.a;
        // }
        // if (obj.p === "XAG/USD") {
        //   this.xagusd = obj.a;
        // }
        // if (obj.p === "USD/JPY") {
        //   this.usdjpy = obj.a;
        // }
        // if (obj.p === "AUD/USD") {
        //   this.audusd = obj.a;
        // }
        // if (obj.p === "EUR/USD") {
        //   this.gbpusd = obj.a;
        // }
        // if (obj.p === "USD/CAD") {
        //   this.eurusd = obj.a;
        // }
        // if (obj.p === "GBP/UAD") {
        //   this.usdcnh = obj.a;
        // }
        // if (obj.p === "NY/MEX") {
        //   this.usdsek = obj.a;
        // }

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
          this.open = this.newData.open;
          this.high = this.newData.high;
          this.low = this.newData.low;
          this.chart.updateData(this.newData);
        }
      };
    };
  },
  data() {
    return {
      connection: null,
      xauusd: 0,
      xagusd: 0,
      usdjpy: 0,
      audusd: 0,
      gbpusd: 0,
      eurusd: 0,
      usdcnh: 0,
      usdsek: 0,
    };
  },
  mounted() {
    this.onChecklogin();
  },
  computed: {
    ...mapGetters("authen", ["isLogin"]),
    ...mapGetters("callDataGraph", [
      "stateXAUUSD",
      "stateXAGUSD",
      "stateUSDJPY",
      "stateAUDUSD",
      "stateEURUSD",
      "stateUSDCAD",
      "stateGBPUAD",
      "stateUSDCNH",
      "stateUSDSEK",
      "stateUSDTHB",
      "xauusdColor",
      "xagusdColor",
      "usdjpyColor",
      "audusdColor",
      "eurusdColor",
      "usdcadColor",
      "gbpuadColor",
      "usdcnhColor",
      "usdsekColor",
      "usdthbColor",
    ]),
  },
  methods: {
    ...mapActions("authen", ["register", "checkLogin"]),
    onSelect(pair) {
      if (this.isLogin == true) {
        secureStorage.setItem("navitab", 2);
        this.$router.push("/Chart/" + pair);
      } else {
        this.$refs["loginRef"].dialog = true;
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
