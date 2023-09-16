export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeApiIn(spec: Object): R;
    }
  }
}
