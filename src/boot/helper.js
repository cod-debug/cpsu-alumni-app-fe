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
    date.setHours(date.getHours());

    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 0) {
      return "In the future!";
    }

    const intervals = {
      years: Math.floor(seconds / 31536000),
      months: Math.floor(seconds / 2592000),
      days: Math.floor(seconds / 86400),
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor(seconds / 60),
    };

    if (intervals.years > 1) {
      return `${intervals.years} year${intervals.years > 1 ? 's' : ''} ago`;
    } else if (intervals.months > 1) {
        return `${intervals.months} month${intervals.months > 1 ? 's' : ''} ago`;
    } else if (intervals.days > 1) {
        return `${intervals.days} day${intervals.days > 1 ? 's' : ''} ago`;
    } else if (intervals.hours >= 1) {
        if (intervals.minutes > 0) {
            return `${intervals.hours}hr ${intervals.minutes}min ago`;
        } else {
            return `${intervals.hours}hr ago`;
        }
    } else if (intervals.minutes > 1) {
        return `${intervals.minutes} minute${intervals.minutes > 1 ? 's' : ''} ago`;
    } else {
        return "Just now";
    }
  },
};

export default boot(({ app }) => {
  app.config.globalProperties.$helper = helpers;
});

export { helpers };
