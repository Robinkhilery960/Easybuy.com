module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

/* 
 module.exports = function(theFunc) {
    return function(req, res, next) {
        Promise.resolve(theFunc(req,res,next)).catch(next)
    }
}

 */
