
//---------------------------------------------import model------------------------------------------------------
const {signupQuery} = require('../model/SignupQuery');
const {signinQuery} = require('../model/SigninQuery');
const {dashboardQuery} = require('../model/DashboardQuery');
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = (req, res) => {

   let param = {
      message: '',
      error: '',
      result: ''
   }

   if(req.method == "POST"){

      const getData = (results) => {
         const {mes, err, result} = results
         
         param.message = mes
         param.error = err
         param.result = result

         res.render('signup.ejs', param);
      }

      signupQuery(req.body, getData)
      
   } else {
      res.render('signup.ejs', param);
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = (req, res) => {
   
   let param = {
      message: '',
      error: '',
      result: {},
      url: ''
   }

   if(req.method == "POST"){
      
      const getData = (results) => {
         const {err, result, mes, url} = results

         param.error = err,
         param.result = result,
         param.message = mes,
         param.url = url

         if(param.result.length) {
            req.session.userId = param.result[0].id
            req.session.userData = param.result[0]
            res.redirect(url);
         } else {
            res.render('index.ejs', param);
         }
      }

      signinQuery(req.body, getData)

   } else {
      res.render('index.ejs', param);
   }
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
exports.dashboard = (req, res) => {

   let userId = req.session.userId;

   let param = {
      user: {},
      page: "",
      message: ""
   }

   const getData = (results) => {
      const {userData, page, mes} = results
      
      param.user = userData
      param.page = page
      param.message = mes
      
      if (param.user.length) {
         if (userId) {
            res.render(param.page, param)
         } else {
            res.render(param.page, param)
         }
      } else {
         res.render(param.page, param)
      }
   }

   dashboardQuery(userId, getData)  
};
//------------------------------------logout functionality----------------------------------------------
exports.logout= (req,res) => {
   req.session.destroy((err) => {
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = (req, res) => {
   var data = req.session.userData;

   if(data){
      res.render('profile.ejs', {data: data});
   } else {
      res.redirect("/login");
   }
};
