function getItemIdx(idx, page, limit) {
  return (page * limit) - limit + idx + 1;
}

export {
  getItemIdx,
};
