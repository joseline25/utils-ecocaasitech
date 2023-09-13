// pause a subscription if package == VIP

function pauseSubscription(subscription) {
    // check that the subscription is not currently paused
    if (subscription.isPaused == false) {
      // get the start date of the subscription
      let start_date = new Date(subscription.start_date);
  
      // get the end date of the subscription
      let end_date = new Date(subscription.end_date);
  
      // get the current date to know when the pause start
      let current_date = new Date();
  
      // check if the end date is not passed and set the parameter
      // of paused in subscription to true
      if (subscription.chosen_package == "VIP Package") {
        if (current_date.getTime() < end_date.getTime()) {
          subscription.isPaused = true; // the isPaused field in subsscription is a boolean
          subscription.pausedDate = current_date;
        }
      }
    }
    return current_date;
  }
  
  // fuunction to resume the subscription
  
  function resumeSubscription(subscription) {
    // get the current date
    let current_date = new Date();
  
    // check that the subscription is currently paused
    if (subscription.isPaused == true) {
      // get the date the subscription was paused
  
      let the_date = subscription.pausedDate;
  
      // get the remaining days of the subscription
  
      let remaining_days =
        30 - (the_date - subscription.start_date) / (1000 * 60 * 60 * 24);
  
      // set the new end date
  
      let end_date = current_date.setDate(
        current_date.getDate() + remaining_days
      );
  
      // get all the remainging booking of the
    }
  }
  
  let current_date = new Date();
  let end_date = new Date();
  end_date.setDate(end_date.getDay() + 3);
  console.log((end_date - current_date) / (1000 * 60 * 60 * 24));