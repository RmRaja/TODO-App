<template>
  <f7-app :params="f7params">
    <!-- Views/Tabs container -->
    <f7-views tabs class="safe-areas">
      <!-- Tabbar for switching views-tabs -->
      <f7-toolbar tabbar labels bottom>
        <f7-link
          tab-link="#view-home"
          tab-link-active
          icon-ios="f7:list_dash"
          icon-aurora="f7:list_dash"
          icon-md="f7:list_dash"
          text="TODO"
        ></f7-link>
        <f7-link
          tab-link="#completed-todos"
          icon-ios="f7:checkmark_alt"
          icon-aurora="f7:checkmark_alt"
          icon-md="f7:checkmark_alt"
          text="Completed"
        ></f7-link>
      </f7-toolbar>

      <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
      <f7-view id="view-home" main tab tab-active url="/"></f7-view>

      <!-- Catalog View -->
      <f7-view id="completed-todos" name="catalog" tab url="/completed/"></f7-view>
    </f7-views>
  </f7-app>
</template>
<script>
import { Device } from "framework7/framework7-lite.esm.bundle.js";
import cordovaApp from "../js/cordova-app.js";
import routes from "../js/routes.js";

export default {
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        id: "io.rmraja.todo", // App bundle ID
        name: "TODO App", // App name
        theme: "auto", // Automatic theme detection

        // App root data
        data: function () {
          return {
          };
        },
        // App routes
        routes: routes,
        // Input settings
        input: {
          scrollIntoViewOnFocus: Device.cordova && !Device.electron,
          scrollIntoViewCentered: Device.cordova && !Device.electron,
        },
        // Cordova Statusbar settings
        statusbar: {
          iosOverlaysWebView: true,
          androidOverlaysWebView: false,
        },
      },
    };
  },
  methods: {},
  mounted() {
    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
    });
  },
};
</script>