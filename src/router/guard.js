import store from '@/store';

export function requireAuth(to, from, next) {

  /**
   * 1. CHECKS FOR LOCAL SESSION
   * 2. CHECKS FOR USER DATA
   * 3. IF ANYTHING FAILS, REDIRECT TO LOGIN 
   */
  const dispatch = store.dispatch;

  dispatch('checkSession')
    .then( hasSession => {
      
      if (hasSession) {
        next();

      } else {
        next({
          name: 'Login'
        });
      }
    })
    .catch(err => {
      
      next({
        name: 'Login'
      });
    })

}