export default function getStopsKeyVal(stopsData) {
  const obj = {}
  const stopskeyval = stopsData.map(stop => {
    obj[stop.transloc_stop_id] = stop.stop_name;
  })
  return obj;
}
