exports.signupQuery = async (data, getData) => {
  let obj = { err: "", res: {}, mes: "" };
  let { first_name, last_name, mob_no, user_name, password } = data;

  if (first_name && last_name && mob_no && user_name && password) {
    let sql = `INSERT INTO tb_users (first_name, last_name, mob_no, user_name, password) VALUES ('${first_name}', '${last_name}', '${mob_no}', '${user_name}', '${password}')`;

    await db.query(sql, (err, result) => {
      if (!err) {
        obj.err = err;
        obj.res = result;
        obj.mes = "Succesfully! Your account has been created.";
        getData(obj)
      } else {
        obj.err = err;
        obj.res = result;
        obj.mes = "Failed creating an account :(";
        getData(obj)
      }
    });
    
    first_name = ""
    last_name= ""
    mob_no = ""
    user_name = ""
    password = ""
    
  } else {
    obj.mes = "Data cant be null or empty";
    getData(obj)
  }
};
