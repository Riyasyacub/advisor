// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import "channels"

Rails.start()
Turbolinks.start()
require("jquery")

$(document).on('click','.category',function(){
  console.log('category')
  let idd = $(this).attr('id')
  $.ajax({
    url: 'offers_fetch',
    method: 'get',
    data: {id: idd},
    success: function(result){
      let str = "";
      for(let i=0;i<result.length;i++){
        str+= `<a href="/offers_show/`+ result[i]["id"] +`" style="text-decoration: none;" class="" ><div id="`+result[i]["id"]+`" class="offers card m-3 btn-outline-success text-dark " style="width:18rem;"  >
                <div class="card-body" >
                
                <h5 class="card-title" >`+result[i]['name']+`</h5>
                <div class="text-info" >Price: ₹`+result[i]['price']+`/hr</div>
                
                  <div class="card-title" >Mentor Details</div>
                  <div class=" card-title " >`+ result[i]["mentor"]["name"] +`</div>
                       <span class="" >`+ result[i]['mentor']['designation']+ ` , `  +`</span>
                       <span class="" >`+ result[i]['mentor']['organization'] +`</span>
                  </div>
                </div>
              </div>
              </div>
              </a>`
        // str += result[i]["mentor"]
        // console.log(result[i]["mentor"]["name"])
      } 

      $("#show_offers").html(str);
    },
    error: function(result) {
      console.log(result)
    }
  })
})