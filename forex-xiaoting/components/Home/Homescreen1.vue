<template>
  <div>
    <!-- <WidgetsNavbar title="ATFX"/> -->
    <div class="navbar" style="background-color: #f2f3f5; width: 100%">
      <v-row style="display: flex; width: 100%; background-color: #f2f3f5">
        <v-col cols="6">
          <img
            src="../../static/images/headerlogo.png"
            style="width: 80px"
            alt=""
          />
        </v-col>
        <v-col cols="6" style="display: flex; justify-content: end;">
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <p color="primary" dark v-bind="attrs" v-on="on">
                  <v-icon color="#0c55a4" size="25">mdi-web</v-icon>
                </p>
              </template>
              <v-list>
                <v-list-item>
                
                  <img
                    style="width: 20px"
                    src="../../static/images/united-states-flag-icon.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>English</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <img
                    style="width: 20px"
                    src="../../static/images/japan-flag-icon.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>日本語</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <img
                    style="width: 20px"
                    src="../../static/images/china-flag-icon.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>中文</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <img
                    style="width: 20px"
                    src="../../static/images/thailand-flag-icon.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>ภาษาไทย </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <img
                    style="width: 20px"
                    src="../../static/images/south-korea.png"
                    alt=""
                  />&nbsp;
                  <v-list-item-title>한국어</v-list-item-title>
                </v-list-item>
                <v-list-item>
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
          <h2>Welcome to ATFX</h2>
          <div
            style="
              border: white 1px solid;
              width: fit-content;
              border-radius: 28px;
              /* margin-top: 5px; */
            "
          >
            <v-btn
              @click="openLogin"
              rounded
              color="#FFF"
              style="color: #19309f"
              elevation="0"
              >&nbsp;&nbsp;Login&nbsp;&nbsp;</v-btn
            >
            <v-btn rounded color="#19309f" @click="openRegister" elevation="0"
              >Sign up</v-btn
            >
          </div>
        </div>
      </v-card>
    </center>
    <center v-else>
      <v-card
        width="100%"
        height="15vh"
        class="py-10 mt-2"
        dark
        style="
          background-image: url('https://i.pinimg.com/736x/07/a6/bb/07a6bb442e7889fd360cd8bdfd422b57.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: bottom;
        "
      >
        <div>
          <h3>Welcome to ATFX</h3>
        </div>
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
        interval="1000"
        v-model="carouselindex"
      >
        <v-carousel-item v-for="(item, index) in carouselItems" :key="index">
          <div>
            <p
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              <v-icon>mdi-volume-medium</v-icon>
              {{ item }}
            </p>
          </div>
        </v-carousel-item>

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
    <v-card class="py-4" v-show="isLogin">
      <div class="cardMenu">
        <v-row justify="space-between">
          <v-col
            style="padding: 0"
            cols="3"
            align="center"
            @click="router('/Request/Withdraw')"
          >
            <h4 style="font-weight: bold">XAU</h4>
            <h5 style="color: green">1992.78</h5>
            <p style="color: green">+0.35%</p>
          </v-col>
          <v-col cols="3" style="padding: 0" align="center">
            <h4 style="font-weight: bold">JPY</h4>
            <h5 style="color: red">134.78</h5>
            <p style="color: red">-1.35%</p>
          </v-col>
          <v-col
            cols="3"
            style="padding: 0"
            align="center"
            @click="router('/Request/Deposit')"
          >
            <h4 style="font-weight: bold">XAG</h4>
            <h5 style="color: green">24.78</h5>
            <p style="color: green">+1.35%</p>
          </v-col>
          <v-col cols="3" style="padding: 0" align="center">
            <h4 style="font-weight: bold">THB</h4>
            <h5 style="color: red">34.78</h5>
            <p style="color: red">-0.35%</p>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <!-- <v-card class="py-4" v-show="isLogin">
      <div class="cardMenu">
        <v-row justify="space-between">
          <v-col cols="3" align="center" @click="router('/Request/Withdraw')">
            <v-icon color="#19309F" size="25">mdi-cash-multiple</v-icon>
            <p style="font-size: 14px !important">Withdraw</p>
          </v-col>
          <v-col cols="3" align="center" @click="router('/Request/Deposit')">
            <v-icon color="#19309F" size="25">mdi-cash-fast</v-icon>
            <p style="font-size: 14px !important">Deposit</p> </v-col
          ><v-col cols="3" align="center">
            <v-icon color="#19309F" size="25">mdi-wallet</v-icon>
            <p style="font-size: 14px !important">Balance</p> </v-col
          ><v-col cols="3" align="center">
            <v-icon color="#19309F" size="25" @click="router('/Ticket')"
              >mdi-chat</v-icon
            >
            <p style="font-size: 14px !important">Ticket</p>
          </v-col>
        </v-row>
      </div>
    </v-card> -->
    <div class="my-3">
      <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        align-tabs="center"
        dense
      >
        <v-tab :value="1"><b>Hot</b></v-tab>
        <v-tab :value="2"><b>Top Gainers</b></v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item :value="0">
          <v-simple-table width="100%">
            <thead>
              <tr>
                <th class="text-left">Pair</th>
                <th class="text-left">Last Price</th>
                <th class="text-left">Change %</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in hot">
                <td>{{ item.pair }}</td>
                <td>{{ item.last }}</td>
                <td>
                  <v-btn color="primary" dark elevation="0" small dense
                    >{{ item.change }}%</v-btn
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
                <th class="text-left">Pair</th>
                <th class="text-left">Last Price</th>
                <th class="text-left">Change %</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in hot">
                <td>{{ item.pair }}</td>
                <td>{{ item.last }}</td>
                <td>
                  <v-btn color="primary" dark elevation="0" small dense
                    >{{ item.change }}%</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-window-item>
      </v-window>
    </div>
    <AuthenLogin ref="loginPage" />
    <AuthenRegister ref="registerPage" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      tab: null,
      carouselindex: 0,
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      hot: [
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
        { pair: "USDUSD", last: 12, change: 12 },
      ],
      carouselItems: [
        'Additional allocation of USD $10 million for the "Penetrating New Market Globally"',
        "Fintoch Team Service Expansion Announcement",
      ],
    };
  },
  computed: {
    ...mapGetters("authen", ["userInfo", "isLogin"]),
  },
  mounted() {
    this.onCheckLogin();
  },
  methods: {
    ...mapActions("authen", ["logout", "checkLogin"]),

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
