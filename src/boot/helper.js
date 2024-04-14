import { boot } from "quasar/wrappers";
const helpers = {
  jsonToFormData(json) {
    const formData = new FormData();
    Object.keys(json).forEach((key) => {
      formData.append(key, json[key]);
    });
    return formData;
  },
};

export default boot(({ app }) => {
  app.config.globalProperties.$helper = helpers;
});

export { helpers };
