<template>
  <div style="margin-top: 66px; margin-bottom: 40px">
    <!-- Appbar -->
    <div>
      <v-app-bar style="background-color: white" app density="compact">
        <v-row>
          <v-col cols="2" align="center">
            <!-- <v-app-bar-nav-icon @click="router('/Profile')"
              ><v-icon color="#19309F">mdi-account</v-icon></v-app-bar-nav-icon
            > -->
          </v-col>
          <v-col cols="8" align="center" class="my-auto">
            <h3 style="color: #19309f">{{ $t("setting") }}</h3>
          </v-col>
          <v-col cols="2" align="center" class="my-auto">
            <v-img
              @click="openInNewTab('https://direct.lc.chat/15630159/')"
              max-height="25"
              max-width="25"
              src="/customerSupport.png"
            ></v-img>
            <!-- <v-app-bar-nav-icon
              ><v-icon
                @click="openInNewTab('https://direct.lc.chat/15630159/')"
                color="#19309F"
                >mdi-headset</v-icon
              ></v-app-bar-nav-icon
            > -->
          </v-col>
        </v-row>
      </v-app-bar>
    </div>
    <!-- End Appbar -->
    <v-skeleton-loader
      v-if="loading"
      type="list-item-avatar-three-line, image, article,article"
    ></v-skeleton-loader>
    <div v-else>
      <!-- Profile -->
      <div>
        <v-card
          ><div>
            <v-container @click="router('/Profile')">
              <v-row>
                <v-col cols="3"
                  ><v-img
                    alt="Avatar"
                    crossorigin="anonymous"
                    v-if="myAvatar != null"
                    :src="'data:image/png;base64,' + myAvatar"
                    style="
                      border-radius: 3%;
                      z-index: 1;
                      width: 100%;
                      max-width: 50px;
                    "
                  ></v-img
                  ><v-img
                    alt="Avatar"
                    crossorigin="anonymous"
                    v-else
                    src="/profile.jpeg"
                    style="
                      border-radius: 3%;
                      z-index: 1;
                      width: 100%;
                      max-width: 50px;
                    "
                  ></v-img
                ></v-col>
                <v-col class="px-0" cols="7"
                  ><h4>
                    {{ myInfo?.user?.fullname }}
                    <span
                      style="
                        font-size: 9px;
                        padding: 2px 6px;
                        background: linear-gradient(to right, #705bfa, #df97fb);
                        color: white;
                        border-radius: 15px;
                      "
                      >{{ myInfo?.user?.vip }}</span
                    >
                  </h4>

                  <v-icon
                    size="20"
                    :color="
                      myInfo?.user?.isVerified?.status == 'approved'
                        ? 'success'
                        : 'grey'
                    "
                    >mdi-check-decagram</v-icon
                  >
                  <span>{{
                    myInfo?.user?.isVerified?.status == "approved"
                      ? "Verified"
                      : "Unverified"
                  }}</span>
                </v-col>
                <v-col cols="2" align="center" class="my-auto"
                  ><v-icon size="30">mdi-chevron-right</v-icon></v-col
                >
              </v-row></v-container
            >
          </div>
          <v-card
            style="background-color: #fdedec; border: #f5b7b1 1px solid"
            v-if="myInfo?.user?.isVerified?.status !== 'approved'"
            ><v-container v-if="myInfo?.user?.isVerified?.status == 'pending'"
              ><p
                style="
                  font-size: 10px;
                  font-weight: bold;
                  color: #fb8c00;

                  margin: 0;
                "
              >
                <v-icon color="warning">mdi-clock-outline</v-icon>
                {{ $t("checkingVerify") }}
                <v-btn
                  rounded
                  class="pa-0 px-1"
                  elevation="0"
                  x-small
                  dark
                  color="warning"
                  >{{ $t("pending") }}</v-btn
                >
              </p></v-container
            ><v-container v-if="myInfo?.user?.isVerified?.status == 'rejected'"
              ><p style="font-size: 10px; font-weight: bold; color: #e74c3c">
                <v-icon color="error">mdi-alert-decagram-outline</v-icon>
                {{ $t("verifyReject") }}
                <v-btn
                  rounded
                  class="pa-0 px-1"
                  elevation="0"
                  x-small
                  dark
                  color="error"
                  >{{ $t("rejected") }}</v-btn
                >
              </p>
              <p style="font-size: 10px; color: #e74c3c">
                {{ myInfo?.verification?.admin?.message }}
              </p>
              <v-container
                ><v-row
                  ><v-col cols="12" align="right" class="ma-0 pa-0"
                    ><v-btn
                      @click="
                        routeToVerify(
                          `/Verify/Form/${myInfo?.user?.isVerified?.status}`,
                          myInfo?.user?.isVerified?.status
                        )
                      "
                      style="
                        background-color: #fadbd8;
                        color: #ff2929;
                        font-weight: bolder !important;
                      "
                      elevation="0"
                      small
                      >{{ $t("tryAgain") }}</v-btn
                    ></v-col
                  ></v-row
                ></v-container
              >
            </v-container>
            <v-container v-if="myInfo?.user?.isVerified?.status == 'idle'"
              ><p style="font-size: 10px; font-weight: bold; color: #e74c3c">
                <v-icon color="error">mdi-alert-decagram-outline</v-icon>
                {{ $t("pleaseVerify") }}
                <v-btn
                  rounded
                  class="pa-0 px-1"
                  elevation="0"
                  x-small
                  dark
                  color="error"
                  >{{ $t("notVerify") }}</v-btn
                >
              </p>
              <v-container
                ><v-row
                  ><v-col cols="12" align="right" class="ma-0 pa-0"
                    ><v-btn
                      style="
                        background-color: #fadbd8;
                        color: #ff2929;
                        font-weight: bolder !important;
                      "
                      elevation="0"
                      small
                      @click="
                        routeToVerify(
                          `/Verify/Form/${myInfo?.user?.isVerified?.status}`,
                          myInfo?.user?.isVerified?.status
                        )
                      "
                      >{{ $t("goVerify") }}</v-btn
                    ></v-col
                  ></v-row
                ></v-container
              >
            </v-container></v-card
          ></v-card
        >
      </div>
      <!-- End Profile -->
      <!-- Balance -->
      <div class="my-2">
        <v-card elevation="1">
          <v-card
            style="
              background-image: linear-gradient(to right, #19309f 13%, white);
            "
            elevation="0"
          >
            <v-container
              ><h4 style="color: rgb(246, 244, 244)">
                {{ $t("totalbalance") }}[USD]
              </h4>
              <h2 style="color: white">
                {{ $formatnumber(BalanceInfo?.balance) || 0 }} USD
              </h2>
            </v-container>
            <v-container>
              <v-row>
                <v-col class="py-0 pb-3"
                  ><v-btn
                    block
                    elevation="0"
                    style="color: #19309f"
                    @click="onClickWithdraw('/Request/Withdraw')"
                    ><b>{{ $t("withdraw") }}</b></v-btn
                  ></v-col
                >
                <v-col class="py-0 pb-3"
                  ><v-btn
                    block
                    elevation="0"
                    dark
                    color="#19309f"
                    @click="openInNewTab('https://direct.lc.chat/15630159/')"
                    ><b>{{ $t("deposit") }}</b></v-btn
                  ></v-col
                ></v-row
              >
            </v-container>
          </v-card>
          <v-list>
            <v-list-item @click="router('/Tradehistory')">
              <v-icon color="#19309f">mdi-swap-horizontal-bold</v-icon>&nbsp;
              <v-list-item-title>{{ $t("tradehistory") }}</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="router('/Transaction')">
              <v-icon color="#19309f">mdi-text-box-check</v-icon>&nbsp;
              <v-list-item-title>{{ $t("transaction") }}</v-list-item-title
              ><v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item></v-list
          >
        </v-card>
      </div>
      <!-- End Balance -->
      <div>
        <v-card>
          <v-list>
            <v-list-item>
              <v-icon color="#19309f">mdi-earth</v-icon>&nbsp;
              <v-list-item-title>{{ $t("language") }}</v-list-item-title>

              <div>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <p color="primary" dark v-bind="attrs" v-on="on">
                      <v-icon color="rgb(147 147 147)" size="25"
                        >mdi-web</v-icon
                      >
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
            </v-list-item>
            <v-list-item @click="router('/Security')">
              <v-icon color="#19309f">mdi-shield-account</v-icon>&nbsp;
              <v-list-item-title>{{ $t("security") }}</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon></v-list-item-icon
              >
            </v-list-item>
            <v-list-item @click="router('/Setting/notification')">
              <v-icon color="#19309f">mdi-bell-outline</v-icon>&nbsp;
              <v-list-item-title>{{ $t("notifications") }}</v-list-item-title
              ><v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="router('/Setting/help')">
              <v-icon color="#19309f">mdi-frequently-asked-questions</v-icon
              >&nbsp;
              <v-list-item-title>{{ $t("helpCenter") }} (FAQ)</v-list-item-title
              ><v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="router('/Setting/term')">
              <v-icon color="#19309f">mdi-bookmark-multiple-outline</v-icon
              >&nbsp; <v-list-item-title>{{ $t("term") }}</v-list-item-title
              ><v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="router('/Setting/about')">
              <v-icon color="#19309f">mdi-information-outline</v-icon>&nbsp;
              <v-list-item-title>{{ $t("about") }}</v-list-item-title
              ><v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-icon color="#19309f">mdi-cached</v-icon>&nbsp;
              <v-list-item-title>{{ $t("clearcache") }}</v-list-item-title>
              0M<v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-icon color="#19309f">mdi-monitor-cellphone</v-icon>&nbsp;
              <v-list-item-title>{{ $t("appversion") }}</v-list-item-title>
              <p class="my-auto" style="font-size: 9px">ZFXV3.2.5(13)</p>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
      <!-- Logout -->
      <div class="my-2">
        <v-card align="center" color="error" dark @click="onLogout()"
          ><v-container>{{ $t("logout") }}</v-container></v-card
        >
      </div>
      <!-- End Logout -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import secureStorage from "../../plugins/secure-storage";

export default {
  data() {
    return {
      loading: false,
      myInfo: null,
      myAvatar: null,
    };
  },
  mounted() {
    this.checkLogin();
    this.getInfo();
    this.myBalance();
  },
  computed: {
    ...mapGetters("balance", ["BalanceInfo"]),
  },
  methods: {
    ...mapActions("profile", ["getMyinfo"]),
    ...mapActions("balance", ["myBalance"]),
    ...mapActions("authen", ["checkLogin", "logout"]),
    async getInfo() {
      this.loading = true;
      await this.getMyinfo()
        .then((data) => {
          this.myInfo = data;
          this.myAvatar = localStorage.getItem("myAvatar");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onClickWithdraw(path) {
      if (this.myInfo?.user?.passcode == null) {
        this.$router.push("/setpasscode");
        this.$swal({
          toast: true,
          text: this.$t("pleaseSetPasscode"),
          iconColor: "red",
          icon: "error",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      } else if (this.myInfo?.user?.isVerified?.status === "approved") {
        this.$router.push(path);
      } else {
        this.$swal({
          toast: true,
          text: this.$t("pleaseVerify"),
          iconColor: "red",
          icon: "error",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      }
    },
    router(path) {
      this.$router.push(path);
    },
    onLogout() {
      this.logout();
      this.$router.push("/");
    },
    changeLang(lang) {
      this.$i18n.locale = lang;
      this.$cookies.set("lang", lang);
    },
    openInNewTab(url) {
      window.open(url, "_blank", "noreferrer");
    },
    routeToVerify(path, stt) {
      if (stt !== "approved") {
        this.$router.push(path);
      }
    },
  },
};
</script>
