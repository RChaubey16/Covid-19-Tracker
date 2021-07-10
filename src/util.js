export const SortData = (data) => {
  const sortedData = [...data];

  // will take 2 countries, and sort them based on cases amongst themselvers and so on will move to next 2 countries.
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

// You can also do the above function operation in one line

/*
    ternary operator
    sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
*/
