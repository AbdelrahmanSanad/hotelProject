class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    // ********** Deleting the not required fields *********
    const execludedFields = ["page", "sort", "limit", "fields"];
    execludedFields.forEach((ele) => delete queryObj[ele]);
    // ********* Refactore the aggregation that contains $lte,gtelt,gt ********
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(lt|gt|gte|lte)\b/g,
      (ex) => `$${ex}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("hotelName");
    }

    return this;
  }
  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }
  pagination() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = { ApiFeatures };
