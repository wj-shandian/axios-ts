import Axios from "./Axios";
import { AxiosInstance } from "./types";

// 可以创建一个axios 的实例 axios 其实是一个函数
function createInstance(): AxiosInstance {
  let context: Axios<any> = new Axios();
  // 让request方法里的 this 指向context 也就是 new Axios
  let instance = Axios.prototype.request.bind(context);
  // 把Axios 的类的实例 和类的原型上方法都拷贝到instance上 也就是request方法上
  instance = Object.assign(instance, Axios.prototype, context);
  return instance as AxiosInstance;
}
let axios = createInstance();
export default axios;

export * from "./types";
