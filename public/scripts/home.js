$(function(){
    $("#tabela input").keyup(function(){       
        var index = $(this).parent().index();
        var nth = "#tabela td:nth-child("+(index+1).toString()+")";
        var valor = $(this).val().toUpperCase();
        $("#tabela tbody tr").show();
        $(nth).each(function(){
            if($(this).text().toUpperCase().indexOf(valor) < 0){
                $(this).parent().hide();
            }
        });
    });
 
    
    $("#tabela input").blur(function(){
        $(this).val("");
    });
});


$(function(){
  $("#tabela select").keyup(function(){       
      var index = $(this).parent().index();
      var nth = "#tabela td:nth-child("+(index+1).toString()+")";
      var valor = $(this).val().toUpperCase();
      $("#tabela tbody tr").show();
      $(nth).each(function(){
          if($(this).text().toUpperCase().indexOf(valor) < 0){
              $(this).parent().hide();
          }
      });
  });

  
  $("#tabela select").blur(function(){
      $(this).val("");
  });
});




/*
function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("sclStatus").value;
    filter = input;
    table = document.getElementById("tabela");
    tr = table.getElementsByTagName("tbody")[0].rows;
    for (i = 0; i < tr.length; i++){
      
      //Pego a 7 coluna
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.children[0].value.toUpperCase().indexOf(filter) > -1){
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  */