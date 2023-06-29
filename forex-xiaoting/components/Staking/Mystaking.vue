<template>
  <div style="margin-top: 57px">
    <WidgetsNavbar
      leftIcon="mdi-chevron-left"
      RouteTo="/Staking"
      :title="$t('miningConfirmation')"
    />
    <v-container>
      <v-card
        v-for="(item, index) in myStaking"
        :key="'myListStaking' + index"
        style="margin: 7px 0"
      >
        <v-container>
          <v-row
            ><v-col cols="8"
              ><h5>XAU</h5>
              <p>
                Interest
                <span
                  ><b>{{ item?.interest * 100 }}%</b></span
                >
              </p>
              <p style="font-size: 0.5em">
                Duration <span style="font-size: 0.5em"><b>1Day</b></span>
              </p>
              <p style="font-size: 0.5em">
                <span style="font-size: 0.5em"
                  ><b>{{ $FormatDateTime(item?.startDate) }}</b></span
                >
              </p></v-col
            >
            <v-col cols="4"
              ><h3>{{ item?.amount }} USD</h3>
              <h4>{{ item.status }}</h4>
              <v-btn
                small
                style="margin-top: 8px"
                :dark="item.status !== 'pending'"
                :disabled="item.status === 'pending'"
                color="#19309F"
                >claim</v-btn
              ></v-col
            >
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  middleware: "checkAuth",
  mounted() {
    this.getMyRequest();
  },
  computed: {
    ...mapGetters("staking", ["myStaking"]),
  },
  methods: {
    ...mapActions("staking", ["getMyRequest"]),
  },
};
</script>
