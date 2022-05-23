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
      describe('and succeeds', () => {
        beforeEach(async () => {
          result = await asyncActions.fetchData(URL);
        });

        it('then call method fetch', () => {
          expect(fetch).toHaveBeenCalled();
        });

        it('then return an array', () => {
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
        beforeEach(() => {
          fetch.mockRejectedValue('Error');
          asyncActions.fetchData = jest.fn();
          asyncActions.fetchData.mockRejectedValue('Error');
        });

        it("then return an 'error'", async () => {
          result = await asyncActions.fetchAndStore(URL);
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
