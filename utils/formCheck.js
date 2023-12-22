const checkObj = (data) => {
  let check = [];

  check = Object.values(data).some(
    data.price
      ? (value) => value === "" || value === null
      : (value) => value === "" || value === "0" || value === null
  );

  return check;
};

const checkArray = (data) => {
  const check = data.some((value) => checkObj(value));

  return check;
};

export const isFormEmpty = (data) => {
  if (Array.isArray(data)) {
    return checkArray(data);
  } else {
    return checkObj(data);
  }
};
