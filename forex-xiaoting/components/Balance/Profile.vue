<template>
  <div>
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Wallet"
      :title="$t('profile')"
    />
    <WidgetsLoading v-if="loading == true" />
    <div v-else>
      <div align="center" style="margin-top: 35px">
        <div style="position: relative">
          <input
            type="file"
            :id="'uploadImageProfileAvatar' + inputImageId"
            accept="image/*"
            @input="updateValue"
            ref="file"
            class="button-10"
            role="button"
            hidden
          />
          <label :for="'uploadImageProfileAvatar' + inputImageId" class="label">
            <v-img
              alt="Avatar"
              crossorigin="anonymous"
              :width="140"
              :height="140"
              :src="'data:image/png;base64,' + myAvatar"
              style="border-radius: 100%; z-index: 1"
              ><div
                style="
                  position: absolute;
                  z-index: 999;
                  bottom: 0;
                  right: 20%;
                  background-color: #19309f;
                  border-radius: 100%;
                  padding: 5px;
                  width: fit-content;
                "
              >
                <v-icon size="30" color="white">mdi-camera</v-icon>
              </div></v-img
            >
          </label>
        </div>
        <h3 style="margin: 10px">{{ myInfo?.user?.fullname }}</h3>
      </div>
      <v-container>
        <div class="my-8" style="border-bottom: 1px">
          <v-row>
            <v-col cols="6"
              ><h4>{{ $t("username") }}</h4></v-col
            >
            <v-col cols="6" align="end">{{ myInfo?.user?.email }}</v-col>
          </v-row>
        </div>
        <div class="my-8" style="border-bottom: 1px">
          <v-row>
            <v-col cols="6"
              ><h4>{{ $t("createAt") }}</h4></v-col
            >
            <v-col cols="6" align="end">{{
              $formatdate(myInfo?.user?.createdAt)
            }}</v-col>
          </v-row>
        </div>

        <!-- <div class="my-8">
          <v-row>
            <v-col cols="6"
              ><h4>{{ $t("verify") }}</h4></v-col
            >
            <v-col
              cols="6"
              align="end"
              @click="
                routeTo(
                  `/Verify/Form/${myInfo?.user?.isVerified?.status}`,
                  myInfo?.user?.isVerified?.status
                )
              "
              ><p>
                <span
                  :style="{
                    color:
                      myInfo?.user?.isVerified?.status === 'idle'
                        ? 'red'
                        : 'black',
                  }"
                >
                  {{
                    myInfo?.user?.isVerified?.status === "idle"
                      ? "Please verify"
                      : myInfo?.user?.isVerified?.status || "Fail"
                  }}
                </span>
                <v-icon
                  size="20"
                  :color="
                    myInfo?.user?.isVerified?.status === 'idle'
                      ? 'error'
                      : myInfo?.user?.isVerified?.status === 'pending'
                      ? 'orange'
                      : myInfo?.user?.isVerified?.status === 'approved'
                      ? 'success'
                      : myInfo?.user?.isVerified?.status === 'rejected'
                      ? 'error'
                      : 'error'
                  "
                  >mdi-account-alert-outline</v-icon
                >
                &#62;
              </p>
            </v-col>
          </v-row>
        </div> -->
      </v-container>
    </div>
    <div class="bottom-img">
      <img
        src="/images/bottom-abstract.png"
        width="100%"
        style="
          position: fixed;
          bottom: 0;
          transform: scale(2);
          max-height: 80px;
        "
        alt=""
      />
    </div>
    <!--     
    <NuxtLink to="/Verify/" style="text-decoration: none; color: inherit">
      <div
        style="background-color: #00bfa5; color: white; border-radius: 10px"
        class="my-3"
      >
        <v-row>
          <v-col align="right" cols="4">
            <v-avatar size="70px">
              <img
                alt="Avatar"
                crossorigin="anonymous"
                :src="path + '/image/avatar/' + userInfo?.avatar"
              />
            </v-avatar>
          </v-col>
          <v-col cols="6" class="my-auto">
            <h5>{{ userInfo?.fullName }}</h5>
            <h5>Balance : {{ BalanceInfo?.balance }} USD</h5>
          </v-col>

          <v-col cols="2" class="my-auto">
            <v-icon class="">mdi-chevron-right</v-icon>
          </v-col>
        </v-row>
      </div>
    </NuxtLink>
    <div style="background-color: #00bfa5; border-radius: 10px" class="my-8">
      <NuxtLink
        to="/Balance/History"
        style="text-decoration: none; color: inherit"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Transaction</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </NuxtLink>
      <NuxtLink
        to="/Balance/Myrequest"
        style="text-decoration: none; color: inherit"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>My Request</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </NuxtLink>
      <NuxtLink
        to="/Balance/Deposit"
        style="text-decoration: none; color: inherit"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Deposit Balance</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </NuxtLink>
      <NuxtLink
        to="/Balance/Withdraw"
        style="text-decoration: none; color: inherit"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Withdraw Balance</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </NuxtLink>
      <NuxtLink to="/Problem/" style="text-decoration: none; color: inherit">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Problem</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </NuxtLink>
    </div>

    <NuxtLink to="/" style="text-decoration: none; color: inherit">
      <v-btn
        v-if="isLogin == true"
        block
        style="margin-bottom: 8.5vh"
        color="red"
        dark
        @click="onLogout"
        >Logout</v-btn
      >
    </NuxtLink> -->
  </div>
</template>
<script>
import encBase64 from "crypto-js/enc-base64";
import { mapActions, mapGetters } from "vuex";
import secureStorage from "../../plugins/secure-storage";

export default {
  middleware: "checkAuth",
  data() {
    return {
      userInfo: null,
      path: null,
      avatar: { image: undefined, input: undefined, imageFile: "" },
      myInfo: null,
      myAvatars: null,
      inputImageId: 0,
      loading: false,
    };
  },
  computed: {
    ...mapGetters("profile", ["isLoading", "myAvatar"]),
  },
  mounted() {
    this.loading = true;
    this.path = process.env.BASE_URL;

    this.getMyinfo().then((data) => {
      this.myInfo = data;
      this.myAvatars = localStorage.getItem("myAvatars");
    });
    this.loading = false;
  },
  methods: {
    ...mapActions("profile", ["getMyinfo", "uploadProfile"]),
    getinputImageId() {
      const randomNumber = Math.floor(Math.random() * 900) + 100;
      this.inputImageId = randomNumber;
    },
    async updateValue(event) {
      this.avatar.imageFile = event.target.files[0];

      this.$emit("input", this.avatar.imageFile);
      var res;
      var fd = new FormData();
      if (
        this.avatar.imageFile == undefined ||
        this.avatar.imageFile == null ||
        this.avatar.imageFile == ""
      ) {
        this.avatar.imageFile = "";
        fd.append("image", this.avatar.imageFile);
      } else {
        fd.append("image", this.avatar.imageFile, this.avatar.imageFile.name);
      }
      try {
        res = await this.uploadProfile(fd);
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
        } else {
          this.loading = true;

          await this.getMyinfo()
            .then((data) => {
              this.myInfo = data;
              this.myAvatars = localStorage.getItem("myAvatar");
              window.location.reload();
            })
            .finally(() => {
              this.loading = false;
            });
          this.getinputImageId();
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
    routeTo(path, stt) {
      if (stt !== "approved") {
        this.$router.push(path);
      }
    },
  },
};
</script>
<style scoped>
@media (min-width: 768px) {
  .bottom-img {
    display: none;
  }
}
</style>
