if(process.env.NODE_ENV === 'production'){
 module.exports = {
 	mongoURI: 'mongodb://Mahmudul5809:mahmudul5809@ds133368.mlab.com:33368/mern_shopping'
 }
}else{
  module.exports = {
  	mongoURI : 'mongodb://localhost:27017/mern_shopping'
  }
}
