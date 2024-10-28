const isEqual = (
  obj1: { [key: string]: number },
  obj2: { [key: string]: number }
) => {
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every((key) => obj1[key] === obj2[key])
  );
};

export default isEqual;
