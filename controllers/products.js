const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // const myData = await Product.find({});
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (featured) {
    queryObject.featured = featured;
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;

  let skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);

  // page = 2;
  // limit = 3;
  // skip = 1 + 3 = 3;

  console.log("queryObject.company", queryObject.company);

  const Products = await apiData;
  console.log("req.query", req.query);
  res.status(200).json({ Products, total: Products.length });
};

const getAllProductsTesting = async (req, res) => {
  const myDataTesting = await Product.find(req.query).sort("name -price");
  // const myDataTesting = await Product.find(req.query).select("name company");

  res.status(200).json({ myDataTesting });
};

module.exports = { getAllProducts, getAllProductsTesting };
