const asyncActions = require('../src/asyncActions');
const URL = asyncActions.url;

const returnedMock = [
  {
    id: 1,
    body: 'Wow :D',
    userId: 3,
  },
];
describe('asyncActions', () => {
  describe('given asyncActions', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                id: 1,
                body: 'Wow :D',
                userId: 3,
              },
            ]),
        })
      );
      jest.spyOn(console, 'log');
    });
    let result;

    describe('when method fetchData is called', () => {
      beforeEach(() => {
        fetch.mockClear();
      });

      describe('and succeeds', () => {
        it('then return an array', async () => {
          result = await asyncActions.fetchData(URL);
          expect(result).toEqual(returnedMock);
        });
      });

      describe('and fails', () => {
        it("then return an 'error'", async () => {
          fetch.mockRejectedValue('Error');
          result = await asyncActions.fetchData(URL);
          expect(result).toEqual('Error');
        });
      });
    });

    describe('when method fetchAndStore is called', () => {
      describe('and succeeds', () => {
        beforeEach(async () => {
          fetch.mockClear();
          result = await asyncActions.fetchAndStore(URL);
        });

        it('then call method fetch', () => {
          expect(fetch).toHaveBeenCalled();
        });

        it('then call a console.log', () => {
          expect(console.log).toHaveBeenCalledWith(
            'comments',
            '[{"id":1,"body":"Wow :D","userId":3}]'
          );
        });
      });

      describe('and fails', () => {
        beforeEach(async () => {
          fetch.mockClear();
        });

        it("then return an 'error'", async () => {
          fetch.mockRejectedValue('Error');
          result = await asyncActions.fetchAndStore(URL);
          // expect(result).toEqual('Error');
          expect(console.log).toHaveBeenCalledWith('comments', '"Error"');
        });
      });

      describe('and fails', () => {
        it("then return an 'error'", async () => {
          fetch.mockRejectedValue('Error');
          result = await asyncActions.fetchData(URL);
          expect(result).toEqual('Error');
        });
      });
    });

    describe('when method saveToLocalStorage is called', () => {
      beforeEach(() => {
        asyncActions.saveToLocalStorage({
          url: asyncActions.url,
          id: 1,
          name: 'matheus',
        });
      });

      it('then call a console.log', () => {
        expect(console.log).toHaveBeenCalledWith(
          'comments',
          '{"url":"http://localhost:3005/comments","id":1,"name":"matheus"}'
        );
      });
    });
  });
});
