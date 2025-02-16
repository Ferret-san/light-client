import { BigNumber, constants } from 'ethers';

import type { Token } from '@/model/types';
import { emptyTokenModel } from '@/model/types';
import store, { defaultState } from '@/store/index';
import { defaultState as defaultNotificationsState } from '@/store/notifications/state';
import { defaultState as defaultUserDepositContractState } from '@/store/user-deposit-contract/state';
import type { Tokens } from '@/types';

import { TestData } from './data/mock-data';

describe('store', () => {
  const testTokens = (token: string, name?: string, symbol?: string) => {
    const tokens: Tokens = {};
    tokens[token] = {
      address: token,
      balance: constants.Zero,
      decimals: 18,
      name,
      symbol,
    };
    return tokens;
  };

  const model = (name?: string, symbol?: string) => {
    const model = emptyTokenModel();
    model.address = TestData.openChannel.token;
    model.open = 1;
    model.settling = 1;
    model.name = name || '';
    model.symbol = symbol || '';
    return model;
  };

  beforeEach(() => {
    store.replaceState({
      ...defaultState(),
      notifications: defaultNotificationsState(),
      userDepositContract: defaultUserDepositContractState(),
    });
  });

  test('setConnected and setDisconnected mutations change isConnected state', () => {
    expect(store.state.isConnected).toBe(false);
    store.commit('setConnected');
    expect(store.state.isConnected).toBe(true);
    store.commit('setDisconnected');
    expect(store.state.isConnected).toBe(false);
  });

  test('balance mutation changes the accountBalance state', () => {
    expect(store.state.accountBalance).toBe('0.0');
    store.commit('balance', '12.0');
    expect(store.state.accountBalance).toBe('12.0');
  });

  test('raidenAccountBalance mutation changes the raidenAccountBalance', () => {
    expect(store.state.raidenAccountBalance).toBe('');
    store.commit('raidenAccountBalance', '0.1');
    expect(store.state.raidenAccountBalance).toBe('0.1');
  });

  test('account mutation changes the defaultAccount state', () => {
    expect(store.state.defaultAccount).toBe('');
    store.commit('account', 'test');
    expect(store.state.defaultAccount).toBe('test');
  });

  test('updateChannel mutation changes the channels state', () => {
    expect(store.state.channels).toEqual({});
    store.commit('updateChannels', TestData.mockChannels);
    expect(store.state.channels).toEqual(TestData.mockChannels);
  });

  test('backupState and clearBackupState mutations change the stateBackup state', () => {
    expect(store.state.stateBackup).toEqual('');

    const mockStringStateFile = '{ ...stateFileContent }';
    store.commit('backupState', mockStringStateFile);
    expect(store.state.stateBackup).toEqual(mockStringStateFile);

    store.commit('clearBackupState');
    expect(store.state.stateBackup).toEqual('');
  });

  test('the tokens getter returns tokens that have channels', () => {
    store.commit('updateChannels', TestData.mockChannels);
    expect(store.getters.tokens).toEqual([model()]);
  });

  test('the channels getter returns an empty array when there are no channels', () => {
    store.commit('updateChannels', TestData.mockChannels);
    expect(store.getters.channels('0xNoAddress')).toEqual([]);
  });

  test('the channels getter returns an array of channels', () => {
    store.commit('updateChannels', TestData.mockChannels);
    expect(store.getters.channels('0xd0A1E359811322d97991E03f863a0C30C2cF029C')).toEqual([
      TestData.openChannel,
      TestData.settlingChannel,
    ]);
  });

  test('updateTokens mutation updates the tokens', () => {
    const tokens = testTokens('0xtoken');
    store.commit('updateTokens', tokens);
    expect(store.state.tokens).toEqual(tokens);
  });

  test('the tokens getters returns tokens with empty strings when there is no name and symbol', () => {
    const tokens = testTokens('0xd0A1E359811322d97991E03f863a0C30C2cF029C');
    store.commit('updateTokens', tokens);
    store.commit('updateChannels', TestData.mockChannels);
    expect(store.getters.tokens).toEqual([model()]);
  });

  test('the tokens getter returns tokens that include name and symbol information', () => {
    const tokens = testTokens('0xd0A1E359811322d97991E03f863a0C30C2cF029C', 'Test Token', 'TTT');

    store.commit('updateTokens', tokens);
    store.commit('updateChannels', TestData.mockChannels);
    expect(store.getters.tokens).toEqual([model('Test Token', 'TTT')]);
  });

  test('the allTokens getter returns the cached tokens as an array', () => {
    const tokens: Tokens = {
      '0x123': {
        address: '0x123',
        balance: constants.Zero,
        decimals: 18,
        name: 'Test Token 1',
        symbol: 'TT1',
      },
      '0x456': {
        address: '0x456',
        balance: BigNumber.from('3'),
        decimals: 18,
        name: 'Test Token 2',
        symbol: 'TT2',
      },
      '0x789': {
        address: '0x789',
        balance: constants.Zero,
        decimals: 18,
        name: 'Test Token 3',
        symbol: 'TT3',
      },
      '0x012': {
        address: '0x789',
        balance: constants.Zero,
        decimals: 18,
        name: 'Test Token 4',
      },
    };

    store.commit('updateTokens', tokens);
    expect(store.getters.allTokens).toEqual([
      {
        address: '0x456',
        balance: BigNumber.from('3'),
        decimals: 18,
        name: 'Test Token 2',
        symbol: 'TT2',
      },
      {
        address: '0x123',
        balance: constants.Zero,
        decimals: 18,
        name: 'Test Token 1',
        symbol: 'TT1',
      },
      {
        address: '0x789',
        balance: constants.Zero,
        decimals: 18,
        name: 'Test Token 3',
        symbol: 'TT3',
      },
      {
        address: '0x789',
        balance: constants.Zero,
        decimals: 18,
        name: 'Test Token 4',
      },
    ]);
  });

  test('the token getter returns null when the token is not cached', () => {
    expect(store.getters.token('0xd0A1E359811322d97991E03f863a0C30C2cF029C')).toBeNull();
  });

  test('the token getter returns the token when it is cached', () => {
    const tokens = testTokens('0xd0A1E359811322d97991E03f863a0C30C2cF029C', 'Test Token', 'TTT');

    store.commit('updateTokens', tokens);
    expect(store.getters.token('0xd0A1E359811322d97991E03f863a0C30C2cF029C')).toEqual({
      address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
      balance: constants.Zero,
      decimals: 18,
      symbol: 'TTT',
      name: 'Test Token',
    } as Token);
  });

  test('the network getter returns "Chain x" when there is no chain name', () => {
    store.commit('network', { name: 'unknown', chainId: 89 });
    expect(store.getters.network).toEqual('89');
  });

  test('the network getter returns the chain name when it exists', () => {
    store.commit('network', { name: 'Testnet', chainId: 89 });
    expect(store.getters.network).toEqual('Testnet');
  });

  test('the reset mutation resets the state', () => {
    store.commit('updateBlock', 1);
    expect(store.state.blockNumber).toBe(1);
    store.commit('reset');
    expect(store.state.blockNumber).toBe(defaultState().blockNumber);
  });

  test('the set available version mutation updates the version info', () => {
    expect(store.state.versionInfo.availableVersion).toBeUndefined();

    store.commit('setAvailableVersion', '1.0.0');

    expect(store.state.versionInfo.availableVersion).toBe('1.0.0');
  });

  test('the set available version mutation does not update version info if version is invalid', () => {
    expect(store.state.versionInfo.availableVersion).toBeUndefined();

    store.commit('setAvailableVersion', 'ein.zwei');

    expect(store.state.versionInfo.availableVersion).toBeUndefined();
  });

  test('the set update is mandatory mutation does update the version info', () => {
    expect(store.state.versionInfo.updateIsMandatory).toBe(false);

    store.commit('setUpdateIsMandatory');

    expect(store.state.versionInfo.updateIsMandatory).toBe(true);
  });

  describe('channelWithBiggestCapacity', () => {
    test('return the open channel when there is only one open channel', () => {
      const mockChannels = TestData.mockChannels;
      store.commit('updateChannels', mockChannels);
      expect(
        store.getters.channelWithBiggestCapacity('0xd0A1E359811322d97991E03f863a0C30C2cF029C'),
      ).toEqual(TestData.openChannel);
    });

    test('return undefined when there are no channels', () => {
      expect(
        store.getters.channelWithBiggestCapacity('0xd0A1E359811322d97991E03f863a0C30C2cF029C'),
      ).toBeUndefined();
    });

    test('return the channel with the biggest capacity when there are multiple channels open', () => {
      const biggestChannel = {
        ...TestData.openChannel,
        capacity: BigNumber.from(20 ** 8),
        partner: '0xaDBa6B0CC7176De032A887232EB59Bb3B1402103',
      };
      const mockChannels = {
        '0xd0A1E359811322d97991E03f863a0C30C2cF029C': {
          '0x1D36124C90f53d491b6832F1c073F43E2550E35b': TestData.openChannel,
          '0x82641569b2062B545431cF6D7F0A418582865ba7': TestData.settlingChannel,
          '0xaDBa6B0CC7176De032A887232EB59Bb3B1402103': biggestChannel,
        },
      };
      store.commit('updateChannels', mockChannels);
      expect(
        store.getters.channelWithBiggestCapacity('0xd0A1E359811322d97991E03f863a0C30C2cF029C'),
      ).toEqual(biggestChannel);
    });
  });

  test('return the channel with the biggest capacity when there are multiple channels open, once more', () => {
    const smallerChannel = {
      ...TestData.openChannel,
      capacity: BigNumber.from('0x09407931E1D4A000'), // 0.666666 T
      partner: '0xaDBa6B0CC7176De032A887232EB59Bb3B1402103',
    };
    const biggestChannel = {
      ...TestData.openChannel,
      capacity: BigNumber.from('0x0DE0B6B3A7640000'), // 1 T
      partner: '0xaDBa6B0CC7176De032A887232EB59Bb3B1402103',
    };
    const mockChannels = {
      '0xd0A1E359811322d97991E03f863a0C30C2cF029C': {
        '0x1D36124C90f53d491b6832F1c073F43E2550E35b': smallerChannel,
        '0x82641569b2062B545431cF6D7F0A418582865ba7': TestData.settlingChannel,
        '0xaDBa6B0CC7176De032A887232EB59Bb3B1402103': biggestChannel,
      },
    };
    store.commit('updateChannels', mockChannels);
    expect(
      store.getters.channelWithBiggestCapacity('0xd0A1E359811322d97991E03f863a0C30C2cF029C'),
    ).toEqual(biggestChannel);
  });

  test('the channels getter returns an empty array when the token has no channels', () => {
    const channels = {
      '0xd0A1E359811322d97991E03f863a0C30C2cF029C': {},
    };
    store.commit('updateChannels', channels);
    expect(store.getters.channels('0xd0A1E359811322d97991E03f863a0C30C2cF029C')).toEqual([]);
  });

  test('the token getter returns an empty array when the token has no channels', () => {
    const channels = {
      '0xd0A1E359811322d97991E03f863a0C30C2cF029C': {},
    };
    store.commit('updateChannels', channels);
    expect(store.getters.tokens).toEqual([]);
  });

  test('return only pending transfers', () => {
    [
      { key: 'sent:0x1', completed: true },
      { key: 'sent:0x2', completed: false },
    ].forEach((transfer) => store.commit('updateTransfers', transfer));
    const { pendingTransfers } = store.getters;
    expect(Object.keys(pendingTransfers).length).toEqual(1);
  });

  test('return transfer with specific identifier ', () => {
    [
      { key: 'sent:0x1', paymentId: BigNumber.from('0x1') },
      { key: 'sent:0x2', paymentId: BigNumber.from('0x2') },
    ].forEach((transfer) => store.commit('updateTransfers', transfer));
    const transfer = store.getters.transfer('0x1');
    expect(transfer.key).toEqual('sent:0x1');
  });

  test('newBlock updates blockNumber', () => {
    store.commit('updateBlock', 1337);
    expect(store.state.blockNumber).toBe(1337);
  });

  test('acceptDisclaimer mutates changes disclaimer related state', () => {
    [true, false].forEach((persistDecistion) => {
      store.commit('acceptDisclaimer', persistDecistion);
      expect(store.state.disclaimerAccepted).toBe(true);
      expect(store.state.persistDisclaimerAcceptance).toBe(persistDecistion);
    });
  });

  test('usingRaidenAccount getter reflect settings state property', () => {
    [true, false].forEach((useRaidenAccount) => {
      store.commit('updateSettings', { useRaidenAccount });
      expect(store.getters.usingRaidenAccount).toEqual(useRaidenAccount);
    });
  });

  test('version update is available if available version is higher than active one', () => {
    expect(store.getters.versionUpdateAvailable).toBe(false);

    store.commit('setAvailableVersion', '1.0.0');

    expect(store.getters.versionUpdateAvailable).toBe(true);
  });

  test('version update is not available if available version is lower or equal than active one', () => {
    store.commit('setAvailableVersion', '0.0.0');

    expect(store.getters.versionUpdateAvailable).toBe(false);
  });

  test('version update is not available if available version undefined', () => {
    store.commit('setAvailableVersion', undefined);

    expect(store.getters.versionUpdateAvailable).toBe(false);
  });
});
