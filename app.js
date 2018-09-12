$(document).ready(function() {


  $(".add-text-btn").on("click", function(){
    //storage key as user defined bill name
    let billStorageKey = $(".user-input-bill-name").val();

    //storage object ccomposed
    let storageObject = {
      defineBill: true,
      billName : $(".user-input-bill-name").val(),
      payee : $(".user-input-payee").val(),
      dueDate : $(".user-input-due-date").val(),
      amount : $(".user-input-amount").val(),
      reminder : $(".user-input-reminder").val(),
      payee : $(".user-input-payee").val(),
      paymentType : $(".user-input-payment-type").val(),
      category : $(".user-input-category").val(),
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
    $(".user-input-category").val("")
    // $(".user-input-comment").val(""),
    // $(".user-input-payeeUrl").val(""),
    // $(".user-input-userName").val(""),
    // $(".user-input-password").val("")

    // let inputKey = $(".user-input-title").val();
    // let inputValue = $(".user-input-body").val();
let curDate = new Date;



console.log('curent date by new Date = ' + curDate);
console.log('curent date by moments = '+ moment(storageObject.dueDate).endOf('hour').fromNow())



let displayObj = JSON.parse(localStorage.getItem(billStorageKey));
console.log(displayObj.dueDate)


    if (JSON.parse(localStorage.getItem(billStorageKey)).dueDate <= new Date){
      let itemHtml = '<div class="display-item" data-storage-key="'+billStorageKey+'"> ' + billStorageKey + ' ' +  localStorage.getItem(billStorageKey) + '</div>';
      $(".pased-due-bill-storage").html(itemHtml);
    }
    if (JSON.parse(localStorage.getItem(billStorageKey)).dueDate + 7 <= new Date){
      let itemHtml = '<div class="display-item" data-storage-key="'+billStorageKey+'"> ' + billStorageKey + ' ' +  localStorage.getItem(billStorageKey) + '</div>';
      $(".one-week-bill-storage").html(itemHtml);
    }
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
      refreshBills();
     localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
     confirm('Would you like to delte this bill?');

   });

//refresh of current bills(and paid?)

  var refreshBills =function(){
    $(".pased-due-bill-storage").html("")
    for (let i = 0; i < localStorage.length; i++){
      let refreshString = localStorage.getItem(localStorage.key(i));
      let refreshObject = JSON.parse(refreshString);
      let billIdentifier = refreshObject.defineBill;
      let billDueDateString = moment(refreshObject.dueDate).endOf('hour').fromNow()
        if(billIdentifier === true){
          if (billDueDateString.indexOf('ago') !== -1){
            let billDisplay = `<div class="passed-due-bill">The Due Date is: ${refreshObject.dueDate} You owe: $${refreshObject.amount} to ${refreshObject.payee} </div>`
            $(".pased-due-bill-storage").append(billDisplay);
          }
          if ((billDueDateString.indexOf('in') !== -1) && ((billDueDateString.indexOf('a day') !== -1) || (billDueDateString.indexOf('2 days') !== -1) || (billDueDateString.indexOf('hours') !== -1) || (billDueDateString.indexOf('3 days') !== -1) || (billDueDateString.indexOf('4 days') !== -1) || (billDueDateString.indexOf('5 days') !== -1) || (billDueDateString.indexOf('6 days') !== -1) || (billDueDateString.indexOf('7 days') !== -1))){
            let billDisplay = `<div class="one-week-bill"> The Due Date is: ${refreshObject.dueDate} You owe: $${refreshObject.amount} to ${refreshObject.payee} </div>`
            $(".one-week-bill-storage").append(billDisplay);
          }


        }
    }
  }



   // iterative approach to adding items
   // store data as stringified array of objects
   // store data with individual keys
  // how do we get keys? research Object.keys



});