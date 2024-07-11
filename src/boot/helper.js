import { boot } from "quasar/wrappers";
import moment from 'moment';

const helpers = {
  jsonToFormData(json) {
    const formData = new FormData();
    Object.keys(json).forEach((key) => {
      formData.append(key, json[key]);
    });
    return formData;
  },
  formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  timeSince(d) {
    return moment(new Date(d)).fromNow();
  },

  formatNumber(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export default boot(({ app }) => {
  app.config.globalProperties.$helper = helpers;
});

export { helpers };
