

exports.index = function(req, res){
  res.render('index');
  // console.log('returned index');

};

exports.partials = function (req, res) {
  // var name = req.params.name;
  res.render('index');
  // res.render('partials/' + name);

};


exports.sitemap = function (req, res) {
  // var name = req.params.name;
  res.render('sitemap.xml');
  res.render('sitemap');

};
