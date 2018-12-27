export function lazy(file) {
  return () => import(/* webpackChunkName: "bundle-[request]" */ `@/${file}`);
}