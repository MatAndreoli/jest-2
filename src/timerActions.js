const timerActions = {
  withTimeout(callback){
    const delay = 1000;
    console.log('We in sync bois!');
    setTimeout(() => {
      console.log('Where are we now?');
      callback && callback();
    }, delay);
  }
}

module.exports = timerActions;
