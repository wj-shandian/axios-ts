interface OnFulfilled<V> {
  (value: V): V | undefined | null | Promise<V>;
}
interface OnReject {
  (error: any): any;
}

export interface Interceptor<V> {
  onFulfilled?: OnFulfilled<V>; // 成功回调
  onRejected?: OnReject; // 失败回调
}

// export interface AxiosInterceptorManager<V> {
//   use(
//     onFulfilled?: (value: V) => V | Promise<V>,
//     onRejected?: (error: any) => any
//   ): number;
//   eject(id: number): void;
// }
// T 可能是 AxiosRequestConfig 也可能是 AxiosResponse
export default class InterceptorManager<V> {
  public interceptors: Array<Interceptor<V> | null> = [];
  use(onFulfilled?: OnFulfilled<V>, onRejected?: OnReject): number {
    this.interceptors.push({
      onFulfilled,
      onRejected,
    });
    return this.interceptors.length - 1;
  }
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}
