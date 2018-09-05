export function lazy(file) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/${file}`);
}