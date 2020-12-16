exports.dashboardQuery = async (userId, getData) => {
  let obj = { userData: {}, page: "", mes: "" };

  if (userId) {
    var sql=`SELECT * FROM tb_users WHERE id='${userId}'`;

    await db.query(sql, (err, result) => {
      if (result.length) {
        obj.userData = result;
        obj.page = "dashboard.ejs";
        getData(obj)
      } else {
        obj.mes = "User doesnt exist anymore";
        obj.page = "index.ejs";
        getData(obj)
      }
    });
  } else {
    obj.mes = "Session Timeout";
    obj.page = "index.ejs"
    getData(obj)
  }
};
