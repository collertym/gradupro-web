import long2Time from '../utils/transTime'
import time2Long from '../utils/transTime'

let date = new Date().getTime();
console.log(long2Time(date));
console.log(time2Long(long2Time(date)))