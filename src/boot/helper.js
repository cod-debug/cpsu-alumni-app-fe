import { boot } from "quasar/wrappers";
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
    let date = new Date(d);
    date.setHours(date.getHours() - 8);

    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 0) {
      return "In the future!";
    }

    const intervals = {
      year: Math.floor(seconds / 31536000),
      month: Math.floor(seconds / 2592000),
      day: Math.floor(seconds / 86400),
      hour: Math.floor(seconds / 3600),
      minute: Math.floor(seconds / 60),
    };

    if (intervals.year > 1) {
      return `${intervals.year} years ago`;
    } else if (intervals.month > 1) {
      return `${intervals.month} months ago`;
    } else if (intervals.day > 1) {
      return `${intervals.day} days ago`;
    } else if (intervals.hour >= 1 && intervals.minute > 0) {
      const remainingMinutes = intervals.minute % 60;
      const hours = Math.floor(intervals.minute / 60) + intervals.hour;
      return `${hours}hr ${remainingMinutes}min ago`;
    } else if (intervals.hour >= 1) {
      return `${intervals.hour}hr ago`;
    } else if (intervals.minute > 1) {
      return `${intervals.minute} minutes ago`;
    }

    return `${Math.floor(seconds)} seconds ago`;
  },
};

export default boot(({ app }) => {
  app.config.globalProperties.$helper = helpers;
});

export { helpers };
