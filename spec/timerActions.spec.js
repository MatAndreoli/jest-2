const timerActions = require('../src/timerActions');

describe('timerActions', () => {
  describe('given that the method withTimeout is called', () => {
    let callback;

    beforeEach(() => {
      jest.useFakeTimers();
      jest.spyOn(global, 'setTimeout');
      jest.spyOn(console, 'log');
      callback = jest.fn();
      timerActions.withTimeout(callback);
      jest.runAllTimers();
    });

    it('then execute a setTimeout method', () => {
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    });

    it('then call the callback', () => {
      expect(callback).toHaveBeenCalled();
    });

    it('then call the first console.log', () => {
      expect(console.log).toHaveBeenCalledWith('We in sync bois!');
    });

    it('then call the console.log which is inside the setTimeout', () => {
      expect(console.log).toHaveBeenCalledWith('Where are we now?');
    });
  });
});
