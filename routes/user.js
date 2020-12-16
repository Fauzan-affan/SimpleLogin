
//---------------------------------------------import model------------------------------------------------------
const {signupQuery} = require('../model/SignupQuery');
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, response){
   
   let param = {
      message: '',
      error: '',
      result: ''
   }

   if(req.method == "POST"){

      const getData = (results) => {
         const {mes, err, res} = results
         
         param.message = mes
         param.error = err
         param.result = res

         response.render('signup.ejs', param);
      }

      signupQuery(req.body, getData)
      
   } else {
      response.render('signup.ejs', param);
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';

   if(req.method == "POST"){
      var post = req.body;
      var name = post.user_name;
      var pass = post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `tb_users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            // console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }    
      });
   } else {
      res.render('index.ejs',{message: message});
   }
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
exports.dashboard = function(req, res){
           
   var user =  req.session.user,
   userId = req.session.userId;
   // console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `tb_users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `tb_users` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `tb_users` WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};
