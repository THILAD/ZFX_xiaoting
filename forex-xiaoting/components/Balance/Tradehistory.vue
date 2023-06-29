<template>
  <div style="margin-top: 57px">
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Wallet"
      :title="$t('tradehistory')"
    />
    <vue-loadmore :on-refresh="onRefreshPosition">
      <div
        style="background-color: #888888"
        v-for="(item, index) in stateBet"
        :key="'bet' + index"
      >
        <!-- Position -->
        <v-row
          style="
            background-color: #ffffff;

            font-size: 14px;
            margin: 0 0 5px 0;
          "
        >
          <v-col align-start cols="6">
            <div class="in-itemposition" style="padding: 20px">
              <div class="flex" style="display: flex">
                <h3 style="font-weight: bold; font-size: 16px; color: #212121">
                  {{ item.bet.substring(2) }}
                </h3>
                &nbsp;&nbsp;
                <h4
                  v-if="item.type == 'long'"
                  style="color: #4caf50; font-weight: bold; font-size: 12px"
                >
                  Buy {{ item.amount }}
                </h4>
                <h4
                  v-else
                  style="color: #ff5252; font-weight: bold; font-size: 12px"
                >
                  Sell
                  {{ item.amount }}
                </h4>
              </div>
              <p
                style="font-size: 12px; color: #ff9966"
                v-if="item.result == null"
              >
                {{ item.price }} &rarr; {{ $t("pending") }}!
              </p>
              <p style="font-size: 12px; color: #888888" v-else>
                {{ item.price }} &rarr; {{ item.result.finalPrice }}
              </p>
            </div>
          </v-col>
          <v-col cols="6" justify-end>
            <div
              class="item-rightposition"
              justify-end
              style="align-items: center; position: relative; right: 30px"
            >
              <h3
                v-if="item.result != null && item.result.status === 'win'"
                style="
                  display: flex;
                  justify-content: end;
                  font-weight: bold;
                  position: relative;
                  top: 22px;
                  color: #4caf50;
                "
              >
                +{{ $formatnumber(item.amount + item.result.reward) }}
                USD
              </h3>
              <h3
                v-else-if="item.result != null && item.result.status === 'lose'"
                style="
                  display: flex;
                  justify-content: end;
                  font-weight: bold;
                  position: relative;
                  top: 22px;
                  color: #ff5252;
                "
              >
                -{{ $formatnumber(item.amount) }} USD
              </h3>
              <h3
                v-else
                style="
                  display: flex;
                  justify-content: end;
                  font-weight: bold;
                  position: relative;
                  top: 22px;
                  color: #ff9966;
                "
              >
                {{ $t("pending") }} !
              </h3>
              <br />
              <p
                style="
                  font-size: 12px;
                  color: #888888;
                  display: flex;
                  justify-content: end;
                  position: relative;
                  bottom: 2px;
                "
              >
                {{ $FormatDateTime(item.updatedAt) }}
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </vue-loadmore>
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
    this.getHistoryBet();
  },
  computed: {
    ...mapGetters("wallet", ["stateBet"]),
  },
  methods: {
    ...mapActions("authen", ["checkLogin"]),

    ...mapActions("wallet", ["getHistoryBet"]),

    async onRefreshPosition(done) {
      await this.getHistoryBet();
      done();
    },
  },
};
</script>
