export const getCombinations = (arr, k) => {
  const result = [];
  const helper = (start, combo) => {
    if (combo.length === k) {
      result.push(combo);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      helper(i + 1, [...combo, i]);
    }
  };
  helper(0, []);
  return result;
};

export const getAllCombinations = (arr) => {
  let allCombinations = [];
  for (let k = 1; k <= arr.length; k++) {
    allCombinations = [...allCombinations, ...getCombinations(arr, k)];
  }
  return allCombinations;
};