$(document).ready(function() {


  $(".add-text-btn").on("click", function(){
//entries validation
    let billStorageKey = $(".user-input-bill-name").val();
    if ($(".user-input-bill-name").val() === ""){alert('Please enter the Payment Name!'); return false;}
    if ($(".user-input-payee").val() === ""){alert('Please enter a Payee!'); return false;}
    if ($(".user-input-due-date").val() === ""){alert('Please enter the Due Date!'); return false;}
    if ($(".user-input-amount").val() === ""){alert('Please enter the Amount'); return false;}
    if ($(".user-input-amount").val() === "corgi"){alert('Corgi is too much of a payment please consier selling your kidney instead!'); return false;}
    // if (typeof ($(".user-input-amount").val()) !== 'number'){alert('Please a valid number in the Amount fields!'); return false;}
    //storage key as user defined bill name
    //storage object ccomposed
    let storageObject = {
      defineBill: true,
      billPaid: false,
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

// let displayObj = JSON.parse(localStorage.getItem(billStorageKey));
// console.log(displayObj.dueDate)


//     if (JSON.parse(localStorage.getItem(billStorageKey)).dueDate <= new Date){
//       let itemHtml = '<div class="display-item" data-storage-key="'+billStorageKey+'"> ' + billStorageKey + ' ' +  localStorage.getItem(billStorageKey) + '</div>';
//       $(".past-due-bill-storage").html(itemHtml);
//     }
//     if (JSON.parse(localStorage.getItem(billStorageKey)).dueDate + 7 <= new Date){
//       let itemHtml = '<div class="display-item" data-storage-key="'+billStorageKey+'"> ' + billStorageKey + ' ' +  localStorage.getItem(billStorageKey) + '</div>';
//       $(".one-week-bill-storage").html(itemHtml);
//     }
    //console.log(localStorage);
    // how can we delegate this event to the outer html node?
    // https://learn.jquery.com/events/event-delegation/


    refreshBills();
  });




// Attach a delegated event handler
// $( ".paid-bill-storage" ).on( "click", "div", function( event ) {
//     event.preventDefault();
//     alert('!')

// });

    $(".paid-bill-storage").on("click", ".entered-bill", function(e){
      // plop the key:value back into the input boxes

      // get the values from the the divs?
      console.log("key=> ", e.target.dataset.storageKey); // user-input-title
      localStorage.getItem(e.target.dataset.storageKey); // user-input-body

      // set those values in the form fields
      $(".user-input-bill-name").val("")
      $(".user-input-due-date").val(""),
      $(".user-input-reminder").val(""),
      $(".user-input-payee").val(""),
      $(".user-input-amount").val(""),
      $(".user-input-payment-type").val(""),
      $(".user-input-category").val("")




      $(".user-input-title").val(e.target.dataset.storageKey);
      $(".user-input-body").val(localStorage.getItem(e.target.dataset.storageKey));
    });



   // TODO add back in later
   // $(".user-input").on("keyup", function(){
   //   let inputValue = $(".user-input").val();
   //   localStorage.setItem("testStorage", inputValue);
   //   $(".display").text(localStorage.getItem("testStorage"));
   // });

     // localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
     // confirm('Would you like to delte this bill?');

//refresh btn functionality
   $(".refresh-btn").on("click", function() {
      refreshBills();
   });

//refresh of current bills(and paid?)

  var refreshBills =function(){
    //cur bill div reset
    $(".past-due-bill-storage").html("")
    $(".one-week-bill-storage").html("")
    $(".two-week-bill-storage").html("")
    $(".one-month-bill-storage").html("")
    $(".over-one-month-bill-storage").html("")
    $(".paid-bill-storage").html("")
    //total counters
    var counterPD = 0;
    var counter7 = 0;
    var counter14 = 0;
    var counter30 = 0;
    var counterOther = 0;

    for (let i = 0; i < localStorage.length; i++){
      let refStr = localStorage.getItem(localStorage.key(i));
      let refObj = JSON.parse(refStr);
      let billId = refObj.defineBill;
      let billTime = moment(refObj.dueDate).endOf('hour').fromNow() //bill due date in string format
      let curDue = refObj.amount;
      let curName = refObj.billName;
      let curDueDate = refObj.dueDate;
      let curPayee = refObj.payee;
      let billPaid = refObj.billPaid;
      let todayDate = moment(new Date).endOf('hour').fromNow();

        if(billId === true){

          if(billPaid === false || billPaid === undefined){
            //this block refreshes the current bills amd sorts them into appropriate boxes bu due date

            if (billTime.indexOf('ago') !== -1){
              counterPD += toNum(curDue);
              counter7 += toNum(curDue);
              counter14 += toNum(curDue);
              counter30 += toNum(curDue);
              counterOther += toNum(curDue);
              let billDisplay = `<div id="my-entered-bill" class="entered-bill" data-storage-key="${curName}"> Your ${curName} is past due as of: ${curDueDate} you need to pay ${curPayee} the following amount: ${dollarConverter(curDue)}  </div>`
              $(".past-due-bill-storage").append(billDisplay);
            } else if ((billTime.indexOf('in') !== -1) && ((billTime.indexOf('a day') !== -1) || (billTime.indexOf('2 days') !== -1) || (billTime.indexOf('hours') !== -1) || (billTime.indexOf('3 days') !== -1) || (billTime.indexOf('4 days') !== -1) || (billTime.indexOf('5 days') !== -1) || (billTime.indexOf('6 days') !== -1) || (billTime.indexOf('7 days') !== -1))){
              counter7 += toNum(curDue);
              counter14 += toNum(curDue);
              counter30 += toNum(curDue);
              counterOther += toNum(curDue);

              let billDisplay = `<div id="my-entered-bill" class="entered-bill" data-storage-key="${curName}"> Your ${curName} is due on: ${curDueDate} you need to pay ${curPayee} the following amount: ${dollarConverter(curDue)}  </div>`
              $(".one-week-bill-storage").append(billDisplay);
            } else if ((billTime.indexOf('in') !== -1) && ((billTime.indexOf('8 days') !== -1) || (billTime.indexOf('9 days') !== -1) || (billTime.indexOf('hours') !== -1) || (billTime.indexOf('3 days') !== -1) || (billTime.indexOf('4 days') !== -1) || (billTime.indexOf('5 days') !== -1) || (billTime.indexOf('10 days') !== -1) || (billTime.indexOf('11 days') !== -1) || (billTime.indexOf('12 days') !== -1) || (billTime.indexOf('13 days') !== -1) || (billTime.indexOf('14 days') !== -1))){
              counter14 += toNum(curDue);
              counter30 += toNum(curDue);
              counterOther += toNum(curDue);
              let billDisplay = `<div id="my-entered-bill" class="entered-bill" data-storage-key="${curName}"> Your ${curName} is due on: ${curDueDate} you need to pay ${curPayee} the following amount: ${dollarConverter(curDue)}  </div>`
              $(".two-week-bill-storage").append(billDisplay);
            } else if ((billTime.indexOf('in') !== -1) && ((billTime.indexOf('15 days') !== -1) || (billTime.indexOf('16 days') !== -1) || (billTime.indexOf('hours') !== -1) || (billTime.indexOf('17 days') !== -1) || (billTime.indexOf('18 days') !== -1) || (billTime.indexOf('19 days') !== -1) || (billTime.indexOf('17 days') !== -1) || (billTime.indexOf('18 days') !== -1) || (billTime.indexOf('19 days') !== -1) || (billTime.indexOf('20 days') !== -1) || (billTime.indexOf('21 days') !== -1) || (billTime.indexOf('22 days') !== -1) || (billTime.indexOf('23 days') !== -1) || (billTime.indexOf('21 days') !== -1) || (billTime.indexOf('21 days') !== -1) || (billTime.indexOf('21 days') !== -1) || (billTime.indexOf('24 days') !== -1) || (billTime.indexOf('25 days') !== -1) || (billTime.indexOf('26 days') !== -1) || (billTime.indexOf('27 days') !== -1) || (billTime.indexOf('28 days') !== -1) || (billTime.indexOf('29 days') !== -1) || (billTime.indexOf('30 days') !== -1))){
              counter30 += toNum(curDue);
              counterOther += toNum(curDue);
              let billDisplay = `<div id="my-entered-bill" class="entered-bill" data-storage-key="${curName}"> Your ${curName} is due on: ${curDueDate} you need to pay ${curPayee} the following amount: ${dollarConverter(curDue)}  </div>`
              $(".one-month-bill-storage").append(billDisplay);
            } else if ((billTime.indexOf('in') !== -1) && !((billTime.indexOf('15 days') !== -1) || (billTime.indexOf('16 days') !== -1) || (billTime.indexOf('hours') !== -1) || (billTime.indexOf('17 days') !== -1) || (billTime.indexOf('18 days') !== -1) || (billTime.indexOf('19 days') !== -1) || (billTime.indexOf('17 days') !== -1) || (billTime.indexOf('18 days') !== -1) || (billTime.indexOf('19 days') !== -1) || (billTime.indexOf('20 days') !== -1) || (billTime.indexOf('21 days') !== -1) || (billTime.indexOf('22 days') !== -1) || (billTime.indexOf('23 days') !== -1) || (billTime.indexOf('21 days') !== -1) || (billTime.indexOf('21 days') !== -1) || (billTime.indexOf('21 days') !== -1) || (billTime.indexOf('24 days') !== -1) || (billTime.indexOf('25 days') !== -1) || (billTime.indexOf('26 days') !== -1) || (billTime.indexOf('27 days') !== -1) || (billTime.indexOf('28 days') !== -1) || (billTime.indexOf('29 days') !== -1) || (billTime.indexOf('30 days') !== -1) || (billTime.indexOf('8 days') !== -1) || (billTime.indexOf('9 days') !== -1) || (billTime.indexOf('hours') !== -1) || (billTime.indexOf('3 days') !== -1) || (billTime.indexOf('4 days') !== -1) || (billTime.indexOf('5 days') !== -1) || (billTime.indexOf('10 days') !== -1) || (billTime.indexOf('11 days') !== -1) || (billTime.indexOf('12 days') !== -1) || (billTime.indexOf('13 days') !== -1) || (billTime.indexOf('14 days') !== -1) || (billTime.indexOf('a day') !== -1) || (billTime.indexOf('2 days') !== -1) || (billTime.indexOf('hours') !== -1) || (billTime.indexOf('3 days') !== -1) || (billTime.indexOf('4 days') !== -1) || (billTime.indexOf('5 days') !== -1) || (billTime.indexOf('6 days') !== -1) || (billTime.indexOf('7 days') !== -1))) {
              counterOther += toNum(curDue);
              let billDisplay = `<div id="my-entered-bill" class="entered-bill" data-storage-key="${curName}"> Your ${curName} is due on: ${curDueDate} you need to pay ${curPayee} the following amount: ${dollarConverter(curDue)}  </div>`
              $(".over-one-month-bill-storage").append(billDisplay);
            }
          }
          if (billPaid === true){
            let billDisplay = `<div id="my-entered-bill" class="entered-bill" data-storage-key="${curName}"> Your ${curName} was paid to ${curPayee} in the following amount: ${dollarConverter(curDue)}  </div>`
              $(".paid-bill-storage").append(billDisplay);
          }
        }

    }
      $(".past-due-bill-storage").prepend(`<div class="section-total">Total Past Due: ${dollarConverter(counterPD)}<br></div>`);
      $(".one-week-bill-storage").prepend(`<div class="section-total">Total Due in 7 Days: ${dollarConverter(counter7)}<br></div>`);
      $(".two-week-bill-storage").prepend(`<div class="section-total">Total Due in 14 Days: ${dollarConverter(counter14)}<br></div>`);
      $(".one-month-bill-storage").prepend(`<div class="section-total">Total Due in 30 Days: ${dollarConverter(counter30)}<br></div>`);
      $(".over-one-month-bill-storage").prepend(`<div class="section-total">Total Due in over 30 Days: ${dollarConverter(counterOther)}<br></div>`);
  }

//convert to number
var toNum = function(x){
  return Number.parseFloat(x);
}
//convert to currency
var dollarConverter = function(x){
  return '$' + Number.parseFloat(x).toFixed(2);
}
   // iterative approach to adding items
   // store data as stringified array of objects
   // store data with individual keys
  // how do we get keys? research Object.keys


//new bill pop up window


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}












});