fetch("/api/get/dashBoard")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(new Error("エラーです！"));
    }
  })
  .then((data) => {
    let sales = 0;
    let orderNum = Object.keys(data.orderData).length;
    data.orderData.forEach((x) => {
      sales = sales + x.ordered_price;
    });
    document.getElementById("sales").innerText = "￥" + sales.toLocaleString();
    document.getElementById("orderNum").innerText =
      orderNum.toLocaleString() + "件";
    document.getElementById("CustomerUnitPrice").innerText =
      "￥" + (sales / orderNum).toLocaleString();

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(piechartBycategory);
    google.charts.setOnLoadCallback(piechartBybrand);

    //ブランド別パイチャート
    let brandArr = [];
    const brandArrGen = (arrOfObject) => {
      for (let i = 0; i < arrOfObject.length; i++) {
        const brand = arrOfObject[i].productId.brand;
        const qty = Number(arrOfObject[i].productQty);
        return new Array(brand, qty);
      }
    };
    for (let i = 0; i < orderNum; i++) {
      const arrOfObject = data.orderData[i].ordered_products;
      brandArr.push(brandArrGen(arrOfObject));
    }
    let newBrandArr = brandArr.reduce((result, current) => {
      let element = result.find((p) => {
        return p[0] === current[0];
      });
      if (element) {
        element[1] += current[1]; // count
      } else {
        result.push([current[0], current[1]]);
      }
      return result;
    }, []);
    const brandData = [["sales", "byBrand"], ...newBrandArr];
    function piechartBybrand() {
      let data = google.visualization.arrayToDataTable(brandData);
      let options = { title: "ブランド別売上", width: 300, height: 300 };
      let chart = new google.visualization.PieChart(
        document.getElementById("piechartBybrand")
      );
      chart.draw(data, options);
    }
    //カテゴリ別パイチャート
    let categoryArr = [];
    const categoryArrGen = (arrOfObject) => {
      for (let i = 0; i < arrOfObject.length; i++) {
        const category = arrOfObject[i].productId.category;
        const qty = Number(arrOfObject[i].productQty);
        return new Array(category, qty);
      }
    };
    for (let i = 0; i < orderNum; i++) {
      const arrOfObject = data.orderData[i].ordered_products;
      categoryArr.push(categoryArrGen(arrOfObject));
    }
    let newCategoryArr = categoryArr.reduce((result, current) => {
      let element = result.find((p) => {
        return p[0] === current[0];
      });
      if (element) {
        element[1] += current[1]; // count
      } else {
        result.push([current[0], current[1]]);
      }
      return result;
    }, []);
    const categoryData = [["sales", "bycategory"], ...newCategoryArr];
    function piechartBycategory() {
      let data = google.visualization.arrayToDataTable(categoryData);
      let options = { title: "ブランド別売上", width: 300, height: 300 };
      let chart = new google.visualization.PieChart(
        document.getElementById("piechartBycategory")
      );
      chart.draw(data, options);
    }




  })
  .catch((e) => {
    console.log(e.message);
  });
