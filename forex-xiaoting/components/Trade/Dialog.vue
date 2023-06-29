<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          :scrim="false"
          transition="dialog-bottom-transition"
        >
          <v-card height="50vh">
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Trade</v-toolbar-title>
              <!-- <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn variant="text" @click="dialog = false"> Save </v-btn>
            </v-toolbar-items> -->
            </v-toolbar>
          </v-card>
        </v-dialog>
      </v-row>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
