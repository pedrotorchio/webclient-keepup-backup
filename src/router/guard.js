import store from '@/store';

const dispatch = store.dispatch;

function loggedGuard(to, from, next) {
  if (to.name === 'Login')
    next({
      name: 'PatientsList'
    });
  else
    next();
}
function anonymousGuard(to, from, next) {
  next({
    name: 'Login'
  });
}
export function requireAuth(to, from, next) {

  /**
   * 1. CHECKS FOR LOCAL SESSION
   * 2. CHECKS FOR USER DATA
   * 3. IF ANYTHING FAILS, REDIRECT TO LOGIN 
   */
  
  dispatch('checkSession')
    .then( hasSession => {
      
      if (hasSession) {
        
        loggedGuard(to, from, next);

      } else {
        
        anonymousGuard(to, from, next);
        
      }
    })
    .catch(err => {
      
      anonymousGuard(to, from, next);
      
    });

}

export function anonymousOnly(to, from, next) {
  dispatch('checkSession')
    .then( hasSession => {
      
      if (hasSession) {
        
        next({
          name: 'PatientsList'
        });

      } else {
        
        next();
        
      }
    })
    .catch(err => {
      
      anonymousGuard(to, from, next);
      
    });

}