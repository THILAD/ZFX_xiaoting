<template>
  <div style="margin-top: 57px">
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Wallet"
      :title="$t('transaction')"
    />
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
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item :value="0">
            <div class="history">
              <!-- Deposit -->
              <p>{{ $t("history") }} {{ $t("deposit") }}</p>
            </div>
            <vue-loadmore :on-refresh="onRefreshDeposit">
              <div>
                <v-row
                  style="
                    margin: 0 0 5px 0;
                    background-color: #ffffff;
                    font-size: 14px;
                  "
                  v-for="(item, index) in stateDeposit"
                  :key="'deposit' + index"
                >
                  <v-col align-start cols="6">
                    <div style="padding: 20px">
                      <h4 style="color: #4caf50; font-weight: bold">
                        +{{ $formatnumber(item.amount) }} USD
                      </h4>
                      <p style="font-size: 12px; color: #888888">
                        {{ $FormatDateTime(item.updatedAt) }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div style="text-align: center; padding: 20px">
                      <span style="color: #4caf50"> {{ $t("approved") }}</span>
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
              <div>
                <v-row
                  style="
                    background-color: #ffffff;
                    font-size: 14px;
                    margin: 0 0 5px 0;
                  "
                  v-for="(item, index) in stateWithdraw"
                  :key="'withdraw' + index"
                >
                  <v-col cols="6">
                    <div style="padding: 20px">
                      <h4 style="color: #ff5252; font-weight: bold">
                        -{{ $formatnumber(item.amount) }} USD
                      </h4>
                      <p style="font-size: 12px; color: #888888">
                        {{ $FormatDateTime(item.updatedAt) }}
                      </p>
                    </div>
                  </v-col>
                  <v-col
                    cols="6"
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <div>
                      <span
                        v-if="item.status == 'approved'"
                        style="color: #4caf50"
                      >
                        {{ $t("approved") }}</span
                      >
                      <span    v-if="item.status == 'pending'" style="color: #ff9966">
                        {{ $t("pending") }}</span
                      >
                      <span    v-if="item.status == 'rejected'" style="color: #F24C3D">
                        {{ $t("rejected") }}</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </div>
            </vue-loadmore>
          </v-window-item>
        </v-window>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  middleware: "checkAuth",
  data() {
    return {
      tab: 0,
    };
  },
  mounted() {
    this.checkLogin();
    this.getHistoryWithdraw();
    this.getHistoryDeposit();
  },
  computed: {
    ...mapGetters("wallet", ["stateBet", "stateDeposit", "stateWithdraw"]),
  },
  methods: {
    ...mapActions("authen", ["checkLogin"]),

    ...mapActions("wallet", [
      "getHistoryWithdraw",
      "getHistoryBet",
      "getHistoryDeposit",
    ]),
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
