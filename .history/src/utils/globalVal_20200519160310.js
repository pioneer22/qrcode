export default {
  getDate (date) {
    let returnDate = date.getFullYear() + '-' + (date.getMonth() + 1).padStart(2, '0') + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    return returnDate
  }
}