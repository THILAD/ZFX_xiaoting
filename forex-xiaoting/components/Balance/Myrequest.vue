<template>
  <v-container>
    <!-- <WidgetsNavbar RouteTo="/Wallet" title="My Request" /> -->
    <h4>{{ title }}</h4>
    <v-divider class="my-4"></v-divider>
    <WidgetsLoading
      v-if="isLoading == true"
      RouteTo="/Balance/"
      title="Deposit"
    />
    <div v-else>
      <div>
        <vue-loadmore
          :on-refresh="onRefresh"
          :on-loadmore="onLoad"
          :finished="finished"
          :error.sync="error"
        >
          <v-card
            v-for="(item, i) of stateMyrequests"
            :key="i"
            style="
              border-left: 3px solid #19309f;
              margin: 10px 0px;
              padding: 5px 10px;
            "
          >
            <div style="display: flex; justify-content: space-between">
              <div>
                <h5>
                  Status :
                  <span
                    :style="{
                      color: item.isSuccess == true ? '#4caf50' : 'orange',
                    }"
                    >{{ item.isSuccess == true ? "Success" : "Pending" }}</span
                  >
                </h5>
                <h6>Transaction : {{ item.type }}</h6>
                <h6>Date : {{ $FormatDateTime(item.createdAt) }}</h6>
              </div>
              <div style="margin-top: 3%">
                <h4
                  :style="{ color: item.type == 'deposit' ? 'success' : 'red' }"
                >
                  <v-icon
                    v-if="item.type == 'deposit'"
                    :color="item.type == 'deposit' ? 'success' : 'error'"
                    >mdi-menu-up</v-icon
                  >
                  <v-icon
                    v-else
                    :color="item.type == 'deposit' ? 'success' : 'error'"
                    >mdi-menu-down</v-icon
                  >
                  {{ item.amount }}
                </h4>
              </div>
            </div>
          </v-card>
          <!-- <v-card v-for="(item, i) of stateMyrequests" :key="i">
            <div
              style="display: flex; justify-content: space-between"
              class="my-2"
            >
              <div class="py-3 px-3">
                <h5>Fullname : {{ item.owner.fullName }}</h5>
                <h6>Transaction : {{ item.type }}</h6>
                <h6>Date : {{ $FormatDateTime(item.createdAt) }}</h6>
              </div>
              <div class="py-3 px-3">
                <h4
                  class="my-3"
                  :style="{
                    color: item.type == 'deposit' ? '#4caf50' : 'red',
                  }"
                >
                  <v-icon
                    v-if="item.type == 'deposit'"
                    :color="item.type == 'deposit' ? 'success' : 'error'"
                    >mdi-menu-up</v-icon
                  >
                  <v-icon
                    v-else
                    :color="item.type == 'deposit' ? 'success' : 'error'"
                    >mdi-menu-down</v-icon
                  >
                  {{ item.amount }}
                </h4>
              </div>
              <div
                :style="{
                  backgroundColor:
                    item.isSuccess == true ? '#4caf50' : 'orange',
                }"
                class="py-3 px-3"
              >
                <div class="my-3">
                  <v-icon color="white " v-if="item.isSuccess == false"
                    >mdi-update</v-icon
                  >
                  <v-icon color="white " v-else>mdi-check</v-icon>
                </div>
              </div>
            </div>
          </v-card> -->
        </vue-loadmore>
      </div>
    </div>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  middleware: "checkAuth",
  props: {
    showType: String,
    title: String,
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 30,
      finished: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters("myrequest", ["stateMyrequests", "isEndPage", "isLoading"]),
  },
  mounted() {
    this.fetch();
  },
  methods: {
    ...mapActions("myrequest", ["myRequest"]),
    async onRefresh(done) {
      this.list = [];
      this.page = 1;
      this.finished = false;
      await this.fetch().then(() => done());
    },

    async onLoad(done) {
      if (!this.isEndPage) {
        await this.fetch().then(() => done());
      } else {
        // all data loaded
        this.finished = true;
      }
    },

    async fetch(item) {
      var data;
      if (item) {
        data = item;
      } else {
        data = {
          page: this.page,
          showType: this.showType,
        };
      }
      var res;

      try {
        res = await this.myRequest(data);
      } catch (error) {
        this.error = true;
      }
      this.page++;
    },
  },
};
</script>
