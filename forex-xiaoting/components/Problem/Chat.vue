<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-toolbar
        style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: white;
          z-index: 1;
        "
        dark
        color="white"
      >
        <v-btn icon color="primary" dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-toolbar-title style="color: red; font-size: 15px">{{
          title
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="isSentMessage == false && isClosed == false"
          icon
          color="primary"
          dark
          @click="isSentMessage = true"
        >
          <v-icon>mdi-reply-outline</v-icon>
        </v-btn>
        <v-btn
          v-if="isSentMessage == true && isClosed == false"
          icon
          color="primary"
          dark
          @click="
            isSentMessage = false;
            onReply();
          "
        >
          <v-icon>mdi-send-outline</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-card-title style="margin-top: 5.7vh">{{
          stateTitleChat
        }}</v-card-title>
        <v-divider style="margin: 0px !important"></v-divider>
        <div>
          <div v-for="(item, index) in stateChatMessage" :key="index">
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-btn
                  fab
                  :color="
                    stateOwnerChat.fullname === item.name
                      ? '#FCCB06'
                      : '#1976D2'
                  "
                  dark
                  >{{ item?.name?.slice(0, 1) }}</v-btn
                >
              </v-list-item-avatar>
              <v-list-item-content>
                <v-container class="py-0 my-2">
                  <v-row>
                    <h4>{{ item.name }}</h4>

                    <v-spacer></v-spacer>

                    <p style="font-size: 11px">
                      {{ $FormatDateTime(item.date) }}
                    </p>
                  </v-row>
                </v-container>

                <p>{{ item.text }}</p>
              </v-list-item-content>
            </v-list-item>
            <v-divider style="margin: 0px !important"></v-divider>
          </div>
          <br />

          <br />
          <br />

          <div
            style="
              position: fixed;
              bottom: 0;
              left: 2vw;
              right: 2vw;
              background-color: white;
            "
            v-if="isSentMessage == true"
          >
            <v-text-field
              v-model="message"
              label="Message"
              type="text"
              no-details
              outlined
              @keyup.enter="onReply"
              hide-details
            />
          </div>
        </div>
      </v-card>

      <!-- <div>
        <v-row class="no-gutters elevation-4">
          <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
            <v-responsive class="overflow-y-hidden fill-height" height="92vh">
              <v-card flat class="d-flex flex-column fill-height">
                <v-card-text class="flex-grow-1 overflow-y-auto">
                  <template v-for="(item, i) in stateChatMessage">
                    <div
                      :class="{
                        'd-flex flex-row-reverse':
                          stateOwnerChat.fullName === item.name ? true : false,
                      }"
                    >
                      <v-avatar size="28" class="mt-1">
                        <img
                          crossorigin="anonymous"
                          :src="path + '/image/' + item.avatar"
                          alt="img"
                        />
                      </v-avatar>
                      <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-chip
                            :color="
                              stateOwnerChat.fullName === item.name
                                ? 'primary'
                                : ''
                            "
                            dark
                            style="height: auto; white-space: normal"
                            class="pa-2 mb-2"
                            v-on="on"
                          >
                            {{ item.text }}
                            <sub class="ml-2" style="font-size: 0.5rem">{{
                              $FormatTime(item.date)
                            }}</sub>
                          </v-chip>
                        </template>
                      </v-menu>
                    </div>
                  </template>
                </v-card-text>
                <v-card-text class="flex-shrink-1">
                  <v-row>
                    <v-col :cols="focusType == true ? '12' : '10'">
                      <v-text-field
                        v-model="message"
                        label="Message"
                        type="text"
                        no-details
                        outlined
                        @keyup.enter="onReply"
                        @focus="focusType = true"
                        @blur="focusType = false"
                        hide-details
                      />
                    </v-col>
                    <v-col v-if="focusType == false" cols="2" class="my-auto">
                      <v-btn icon block @click="onReply"
                        ><v-icon>mdi-send</v-icon></v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-responsive>
          </v-col>
        </v-row>
      </div> -->
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  middleware: "checkAuth",
  data: () => ({
    message: "",
    dialog: false,
    focusType: false,
    id: null,
    path: null,
    isSentMessage: false,
    isClosed: false,
    title: "",
  }),
  computed: {
    ...mapGetters("problem", [
      "stateOwnerChat",
      "stateChatMessage",
      "stateTitleChat",
    ]),
  },
  watch: {
    dialog(cur, old) {
      if (cur == false) {
        this.resetChat();
        this.focusType = false;
        this.id = null;
        this.isSentMessage = false;
      }
      if (cur == true) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
  mounted() {
    this.path = process.env.BASE_URL;
  },
  methods: {
    ...mapActions("problem", ["resetChat", "replyChat"]),
    async onReply() {
      var res;
      var data = {
        id: this.id,
        text: this.message,
      };
      try {
        res = await this.replyChat(data);
        if (res.status == 201) {
          this.message = "";
        }
      } catch (error) {}
    },
  },
};
</script>
<style scoped>
.col-11 {
  padding: 0;
}
.col-1 {
  padding: 0;
}
.v-card__text {
  padding: 6px !important;
}
</style>
