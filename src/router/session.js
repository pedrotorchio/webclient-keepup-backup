export const sessionKey = 'lastPage';

const session = window.sessionStorage;

export function save(name) {
  session.set(sessionKey, name);
}
export function open() {
  return session.get(sessionKey);
}