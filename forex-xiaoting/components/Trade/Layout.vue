<template>
  <div>
    <!-- <div class="my-2">
      <v-row>
        <v-col cols="4">
          <div
            style="
              background-color: #abb2b9;
              width: fit-content;
              padding: 5px 20px;
              border-radius: 10px;
              color: white;
            "
          >
            <h4>Open</h4>
            <h3>{{ Open }}</h3>
          </div> </v-col
        ><v-col cols="4">
          <div
            style="
              background-color: #abb2b9;
              width: fit-content;
              padding: 5px 20px;
              border-radius: 10px;
              color: white;
            "
          >
            <h4>Lowest</h4>
            <h3>{{ Lowest }}</h3>
          </div>
        </v-col>
        <v-col cols="4">
          <div
            style="
              background-color: #abb2b9;
              width: fit-content;
              padding: 5px 20px;
              border-radius: 10px;
              color: white;
            "
          >
            <h4>Highest</h4>
            <h3>{{ Highest }}</h3>
          </div>
        </v-col>
      </v-row>
    </div> -->
    <div
      class="k-line-chart-container app"
      id="app"
      :style="{
        backgroundColor:
          theme == 'dark' ? '#1f2126 !important' : 'white !important',
        position: 'relative',
      }"
    >
      <h3
        class="k-line-chart-title"
        :style="{
          position: 'absolute',
          top: '5px',
          left: '5px',
          color: theme == 'dark' ? 'white' : '#252525',
        }"
      >
        {{ title }}
      </h3>
      <v-icon
        size="30"
        style="position: absolute; top: 5px; right: 5%; z-index: 3"
        @click="
          $emit('setTheme');
          setTheme();
        "
        :color="theme == 'dark' ? 'white' : '#252525'"
        >mdi-brightness-4</v-icon
      >

      <slot></slot>
    </div>
    <!-- <v-container>
      <v-row>
        <v-col style="padding: 0 0 0 12px">
          <v-btn large width="100%" @click="onClickDialog('up')">Buy Up</v-btn>
        </v-col>
        <v-col style="padding: 0 12px 0 0">
          <v-btn large width="100%" @click="onClickDialog('down')"
            >Buy Down</v-btn
          >
        </v-col>
      </v-row>
    </v-container> -->
    <Dialog ref="dialogTrade" />
  </div>
</template>

<script>
import Dialog from "./Dialog";

export default {
  components: { Dialog },
  props: {
    title: String,
    Open: Number,
    Lowest: Number,
    Highest: Number,
  },
  data() {
    return {
      windowHeight: (window.innerHeight * 93) / 100,
      windowWidth: window.innerWidth,
      menu: false,
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      dialog: false,
      pair: "XAUUSD",
      theme: "light",
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowHeight = (window.innerHeight * 93) / 100;
      this.windowWidth = window.innerWidth;
    },
    onClickDialog(butStt) {
      this.$refs["dialogTrade"].dialog = true;
    },
    setTheme() {
    
      if (this.theme == "light") {
        this.theme = "dark";
      } else {
        this.theme = "light";
      }
    },
  },
};
</script>
