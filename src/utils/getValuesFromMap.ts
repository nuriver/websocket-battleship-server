const getValuesFromMap = <K, V>(map: Map<K, V>, keys: K[]): V[] => {
  return keys.map((key) => map.get(key) as V);
};

export default getValuesFromMap;
