$(document).ready(function() {


  $(".add-text-btn").on("click", function(){
    //storage key as user defined bill name
    let billStorageKey = $(".user-input-bill-name").val();

    //storage object ccomposed
    let storageObject = {
      dueDate : $(".user-input-due-date").val(),
      reminder : $(".user-input-reminder").val(),
      payee : $(".user-input-payee").val(),
      amount : $(".user-input-amount").val(),
      paymentType : $(".user-input-payment-type").val(),
      category : $(".user-input-category").val(),
      comment : $(".user-input-comment").val(),
      payeeUrl : $(".user-input-payeeUrl").val(),
      userName : $(".user-input-userName").val(),
      password : $(".user-input-password").val()
    }

    //storing our bill data as a string
    let storabgeString = JSON.stringify(storageObject);
    //saving bill asa string to localstorage
    localStorage.setItem(billStorageKey, storabgeString);
    
    // clear fields
    $(".user-input-bill-name").val("")
    $(".user-input-due-date").val(""),
    $(".user-input-reminder").val(""),
    $(".user-input-payee").val(""),
    $(".user-input-amount").val(""),
    $(".user-input-payment-type").val(""),
    $(".user-input-category").val(""),
    $(".user-input-comment").val(""),
    $(".user-input-payeeUrl").val(""),
    $(".user-input-userName").val(""),
    $(".user-input-password").val("")


    console.log($(".user-input-payment-type").val())

 









    // let inputKey = $(".user-input-title").val();
    // let inputValue = $(".user-input-body").val();




    let itemHtml = '<div class="display-item" data-storage-key="'+billStorageKey+'"> ' + billStorageKey + ' ' +  localStorage.getItem(billStorageKey) + '</div>';
    $(".display").html(itemHtml);
    //console.log(localStorage);
    // how can we delegate this event to the outer html node?
    // https://learn.jquery.com/events/event-delegation/

    $(".display-item").on("click", function(e){
      // plop the key:value back into the input boxes

      // get the values from the the divs?
      console.log("key=> ", e.target.dataset.storageKey); // user-input-title
      localStorage.getItem(e.target.dataset.storageKey); // user-input-body

      // set those values in the form fields
      $(".user-input-title").val(e.target.dataset.storageKey);
      $(".user-input-body").val(localStorage.getItem(e.target.dataset.storageKey));
    });

  });



   // TODO add back in later
   // $(".user-input").on("keyup", function(){
   //   let inputValue = $(".user-input").val();
   //   localStorage.setItem("testStorage", inputValue);
   //   $(".display").text(localStorage.getItem("testStorage"));
   // });

   $(".del-text-btn").on("click", function() {
     localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
     alert('item deleted? check the console');
   });


   // iterative approach to adding items
   // store data as stringified array of objects
   // store data with individual keys
  // how do we get keys? research Object.keys



});