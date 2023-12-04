// const queryObj = { ...req.query };

//   // *********  data filtering  ************
//   const execludedFields = ["page", "sort", "limit", "fields"];

//   execludedFields.forEach((ele) => delete queryObj[ele]);
//   const queryStr = JSON.stringify(queryObj).replace(
//     /\b(gt|gte|lt|lte)\b/g,
//     (match) => `$${match}`
//   );
//   let query = JSON.parse(queryStr);
//   // **************** Sorting The Data ****************
//   if (req.query.sort) {
//     const sortBy = req.query.sort.split(",").join(" ");
//     query = query.sort(sortBy);
//   } else {
//     query = query.sort("hotelName");
//   }
//   // ************** Limiting the fields ***************
//   if (req.query.fields) {
//     const fieldsLimiting = req.query.fields.split(",").join(" ");
//     query = query.select(fieldsLimiting);
//   } else {
//     query = query.selecr(-__v);
//   }
//   // ************** Paginate the data  ****************
//   const page = +req.query.page || 1;
//   const limit = +req.query.limit || 20;
//   const skip = (page - 1) * limit;
//   query = query.skip(skip).limit(limit);

//   // **** Pagination Error handling  ****
//   if (req.query.page) {
//     const hotelNum = await Hotel.countDocuments();
//     if (skip >= hotelNum) next(new AppError("This Page doesn't exist"), 404);
//   }
//   // const hotels = await Hotel.find(query);
