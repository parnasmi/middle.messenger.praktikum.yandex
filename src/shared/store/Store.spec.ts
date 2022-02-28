import {expect} from 'chai';
import store from './Store';

describe('Store', () => {
  it('should initialize with messages', () => {
    const messages:any[] = [];
    const state = store.getState()
    expect(state.messages.length).is.eq(messages.length)
  });

  it('should set user correctly', () => {
    const user = {
      first_name: 'Ilhom',
      last_name: 'Maksadkulov'
    }
    store.initialSet('user', user);
    const state = store.getState();

    expect(state.user).is.eq(user);
  })
});

