<template>
  <div>
    <!-- <WidgetsNavbar RouteTo="/Wallet" title="Transaction" /> -->
    <v-container>
      <h4 class="my-1">{{ title }}</h4>
      <v-divider class="my-1"></v-divider>
      <WidgetsLoading v-if="isLoading == true" />

      <div v-else>
        <div>
          <vue-loadmore
            :on-refresh="onRefresh"
            :on-loadmore="onLoad"
            :finished="finished"
            :error.sync="error"
          >
            <WidgetsEmpty v-if="isEmpty == true" />
            <v-card
              v-else
              v-for="(item, i) of stateHistories"
              :key="i"
              style="
                border-left: 3px solid #19309f;
                margin: 10px 0px;
                padding: 5px 10px;
              "
            >
              <div style="display: flex; justify-content: space-between">
                <div>
                  <h5>Fullname : {{ item.owner.fullname }}</h5>
                  <h6>Transaction : {{ item.type }}</h6>
                  <h6>Date : {{ $FormatDateTime(item.updatedAt) }}</h6>
                </div>
                <div class="my-auto">
                  <h4
                    :style="{ color: item.status == 'in' ? '#4caf50' : 'red' }"
                  >
                    <v-icon
                      v-if="item.status == 'in'"
                      :color="item.status == 'in' ? 'success' : 'error'"
                      >mdi-menu-up</v-icon
                    >
                    <v-icon
                      v-else
                      :color="item.status == 'in' ? 'success' : 'error'"
                      >mdi-menu-down</v-icon
                    >
                    {{ item.amount }}
                  </h4>
                </div>
              </div>
            </v-card>
          </vue-loadmore>
        </div>
      </div>
    </v-container>
  </div>
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
    ...mapGetters("wallet", [
      "stateHistories",
      "isEndPage",
      "isLoading",
      "isEmpty",
    ]),
  },
  mounted() {
    this.fetch();
  },
  methods: {
    ...mapActions("wallet", ["getHistory"]),

    async onRefresh(done) {
      this.list = [];
      this.page = 1;
      this.finished = false;
      await this.fetch()
        .then(() => done())
        .catch(() => done());
    },

    async onLoad(done) {
      if (!this.isEndPage) {
        await this.fetch()
          .then(() => done())
          .catch(() => done());
      } else {
        // all data loaded
        this.finished = true;
      }
    },

    async fetch() {
      var res;
      var data = {
        page: this.page,
        showType: this.showType,
      };
      try {
        res = await this.getHistory(data);
      } catch (error) {
        this.error = true;
      }
      this.page++;
    },
  },
};
</script>
