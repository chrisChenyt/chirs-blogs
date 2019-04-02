import Vue from 'vue'

export function reviseTime (value) {
  let localTime = new Date(value),
    year = localTime.getFullYear(),
    month = localTime.getMonth()+1,
    day = localTime.getDate(),
    hours = localTime.getHours(),
    minutes = localTime.getMinutes(),
    // seconds = localTime.getSeconds(),
    finTime
    for(let i = 0;i < 10;i++){
      if(i === minutes){
        minutes = "0" + minutes
      }
    }
  finTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes 
      // + ":" +seconds
  return finTime
}



const filters = {
  reviseTime
}
export default filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})