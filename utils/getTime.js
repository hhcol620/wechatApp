// 2020-04-13 15:09:31

function getTime() {
  var d = new Date();
  // debugger
  let year, month, day, hour, minute, second
  year = d.getFullYear();
  month = (d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1));
  day = (d.getDate() >= 10) ?
    d.getDate() :
    '0' + d.getDate();
  hour = (d.getHours() >= 10) ?
    d.getHours() :
    '0' + d.getHours();
  minute = (d.getMinutes() >= 10) ?
    d.getMinutes() :
    '0' + d.getMinutes();
  second = (d.getSeconds() >= 10) ?
    d.getSeconds() : '0' + d.getSeconds()
  const time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  // debugger
  return time
}

module.exports = {
  getTime
}