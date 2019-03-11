if(process.env.NODE_ENV === 'production'){
 module.exports = {
 	mongoURI: 'YourMongoUri'
 }
}else{
  module.exports = {
  	mongoURI : 'mongodb://localhost:27017/mern_shopping'
  }
}
