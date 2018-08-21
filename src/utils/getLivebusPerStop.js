import getBusData from '../utils/getBusData';
import getStopsData from '../utils/getStopsData';

export default function getLivebusPerStop() {
  var busData = getBusData().then((result) => {console.log(result)})
  var stopsData = getStopsData((result) => {console.log(result)});
}
