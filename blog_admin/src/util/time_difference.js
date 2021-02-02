
/**
 * JS 计算两个时间间隔多久（时分秒）
 * @param startTime "2019-10-23 15:27:23"
 * @param endTime "2019-10-23 15:27:55"
 * @return 1天2时3分5秒
 */
export default function timeDifference(startTime) {

  // 开始时间
  let d1 = startTime.replace(/\-/g, "/");
  let date1 = new Date(d1);

  let date2 = new Date()

  // 时间相差秒数
  let dateDiff = date2.getTime() - date1.getTime();

  // 计算出相差天数
  let days = Math.floor(dateDiff / (24 * 3600 * 1000));

  // 计算出小时数
  let residue1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  let hours = Math.floor(residue1 / (3600 * 1000));

  // 计算相差分钟数
  let residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  let minutes = Math.floor(residue2 / (60 * 1000));

  // 计算相差秒数
  let residue3 = residue2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  let seconds = Math.round(residue3 / 1000);

  let returnVal =
    ((days == 0) ? "" : days+"天") +
    ((hours == 0) ? "" : days+"时") +
    ((minutes == 0) ? "" : minutes+"分") +
    ((seconds == 0) ? "" : seconds+"秒");

  return returnVal;

}