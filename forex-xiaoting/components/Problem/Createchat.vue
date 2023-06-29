<template>
  <v-app>
    <v-dialog v-model="dialog" style="width: fit-content">
      <v-card v-if="isLoading == true"
        ><v-container style="padding-bottom: 50px">
          <WidgetsLoading /> </v-container
      ></v-card>
      <v-card v-else>
        <v-container>
          <v-textarea
            v-model="detail"
            label="Detail Problem"
            auto-grow
            variant="outlined"
            rows="5"
            row-height="30"
          ></v-textarea>
        </v-container>
        <v-card-actions
          ><v-spacer></v-spacer
          ><v-btn
            :disabled="detail == '' ? true : false"
            @click="onCreateChat"
            plain
            color="primary"
            >Create</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isLoading: false,
      title: "",
      dialog: false,
      detail: "",
    };
  },
  methods: {
    ...mapActions("problem", ["createTicket"]),
    async onCreateChat() {
      this.isLoading = true;
      var res;
      try {
        res = await this.createTicket({
          title: this.title,
          message: this.detail,
        });
        if (res.status == 201) {
          this.dialog = false;
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
};
</script>
