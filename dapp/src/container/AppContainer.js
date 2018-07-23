import { connect } from 'react-redux';
import App from '../components/App';
import {
  addAction,
  subAction
} from '../actions/counterActions';
import { healthAction } from '../actions/healthActions';
import { 
  simpleTokenNameAction, 
  simpleTokenSymbolAction,
  simpleTokenDecimalsAction,
} from '../actions/simpleTokenActions';
import { 
  warningOpenAction,
  warningCloseAction
} from '../actions/warningActions';
import {
  metaMaskAccountAction,
  metaMaskNetworkAction
} from '../actions/metaMaskActions';
import {
  cryptoHerosTokenNameAction,
  cryptoHerosTokenSymbolAction,
  cryptoHerosTokenGetOwnedTokensAction,
  cryptoHerosTokenTokenURIAction
} from '../actions/cryptoHerosActions';

const  mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  count: state.count,
  error: state.error,
  health: state.health,
  simpleToken: state.simpleToken,
  warning: state.warning,
  metaMask: state.metaMask,
  cryptoHerosToken: state.cryptoHerosToken,
  cryptoHerosOwned: state.cryptoHerosOwned,
  cryptoHerosOwnedTokenURI: state.cryptoHerosOwnedTokenURI
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: (num) => {
      dispatch(addAction(num));
    },
    handleSub: (num) => {
      dispatch(subAction(num));
    },
    handleHealth: () => {
      dispatch(healthAction());
    },
    handleSimpleTokenName: (networkId) => {
      dispatch(simpleTokenNameAction(networkId));
    },
    handleSimpleTokenSymbol: (networkId) => {
      dispatch(simpleTokenSymbolAction(networkId));
    },
    handleSimpleTokenDecimals: (networkId) => {
      dispatch(simpleTokenDecimalsAction(networkId));
    },
    handleCryptoHerosTokenName: (networkId) => {
      dispatch(cryptoHerosTokenNameAction(networkId));
    },
    handleCryptoHerosTokenSymbol: (networkId) => {
      dispatch(cryptoHerosTokenSymbolAction(networkId));
    },
    handleCryptoHerosTokenGetOwnedTokens: (networkId, address, callBack) => {
      dispatch(cryptoHerosTokenGetOwnedTokensAction(networkId, address, callBack));
    },
    handleCryptoHerosTokenTokenURI: (networkId, tokenId, callBack) => {
      dispatch(cryptoHerosTokenTokenURIAction(networkId, tokenId, callBack));
    },
    handleWarningOpen: (message) => {
      dispatch(warningOpenAction(message));
    },
    handleWarningClose: () => {
      dispatch(warningCloseAction());
    },
    handleMetaMaskAccount: (account) => {
      dispatch(metaMaskAccountAction(account));
    },
    handleMetaMaskNetwork: (network) => {
      dispatch(metaMaskNetworkAction(network));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);