export default {
  getDate (date) {
    let returnDate = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + date.getDate()
    return returnDate
  }
}