const checkObj = (data) => {
  let check = [];
  if (data.price) {
    check = Object.values(data).some(
      (value) => value === "" || value === null || value === undefined
    );
  } else {
    check = Object.values(data).some(
      (value) =>
        value === "" || value === "0" || value === null || value === undefined
    );
  }

  return check;
};

const checkArray = (data) => {
  const check = data.some((value) => checkObj(value));

  return check;
};

export const isFormEmpty = (data) => {
  console.log(data);
  if (Array.isArray(data)) {
    return checkArray(data);
  } else {
    return checkObj(data);
  }
};
