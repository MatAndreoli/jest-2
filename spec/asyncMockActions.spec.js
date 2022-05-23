const asyncMockActions = require('../src/asyncMockActions');
const address = asyncMockActions.url;

const returnedMock = [
  {
    id: 1,
    body: 'Wow :D',
    userId: 3,
  },
];

describe('asyncMockActions', () => {
  describe('given asyncMockActions', () => {
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
    });
    let result;

    describe('when method fetchData is called', () => {
      beforeEach(() => {
        fetch.mockClear();
      });

      describe('and succeeds', () => {
        it('then return an array', async () => {
          result = await asyncMockActions.fetchData(address);
          expect(result).toEqual(returnedMock);
        });
      });

      describe('and fails', () => {
        it("then return an 'error'", async () => {
          fetch.mockRejectedValue('Error');
          result = await asyncMockActions.fetchData(address);
          expect(result).toEqual('Error');
        });
      });
    });
  });
});
