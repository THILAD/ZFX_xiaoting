<template>
  <div>
    <!-- <WidgetsNavbar title="ZFX" /> -->
    <div class="navbar" style="background-color: #f2f3f5; width: 100%">
      <v-row style="display: flex; width: 100%; background-color: #f2f3f5">
        <v-col cols="6">
          <img
            src="../../static/images/headerlogo.png"
            style="width: 80px"
            alt=""
          />
        </v-col>
        <v-col cols="6" class="my-auto" align="end">
          <div>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <p color="primary" dark v-bind="attrs" v-on="on">
                  <v-icon color="#0c55a4" size="25">mdi-web</v-icon>
                </p>
              </template>
              <v-list>
                <v-list-item @click="changeLang('en')">
                  <img
                    style="width: 20px"
                    src="../../static/images/united-states-flag-icon.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>English</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeLang('jp')">
                  <img
                    style="width: 20px"
                    src="../../static/images/japan-flag-icon.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>日本語</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeLang('ch')">
                  <img
                    style="width: 20px"
                    src="../../static/images/china-flag-icon.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>中文</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeLang('th')">
                  <img
                    style="width: 20px"
                    src="../../static/images/thailand-flag-icon.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>ภาษาไทย </v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeLang('kr')">
                  <img
                    style="width: 20px"
                    src="../../static/images/south-korea.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>한국어</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeLang('vn')">
                  <img
                    style="width: 20px"
                    src="../../static/images/vietnam-flag-icon.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>tiếng việt</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- <v-btn @click="onLogout">Logout</v-btn> -->
    <center v-if="isLogin == false">
      <v-card
        width="100%"
        height="19vh"
        class="py-7 mt-2"
        dark
        style="
          background-repeat: repeat;
          background-size: cover;
          background-position: bottom;
          background-image: url('https://i.pinimg.com/736x/07/a6/bb/07a6bb442e7889fd360cd8bdfd422b57.jpg');
        "
      >
        <div>
          <h2>{{ $t("welcome") }}</h2>
          <div
            style="
              border: white 1px solid;
              width: fit-content;
              border-radius: 28px;
              margin-top: 5px;
            "
          >
            <v-btn
              @click="openLogin"
              rounded
              color="#FFF"
              style="color: #19309f"
              elevation="0"
              >&nbsp;&nbsp;{{ $t("login") }}&nbsp;&nbsp;</v-btn
            >
            <v-btn
              rounded
              color="#19309f"
              @click="openRegister"
              elevation="0"
              >{{ $t("signup") }}</v-btn
            >
          </div>
        </div>
      </v-card>
    </center>
    <center v-else>
      <v-card width="100%" height="19vh" class="mt-2" dark>
        <v-carousel
          show-arrows="none"
          hide-delimiters
          :show-arrows="false"
          cycle
          interval="4000"
          reverse-transition="fade-transition"
          transition="fade-transition"
          style="height: 100%"
        >
          <v-carousel-item v-for="(item, index) in slides" :key="index"
            ><v-img :src="item"></v-img
          ></v-carousel-item>

          <!-- <v-carousel-item
          ><div>
            <p
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              <v-icon>mdi-volume-medium</v-icon>
              cc
            </p>
          </div></v-carousel-item
        > -->
        </v-carousel>
      </v-card>
    </center>
    <div class="mx-auto" style="width: 100%; height: fit-content">
      <p
        style="
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        "
      >
        <area shape="circle" coords="" href="" alt="" />
      </p>
    </div>
    <div style="width: 100%; height: 3.1vh; margin: 13px 0px">
      <v-carousel
        show-arrows="none"
        hide-delimiters
        :show-arrows="false"
        cycle
        interval="3000"
        v-model="carouselindex"
      >
        <v-carousel-item v-for="(item, index) in carouselItems" :key="index"
          ><div>
            <p
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              <v-icon>mdi-volume-medium</v-icon>
              {{ $t(item) }}
            </p>
          </div></v-carousel-item
        >

        <!-- <v-carousel-item
          ><div>
            <p
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              <v-icon>mdi-volume-medium</v-icon>
              cc
            </p>
          </div></v-carousel-item
        > -->
      </v-carousel>
    </div>

    <!-- <div>
      <v-row justify="space-between">
        <div
          style="background-color: seashell; border-radius: 15px; width: 48%"
        >
          <v-row>
            <v-col cols="12">
              <h3 style="color: #19309f">Fast Buy</h3>
              <p>Open transaction</p>
            </v-col>
          </v-row>
        </div>

        <div
          style="background-color: seashell; border-radius: 15px; width: 48%"
        >
          <v-row>
            <v-col cols="12">
              <h3 style="color: #19309f">Option</h3>
              <p>Start option trading</p>
            </v-col>
          </v-row>
        </div>
      </v-row>
    </div> -->
    <v-card class="py-4">
      <div class="cardMenu">
        <v-row justify="space-between">
          <v-col style="padding: 0" cols="3" align="center">
            <h4 style="font-weight: bold">XAU</h4>
            <h5 style="color: #19309f">{{ XAUUSD.last }}</h5>
            <p :style="{ color: XAUUSD.percent > 0 ? '#4caf50' : '#ff5252' }">
              {{ $formatnumber2(XAUUSD.percent) }}%
            </p>
          </v-col>
          <v-col cols="3" style="padding: 0" align="center">
            <h4 style="font-weight: bold">JPY</h4>
            <h5 style="color: #19309f">{{ USDJPY.last }}</h5>
            <p :style="{ color: USDJPY.percent > 0 ? '#4caf50' : '#ff5252' }">
              {{ $formatnumber2(USDJPY.percent) }}%
            </p>
          </v-col>
          <v-col cols="3" style="padding: 0" align="center">
            <h4 style="font-weight: bold">XAG</h4>
            <h5 style="color: #19309f">{{ XAGUSD.last }}</h5>
            <p :style="{ color: XAGUSD.percent > 0 ? '#4caf50' : '#ff5252' }">
              {{ $formatnumber2(XAGUSD.percent) }}%
            </p>
          </v-col>
          <v-col cols="3" style="padding: 0" align="center">
            <h4 style="font-weight: bold">THB</h4>
            <h5 style="color: #19309f">{{ USDTHB.last }}</h5>
            <p
              :style="{
                color: USDTHB.percent > 0 ? '#4caf50' : '#ff5252',
              }"
            >
              {{ $formatnumber2(USDTHB.percent) }}%
            </p>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <!-- <v-card class="py-4" v-show="isLogin" elevation="0">
      <div class="cardMenu">
        <v-row justify="space-between">
          <v-col cols="4" align="center" @click="router('/Request/Withdraw')">
            <v-icon color="#19309F" size="25">mdi-cash-multiple</v-icon>
            <p style="font-size: 14px !important">Withdraw</p>
          </v-col>
          <v-col cols="4" align="center" @click="router('/Request/Deposit')">
            <v-icon color="#19309F" size="25">mdi-cash-fast</v-icon>
            <p style="font-size: 14px !important">Deposit</p> </v-col
          ><v-col cols="4" align="center">
            <v-icon
              color="#19309F"
              size="x-large"
              @click="openInNewTab('https://direct.lc.chat/15630159/')"
              >mdi-chat</v-icon
            >
            <p>Service</p>
          </v-col>
        </v-row>
      </div>
    </v-card> -->
    <div class="my-3 mb-10">
      <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        align-tabs="center"
        dense
      >
        <v-tab :value="1"><b>Top Gainers</b></v-tab>
        <v-tab :value="2"><b>Top Losers</b></v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item :value="0">
          <v-simple-table width="100%">
            <thead>
              <tr>
                <th class="text-left">{{ $t("pair") }}</th>
                <th class="text-left">{{ $t("lastprices") }}</th>
                <th class="text-left">{{ $t("change") }}%</th>
                <th class="text-left">{{ $t("trade") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in gainerData"
                @click="onSelect(String(item.ticker).substring(2))"
              >
                <td>{{ String(item.ticker).substring(2) }}</td>
                <td>{{ $formatnumber2(item.lastQuote?.a) }}</td>
                <td>
                  <p
                    color="primary"
                    dark
                    elevation="0"
                    small
                    dense
                    style="color: #4caf50"
                  >
                    +{{ $formatnumber2(item.todaysChangePerc) }}%
                  </p>
                </td>
                <td>
                  <v-btn
                    color="#19309F"
                    dark
                    elevation="2"
                    x-small
                    @click="onSelect(String(item.ticker).substring(2))"
                    >{{ $t("trade") }}</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-window-item>
        <v-window-item :value="1">
          <v-simple-table width="100%">
            <thead>
              <tr>
                <th class="text-left">{{ $t("pair") }}</th>
                <th class="text-left">{{ $t("lastprices") }}</th>
                <th class="text-left">{{ $t("change") }}%</th>
                <th class="text-left">{{ $t("trade") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in loserData"
                @click="onSelect(String(item.ticker).substring(2))"
              >
                <td>{{ String(item.ticker).substring(2) }}</td>
                <td>{{ $formatnumber2(item.lastQuote?.a) }}</td>
                <td>
                  <p
                    color="primary"
                    dark
                    elevation="0"
                    small
                    style="color: #ff5252"
                  >
                    {{ $formatnumber2(item.todaysChangePerc) }}%
                  </p>
                </td>
                <td>
                  <v-btn
                    color="#19309F"
                    dark
                    elevation="2"
                    x-small
                    @click="onSelect(String(item.ticker).substring(2))"
                    >{{ $t("trade") }}</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-window-item>
      </v-window>
    </div>
    <AuthenLogin ref="loginPage" v-on:openRegister="openRegister" />
    <AuthenRegister ref="registerPage" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import secureStorage from "~/plugins/secure-storage";

export default {
  data() {
    return {
      tab: null,
      carouselindex: 0,
      slides: [
        require("~/static/images/Slide1.jpg"),
        require("~/static/images/Slide2.jpg"),
        require("~/static/images/Slide3.jpg"),
        require("~/static/images/Slide4.jpg"),
      ],
      hot: [
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
      ],
      carouselItems: ["fslide", "sslide"],
    };
  },
  computed: {
    ...mapGetters("authen", ["userInfo", "isLogin"]),
    ...mapGetters("gianlose", [
      "gainerData",
      "loserData",
      "XAUUSD",
      "USDJPY",
      "XAGUSD",
      "USDTHB",
    ]),
  },
  mounted() {
    this.onCheckLogin();
    this.getGainer();
    this.getLoser();
    this.callMockPair("XAUUSD");
  },
  methods: {
    ...mapActions("authen", ["logout", "checkLogin"]),
    ...mapActions("gianlose", ["getGainer", "getLoser", "getGainerLoserPair"]),
    changeLang(lang) {
      this.$i18n.locale = lang;
      this.$cookies.set("lang", lang);
    },
    async callMockPair(pair) {
      var res;
      try {
        res = await this.getGainerLoserPair(pair);
      } catch (error) {}
    },
    openInNewTab(url) {
      window.open(url, "_blank", "noreferrer");
    },
    router(path) {
      this.$router.push(path);
    },
    onCheckLogin() {
      this.checkLogin();
    },
    onLogout() {
      this.logout();
    },
    openLogin() {
      this.$refs["loginPage"].dialog = true;
    },
    openRegister() {
      this.$refs["registerPage"].dialog = true;
    },
    onSelect(pair) {
      if (this.isLogin == true) {
        secureStorage.setItem("navitab", 2);
        this.$router.push("/Chart/" + pair);
      } else {
        this.$refs["loginPage"].dialog = true;
      }
    },
  },
};
</script>
<style scoped>
.v-btn {
  text-transform: none;
  padding: 0 10px !important;
}
p {
  margin: 0px;
}
.row {
  margin: 0;
}
div.col.col-3 {
  padding: 0px !important;
}
</style>
