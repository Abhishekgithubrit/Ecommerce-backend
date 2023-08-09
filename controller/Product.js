const { Product } = require('../model/Product');

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  product.discountPrice = Math.round(product.price*(1-product.discountPercentage/100))
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    // let condition = {}
    // if(!req.query.admin){
    //     condition.deleted = {$ne:true}
    // }
    
    let query = Product.find({});
    let totalProductsQuery = Product.find({});
  
    // console.log(req.query.category);
  
    if (req.query.category) {
      query =  query.find({category:req.query.category});
      totalProductsQuery=totalProductsQuery.find({category:req.query.category});

      
    }
    if (req.query.brand) {
      query = query.find({ brand:req.query.brand});
      totalProductsQuery=totalProductsQuery.find({ brand:req.query.brand});
     
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalProductsQuery.count().exec();
    console.log({ totalDocs });

    
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  exports.fetchProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
    //   product.discountPrice = Math.round(product.price*(1-product.discountPercentage/100))
    //   const updatedProduct = await product.save()
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  