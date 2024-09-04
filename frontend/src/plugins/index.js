/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import store from "@/vuex/store";
import router from "@/routers/router";

export function registerPlugins(app) {
  app.use(vuetify).use(store).use(router);
}
