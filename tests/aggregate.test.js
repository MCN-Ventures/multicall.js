import { _makeMulticallData as makeMulticallData } from '../src/aggregate';
import { strip0x } from '../src/helpers.js';

describe('aggregate', () => {
  test('no args', () => {
    const calls = [
      {
        target: '0xbbf289d846208c16edc8474705c748aff07732db',
        method: 'what()',
        returns: [['foo']],
        returnTypes: ['uint256'],
      },
    ];
    const expected =
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000020' +
      // address
      '000000000000000000000000bbf289d846208c16edc8474705c748aff07732db' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000004' +
      // function sig: what()
      'b24bb845' +
      '00000000000000000000000000000000000000000000000000000000';

    expect(strip0x(makeMulticallData(calls))).toEqual(expected);
  });

  test('two calls, one with args', () => {
    const calls = [
      {
        target: '0xbeefed1bedded2dabbed3defaced4decade5dead',
        method: 'fess(address)',
        args: [['0xbeefed1bedded2dabbed3defaced4decade5bead', 'address']],
        returnTypes: ['uint256', 'address'],
        returns: [['kay'], ['jewelers']],
      },
      {
        target: '0xbeefed1bedded2dabbed3defaced4decade5face',
        method: 'flog()',
        returns: [['deBeers']],
        returnTypes: ['bytes32'],
      },
    ];
    const expected =
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '00000000000000000000000000000000000000000000000000000000000000e0' +
      // address
      '000000000000000000000000beefed1bedded2dabbed3defaced4decade5dead' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000024' +
      // function sig: fees(address)
      'c963c57b' +
      // arg
      '000000000000000000000000beefed1bedded2dabbed3defaced4decade5bead' +
      '00000000000000000000000000000000000000000000000000000000' +
      // address
      '000000000000000000000000beefed1bedded2dabbed3defaced4decade5face' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000004' +
      // function sig: flog()
      'a7c795fa' +
      '00000000000000000000000000000000000000000000000000000000';

    expect(strip0x(makeMulticallData(calls))).toEqual(expected);
  });
});
