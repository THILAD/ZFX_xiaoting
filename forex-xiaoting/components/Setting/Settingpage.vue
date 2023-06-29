<template>
  <div >
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Wallet"
      :title="$t('setting')"
    />
    <div
      class="language"
      style="
        display: flex;
        justify-content: center;
        padding: 12px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 10px;
        height: 70px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      "
    >
      <v-row>
        <v-col cols="6">
          <p style="margin: 19px 10px; font-weight: bold">{{$t('language')}}</p>
        </v-col>
        <v-col cols="6" style="display: flex; justify-content: end">
          <p
            style="
              margin-right: 10px;
              margin-top: 19px;
              color: rgb(147 147 147);
            "
          >
          <div class="text-center" style="margin-top: 19px; margin-right: 20px;">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <p color="primary" dark v-bind="attrs" v-on="on">
                  <v-icon color="rgb(147 147 147)" size="25">mdi-web</v-icon>
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
                <v-list-item>
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
          </p>
        </v-col>
      </v-row>
    </div>
    <div
      class="security"
      style=" padding: 12px;
          width: 100%;
          background-color: #ffffff;
          border-radius: 10px;
          height: 190px;
          margin-top:20px;
          align-items: center;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;"

          
    >
      <v-row >
        <v-col cols="6">
          <p style="margin: 19px 10px; font-weight: bold">{{$t('security')}}</p>
        </v-col>
        <v-col cols="6" style="display: flex; justify-content: end">
          <p
            style="
              margin-right: 10px;
              margin-top: 19px;
              color: rgb(147 147 147);
            "
          >
             &#62;
          </p>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="6">
          <p style="margin: 10px 10px; font-weight: bold">{{$t('currency')}}</p>
        </v-col>
        <v-col cols="6" style="display: flex; justify-content: end">
          <p
            style="
              margin-right: 10px;
              margin-top: 10px;
              color: rgb(147 147 147);
            "
          >
           USD  &#62;
          </p>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="6">
          <p style="margin: 10px 10px; font-weight: bold">{{$t('term')}}</p>
        </v-col>
        <v-col cols="6" style="display: flex; justify-content: end">
          <p
            style="
              margin-right: 10px;
              margin-top: 10px;
              color: rgb(147 147 147);
            "
          >
           &#62;
          </p>
        </v-col>
      </v-row>
    </div>
    <div
      class="trading"
      style=" padding: 12px;
          width: 100%;
          background-color: #ffffff;
          border-radius: 10px;
          height: 132px;
          margin-top:20px;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          
    >
      <v-row >
        <v-col cols="6">
          <p style="margin: 19px 10px; font-weight: bold">{{$t('guild')}}</p>
        </v-col>
        <v-col cols="6" style="display: flex; justify-content: end">
          <p
            style="
              margin-right: 10px;
              margin-top: 19px;
              color: rgb(147 147 147);
            "
          >
             &#62;
          </p>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="10">
          <p style="margin: 10px px; font-weight: bold">{{$t('notifications')}}</p>
        </v-col>
        <v-col cols="2" style="display: flex; justify-content: end">
          <p
            style="
              margin-right: 4px;
              margin-top: 10px;
              color: rgb(147 147 147);
            "
          >
             &#62;
          </p>
        </v-col>
      </v-row>
   
    </div>

    <div
      class="clearchach"
      style=" padding: 12px;
          width: 100%;
          background-color: #ffffff;
          border-radius: 10px;
          height: 142px;
          margin-top:20px;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          
    >
      <v-row >
        <v-col cols="6">
          <p style="margin: 19px 10px; font-weight: bold">{{$t('clearcache')}}</p>
        </v-col>
        <v-col cols="6" style="display: flex; justify-content: end">
          <p
            style="
              margin-right: 10px;
              margin-top: 19px;
              color: rgb(147 147 147);
            "
          >
            0M &#62;
          </p>
        </v-col>
      </v-row>

      <v-row >
        <v-col cols="6">
          <p style="margin: 19px 10px; font-weight: bold">{{$t('appversion')}}</p>
        </v-col>
        <v-col cols="6" style="display: flex; justify-content: end">
          <p
            style="
              margin-right: 10px;
              margin-top: 19px;
              color: rgb(147 147 147);
            "
          >
            ZFX V3.2.5(13) &#62;
          </p>
        </v-col>
      </v-row>
    </div>
    <div
      class="logout"
      style=" padding: 12px;
          width: 100%;
          background-color: #ffffff;
          border-radius: 10px;
          height: 70px;
          margin-top:20px;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          
    >
    

      <v-row @click="onLogout">
        <v-col cols="12" style="display: flex; justify-content: center;">
          <p style=" margin-top: 10px; font-weight: bold">{{$t('logout')}}</p>
        </v-col>
     
      </v-row>
    </div>
    <!-- <v-list-item-group v-model="selectedItem" color="white">
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="#fffffff">mdi-back</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: black; font-weight: bold"
            >Language</v-list-item-title
          >
          <v-icon color="#fffffff">mdi-back</v-icon>
        </v-list-item-content>
        <v-list-item-content align="end">
          <v-list-item-title style="color: #19309f">English</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="#19309f">mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: black; font-weight: bold"
            >Currency</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-content align="end">
          <v-list-item-title style="color: #19309f">USD</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="#19309f">mdi-brightness-4</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: black; font-weight: bold"
            >Theme</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-content align="end">
          <v-list-item-title style="color: #19309f">Light</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="#19309f">mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: black; font-weight: bold"
            >About us</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="onLogout">
        <v-list-item-icon>
          <v-icon color="error">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="color: red; font-weight: bold"
            >Logout</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      selectedItem: 0,
    };
  },
  methods: {
    ...mapActions("authen", ["logout"]),
    changeLang(lang) {
      this.$i18n.locale = lang;
      this.$cookies.set("lang", lang);
    },
    onLogout() {
      this.logout();
      this.$router.push("/");
    },
  },
};
</script>
