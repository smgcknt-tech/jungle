$(function(){
  $('#cartNum').click(function(){        
    let num = $('#cartNum option:selected').text();
    let formUrl = $('#cartForm').attr('action');
    $('#cartForm').attr('action',formUrl + 'qty=' + num);
  });

});