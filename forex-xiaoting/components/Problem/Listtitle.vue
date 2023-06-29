<template>
  <div>
    <WidgetsNavbar leftIcon="mdi-chevron-left" RouteTo="back" title="Ticket" />
    <h4>My Ticket</h4>
    <v-menu top :offset-y="offset" v-if="stateListTitleTicket.length > 0">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fixed
          bottom
          right
          fab
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          @click="onOpenCreateChat(item._id)"
          v-for="(item, index) in stateListTitleTicket"
          :key="index"
          dense
        >
          <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
    <WidgetsLoading v-if="isLoading == true" />
    <WidgetsEmpty v-else-if="isEmpty == true" />
    <div v-else>
      <div
        v-for="(item, index) in stateMyChatInfo"
        :key="index"
        @click="onOpenChat(item)"
      >
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-btn
              fab
              :color="item.isClosed == true ? 'success' : 'orange'"
              dark
              >{{ item?.title?.title.slice(0, 1) }}</v-btn
            >
          </v-list-item-avatar>
          <v-list-item-content>
            <v-container class="py-0 my-2">
              <v-row>
                <h4>{{ item.title.title }}</h4>

                <v-spacer></v-spacer>

                <p style="font-size: 11px">{{ $FormatDateTime(item.date) }}</p>
              </v-row>
            </v-container>

            <v-list-item-title class="text-truncate">{{
              item.message
            }}</v-list-item-title>
            <v-list-item-subtitle class="text-truncate">
              {{ item?.chat[0]?.text }}
              <!-- {{ item?.chat[item.chat.length - 1]?.text }} -->
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider style="margin: 0px !important"></v-divider> -->
      </div>

      <br />
      <br />

      <!-- <template>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>My Chat</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item
                v-for="(item, index) in stateMyChatInfo"
                :key="index"
                @click="onOpenChat(item)"
              >
                <v-list-item-title style="font-size: 14px">{{
                  item.message
                }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header
              >Common topic problems</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-list-item
                v-for="(item, index) in stateListTitleTicket"
                :key="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template> -->
    </div>
    <ProblemCreatechat ref="myCreateChat" :key="1" />

    <ProblemChat ref="myChat" :key="2" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  middleware: "checkAuth",
  data() {
    return {
      dialog: false,
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      offset: true,
    };
  },
  computed: {
    ...mapGetters("problem", [
      "stateListTitleTicket",
      "stateMyChatInfo",
      "isLoading",
      "isEmpty",
    ]),
  },
  mounted() {
    this.onGetListTitle();
    this.onGetMyChat();
  },
  methods: {
    ...mapActions("problem", [
      "getListTitleTicket",
      "getMyChat",
      "getDataDialogChat",
    ]),
    onOpenCreateChat(id) {
      this.$refs["myCreateChat"].dialog = true;
      this.$refs["myCreateChat"].title = id;
    },
    onOpenChat(item) {
      this.$refs["myChat"].dialog = true;
      this.$refs["myChat"].isClosed = item.isClosed;
      this.$refs["myChat"].title = item.title.title;
      this.$refs["myChat"].id = item._id;
      this.getDataDialogChat(item);
    },
    async onGetListTitle() {
      var res;
      try {
        res = await this.getListTitleTicket();
      } catch (error) {}
    },
    async onGetMyChat() {
      var res;
      try {
        res = await this.getMyChat();
      } catch (error) {}
    },
  },
};
</script>
