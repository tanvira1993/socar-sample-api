exports.getPagination = (page, size) => {
  const limit = size ? +size : 2;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (data, page, limit, count) => {
  const totalElements = data.length;
  const currentPage = page ? +page + 1 : 0 + 1;
  const totalPages = Math.ceil(count / limit);

  return { totalElements, data, totalPages, currentPage };
};
