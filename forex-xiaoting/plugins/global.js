import Vue from "vue";
import moment from "moment";

Vue.prototype.$formatnumber = (value) => {
  if (!value) return "0.00";
  value = Number(value).toFixed(2);
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value;
};
Vue.prototype.$formatnumber2 = (value) => {
  if (!value) return "0.00";
  value = Number(value).toFixed(2);
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value;
};
Vue.prototype.$formatdate2 = (date) => {
  if (date) {
    return (date = moment(String(date)).format("YYYY-MM-DD"));
  }
};
Vue.prototype.$formatdate = (date) => {
  if (date) {
    return (date = moment(String(date)).format("DD/MM/YYYY"));
  }
};
Vue.prototype.$FormatDateTime = (date) => {
  if (date) {
    // return (date = moment(String(date)).format('DD/MM/YYYY HH:mm:ss'))
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
  }
};
Vue.prototype.$FormatTime = (date) => {
  if (date) {
    // return (date = moment(String(date)).format('DD/MM/YYYY HH:mm:ss'))
    return moment.utc(date).format("HH:mm:ss");
  }
};
Vue.prototype.$NumberFilter = (evt) => {
  evt = evt ? evt : window.event;
  let expect = evt.target.value.toString() + evt.key.toString();

  if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
    evt.preventDefault();
  } else {
    return true;
  }
};
Vue.prototype.$checkSpecialCharacters = (value) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  if (regex.test(value)) {
    return false;
  }
  return true;
};
Vue.prototype.$NumberFilterNoDot = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (
    (charCode > 31 && (charCode < 48 || charCode > 57)) ||
    charCode == 190 ||
    charCode == 110 ||
    charCode == 46 ||
    evt.key === "."
  ) {
    evt.preventDefault();
  } else {
    return true;
  }
};
Vue.prototype.$CurrencyFilter = (num) => {
  var num = window.event.target.value;
  let formated = new Intl.NumberFormat();
  var result = formated.format(num);
  window.event.target._value = result;
};
Vue.config.debug = false;
Vue.config.devtools = false;
Vue.config.silent = true;
