
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(piechartBycategory);
google.charts.setOnLoadCallback(piechartBybrand);

function piechartBycategory() {
  let data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Friends', 2],
  ['Eat', 2],
  ['TV', 2],
  ['Gym', 2],
  ['Sleep', 8]
  ]);
  let options = {'title':'カテゴリー別売上', 'width':300, 'height':300};
  let chart = new google.visualization.PieChart(document.getElementById('piechartBycategory'));
  chart.draw(data, options);
}

function piechartBybrand() {
  let data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Friends', 2],
  ['Eat', 2],
  ['TV', 2],
  ['Gym', 2],
  ['Sleep', 8]
  ]);
  let options = {'title':'ブランド別売上', 'width':300, 'height':300};
  let chart = new google.visualization.PieChart(document.getElementById('piechartBybrand'));
  chart.draw(data, options);
}
