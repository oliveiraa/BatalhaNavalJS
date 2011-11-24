/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.getBoard = function(req, res){
  res.render('main/board', { title: 'Main Board'})
};
