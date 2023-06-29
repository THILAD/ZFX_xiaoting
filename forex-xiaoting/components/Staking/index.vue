<template>
  <div style="margin-top: 57px">
    <!-- Appbar -->
    <div>
      <v-app-bar style="background-color: white" app density="compact">
        <v-row>
          <v-col cols="2" align="center">
            <v-app-bar-nav-icon @click="$router.push('/')"
              ><v-icon color="#19309F"
                >mdi-chevron-left</v-icon
              ></v-app-bar-nav-icon
            >
          </v-col>
          <v-col
            cols="7"
            style="display: flex; justify-content: center; align-items: center"
          >
            <h3 style="color: #19309f">Staking</h3>
          </v-col>
          <v-col
            @click="$router.push('/mystaking')"
            cols="3"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0;
            "
          >
            <p style="font-size: 0.5em !important; font-weight: bolder">
              My Staking
            </p>
          </v-col>
        </v-row>
      </v-app-bar>
    </div>
    <!-- End Appbar -->
    <v-container>
      <v-card
        v-for="(item, index) in list"
        style="margin-bottom: 10px"
        :key="'listStake' + index"
        ><v-container
          ><h6>XAU</h6>
          <v-container
            ><v-row
              ><v-col style="padding-left: 0" align="start"
                ><h3>{{ item.interest }}%</h3>
                <p style="font-size: 1px">Dialy rate</p></v-col
              >
              <v-col style="padding-right: 0" align="end"
                ><p>
                  <b>{{ item.min }}~{{ item.max }} USD</b>
                </p>
                <span style="font: 0.2em sans-serif; color: gray"
                  >Staking amount range</span
                ></v-col
              ></v-row
            ></v-container
          >
          <v-divider></v-divider>
        </v-container>
        <v-container>
          <v-row
            ><v-col style="text-align: start; padding-bottom: 0"
              ><span style="font-size: 1px">Staking coin</span>
            </v-col>
            <v-col style="text-align: center; padding-bottom: 0"
              ><span style="font-size: 1px">Profit coin</span></v-col
            >
            <v-col style="text-align: end; padding-bottom: 0"
              ><span style="font-size: 1px">Share</span></v-col
            ></v-row
          >
        </v-container>
        <v-container>
          <v-row
            ><v-col style="text-align: start; padding-top: 0"
              ><span style="font-size: 0.5em; color: #4caf50; font-weight: bold"
                >XAU</span
              >
            </v-col>
            <v-col style="text-align: center; padding-top: 0"
              ><span style="font-size: 0.5em; color: #4caf50; font-weight: bold"
                >XAU</span
              ></v-col
            >
            <v-col style="text-align: end; padding-top: 0"
              ><span style="font-size: 0.5em; font-weight: bold"
                >Unlimited</span
              ></v-col
            ></v-row
          >
        </v-container>

        <v-container>
          <v-row
            ><v-col style="text-align: start; padding-bottom: 0; padding-top: 0"
              ><span style="font-size: 0.5em">Duration</span>
            </v-col>
            <v-col style="text-align: center; padding-bottom: 0; padding-top: 0"
              ><span style="font-size: 0.5em">Grant</span></v-col
            >
            <v-col style="text-align: end; padding-bottom: 0; padding-top: 0"
              ><span style="font-size: 0.5em">Type</span></v-col
            ></v-row
          >
        </v-container>
        <v-container>
          <v-row
            ><v-col style="text-align: start; padding-top: 0"
              ><span style="font-size: 0.5em; font-weight: bold">1Day</span>
            </v-col>
            <v-col style="text-align: center; padding-top: 0"
              ><span style="font-size: 0.5em; font-weight: bold"
                >Daily</span
              ></v-col
            >
            <v-col style="text-align: end; padding-top: 0"
              ><span style="font-size: 0.5em; font-weight: bold"
                >income</span
              ></v-col
            ></v-row
          >

          <v-btn
            block
            style="margin-top: 7px"
            dark
            color="#19309F"
            @click="$router.push('/Confirmstaking/' + index)"
            >Staking</v-btn
          >
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { interest: 4, min: 99, max: 999 },
        { interest: 5, min: 1000, max: 10000 },
        { interest: 6, min: 10999, max: 50000 },
        { interest: 7, min: 50999, max: 100000 },
        { interest: 7.5, min: 109999, max: 500000 },
        { interest: 8, min: 509999, max: 1000000 },
      ],
    };
  },
};
</script>
