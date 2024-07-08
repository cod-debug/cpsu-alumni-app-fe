import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import auth from "./auth";
import alumni from "./alumni";
import admin from "./admin";
import chats from "./chats";
import course from "./course";
import alumni_public from "./alumni_public";
import nature_of_work from "./nature_of_work";
import job_posting from "./job_posting";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      auth,
      admin,
      alumni,
      alumni_public,
      chats,
      course,
      nature_of_work,
      job_posting,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
