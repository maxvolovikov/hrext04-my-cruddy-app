$(document).ready(function() {
  var pastDueTracker = 0;

  $(".add-new-bill-btn").on("click", function(){
    //remove old record
    let billName = $(".user-input-bill-name").val();
    localStorage.removeItem(billName);

    //entries validation
    let billStorageKey = $(".user-input-bill-name").val();
    if ($(".user-input-bill-name").val() === ""){alert('Please enter the Payment Name!'); return false;}
    if ($(".user-input-payee").val() === ""){alert('Please enter a Payee!'); return false;}
    if ($(".user-input-payee").val() === "corgi"){alert('You silly! You cant pay corgis in money they only accept treats and belly rubs!!!'); return false;}
    if ($(".user-input-due-date").val() === ""){alert('Please enter the Due Date!'); return false;}
    if ($(".user-input-amount").val() === ""){alert('Please enter the Amount'); return false;}

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
      paymentType : $(".user-input-payment-type").val(),
      category : $(".user-input-category").val(),
      recurring: $(".user-input-recurring").val(),
      paidOn: false,
      comment: $(".user-input-comment").val()
    }

    //storing our bill data as a string
    let storabgeString = JSON.stringify(storageObject);
    //saving bill asa string to localstorage
    localStorage.setItem(billStorageKey, storabgeString);

    // clear fields
    clearInputFields();
    refreshBills();
  });

  //div click functionality that lets edit / pay the bill
  $(document).on("click", ".entered-bill", function(e){
    window.scrollTo(0, -10000000);
      clearInputFields();
      let refStr = localStorage.getItem(e.target.dataset.storageKey);
      let refObj = JSON.parse(refStr);
      //get the values
      let billPaid = refObj.billPaid;
      let billName = refObj.billName;
      let payee = refObj.payee;
      let dueDate = refObj.dueDate;
      let amount = refObj.amount;
      let reminder = refObj.reminder;
      let paymentType = refObj.paymentType;
      let category = refObj.category;
      let recurring = refObj.recurring;
      let comment = refObj.comment

      $(".billPaid").val(billPaid)
      $(".user-input-bill-name").val(billName),
      $(".user-input-payee").val(payee),
      $(".user-input-due-date").val(dueDate),
      $(".user-input-amount").val(amount),
      $(".user-input-reminder").val(reminder),
      $(".user-input-payment-type").val(paymentType),
      $(".user-input-category").val(category),
      $(".user-input-recurring").val(recurring),
      $(".user-input-comment").val(comment)
  });

  //trash icon func
  $(document).on("click", ".delete-btn", function(e){
      //delete confirmation
      confirm('Are you sure you want to delete this item?')
      let billName = $(".user-input-bill-name").val();
      let billPaid = JSON.parse(localStorage.getItem(billName)).billPaid
      if (billPaid == false){
        //unpaid bill second confirmation
        confirm('Are you absolutely sure you want to delete this bill? It looks like it has not been paid yet!')
      }
      localStorage.removeItem(billName);
    refreshBills();
  });

//refresh btn functionality
   $(".refresh-btn").on("click", function() {
      refreshBills();
   });

//pay-btn func
$(".pay-btn").on("click", function(){
  confirm('Are you sure you paid this bill?');
    let billStorageKey = $(".user-input-bill-name").val();
    if ($(".user-input-bill-name").val() === ""){alert('Please enter the Payment Name!'); return false;}
    if ($(".user-input-payee").val() === ""){alert('Please enter a Payee!'); return false;}
    if ($(".user-input-due-date").val() === ""){alert('Please enter the Due Date!'); return false;}
    if ($(".user-input-amount").val() === ""){alert('Please enter the Amount'); return false;}
    if ($(".user-input-amount").val() === "corgi"){alert('Corgi is too much of a payment please consier selling your kidney instead!'); return false;}
    //storage key as user defined bill name
    //storage object ccomposed
    let storageObject = {
      defineBill: true,
      billPaid: true,
      billName : $(".user-input-bill-name").val(),
      payee : $(".user-input-payee").val(),
      dueDate : $(".user-input-due-date").val(),
      amount : $(".user-input-amount").val(),
      reminder : $(".user-input-reminder").val(),
      paymentType : $(".user-input-payment-type").val(),
      category : $(".user-input-category").val(),
      recurring: $(".user-input-recurring").val(),
      paidOn: moment(new Date).format('MMMM Do YYYY'),
      comment: $(".user-input-comment").val()
    }

    //storing our bill data as a string
    let storabgeString = JSON.stringify(storageObject);
    //saving bill asa string to localstorage
    localStorage.setItem(billStorageKey, storabgeString);

    // clear fields
    clearInputFields();
    refreshBills();
});

//refresh of current bills(and paid?)

  var refreshBills =function(){
    //cur bill div reset
    clearStorageBoxes();
    //total counters
    var counterPD = 0;
    var counter7 = 0;
    var counter14 = 0;
    var counter30 = 0;
    var counterOther = 0;
    var counterPaid = 0;

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
      let paidOn = refObj.paidOn;

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
            let billDisplay = `<div id="my-entered-bill" class="entered-bill" data-storage-key="${curName}"> Your ${curName} was paid to ${curPayee} on ${paidOn} in the following amount: ${dollarConverter(curDue)}  </div>`
              $(".paid-bill-storage").append(billDisplay);
              counterPaid += toNum(curDue)
          }
        }

    }
      pastDueTracker =  counterPD;
      $(".past-due-bill-storage").prepend(`<div class="section-total">Total Past Due: ${dollarConverter(counterPD)}<br></div>`);
      $(".one-week-bill-storage").prepend(`<div class="section-total">Total Due in 7 Days: ${dollarConverter(counter7)}<br></div>`);
      $(".two-week-bill-storage").prepend(`<div class="section-total">Total Due in 14 Days: ${dollarConverter(counter14)}<br></div>`);
      $(".one-month-bill-storage").prepend(`<div class="section-total">Total Due in 30 Days: ${dollarConverter(counter30)}<br></div>`);
      $(".over-one-month-bill-storage").prepend(`<div class="section-total">Total Due in over 30 Days: ${dollarConverter(counterOther)}<br></div>`);
      $(".paid-bill-storage").prepend(`<div class="section-total">Total Paid Recently: ${dollarConverter(counterPaid)}<br></div>`);
  }

//convert to number
var toNum = function(x){
  return Number.parseFloat(x);
}
//convert to currency
var dollarConverter = function(x){
  return '$' + Number.parseFloat(x).toFixed(2);
}

var clearStorageBoxes = function(){
    //cur bill div reset
    $(".past-due-bill-storage").html("")
    $(".one-week-bill-storage").html("")
    $(".two-week-bill-storage").html("")
    $(".one-month-bill-storage").html("")
    $(".over-one-month-bill-storage").html("")
    $(".paid-bill-storage").html("")
}

var clearInputFields = function(){
    // clear fields
    $(".user-input-bill-name").val("")
    $(".user-input-due-date").val(""),
    $(".user-input-reminder").val(""),
    $(".user-input-payee").val(""),
    $(".user-input-amount").val(""),
    $(".user-input-payment-type").val(""),
    $(".user-input-category").val(""),
    $(".user-input-comment").val(""),
    $(".user-input-recurring").val("")
}

refreshBills();

  if (pastDueTracker !== 0){
    alert (`The following amount is past due: ${dollarConverter(pastDueTracker)}`);
  }







});