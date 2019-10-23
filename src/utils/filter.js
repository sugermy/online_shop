import Vue from "vue"

Vue.filter("formatdate", function (value) {
  let newVal
  if (value) {
    newVal = value.slice(5, value.length)
  }
  return newVal
})
