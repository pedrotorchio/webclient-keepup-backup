export default {
  setAccessTokenData(state, { access_token, token_type, expires_at }) {

    state.accessToken.token = access_token;
    state.accessToken.tokenType = token_type;
    state.accessToken.expiration = expires_at;
    
  }
};