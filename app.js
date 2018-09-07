$(document).ready(function() {


  $(".add-text-btn").on("click", function(){

    // store values
/*[due date] [reminder] [payee] [amount] [payment type] [priority lever - category] [comment] [accessmethod: [url][user name][password]]*/
    let dueDate = $(".user-input-due-date").val();
    let reminder = $(".user-input-reminder").val();
    let payee = $(".user-input-payee").val();
    let amount = $(".user-input-amount").val();
    let paymentType = $(".user-input-payment-type").val();
    let category = $(".user-input-category").val();
    let comment = $(".user-input-comment").val();
    let payeeUrl = $(".user-input-payeeUrl").val();
    let userName = $(".user-input-userName").val();
    let password = $(".user-input-password").val();











    let inputKey = $(".user-input-title").val();
    let inputValue = $(".user-input-body").val();

    // clear values
    $(".user-input-title").val("");
    $(".user-input-body").val("");

    console.log(inputKey, inputValue);

    localStorage.setItem(inputKey, inputValue);

    let itemHtml = '<div class="display-item" data-storage-key="'+inputKey+'"> ' + inputKey + ' ' +  localStorage.getItem(inputKey) + '</div>';
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