exports.signinQuery = async (data, getData) => {
  let obj = { err: "", result: {}, mes: "", url: "" };
  let { user_name, password } = data;

  if (user_name && password) {
    let sql = `SELECT id, first_name, last_name, mob_no, user_name FROM tb_users WHERE user_name='${user_name}' and password = '${password}'`;

    await db.query(sql, (err, result) => {
      if (result.length) {
        obj.err = err;
        obj.result = result;
        obj.url = "/home/dashboard";
        getData(obj)
      } else {
        obj.err = err;
        obj.mes = "Username or password doesnt match";
        getData(obj)
      }
    });
    
    // reset
    user_name = ""
    password = ""
    
  } else {
    obj.mes = "Username or password cant be empty";
    getData(obj)
  }
};
