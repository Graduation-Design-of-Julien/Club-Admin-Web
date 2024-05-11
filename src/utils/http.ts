import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosInstance,
} from "axios";
import { ResultData } from "../types/result";
import { handleBusinessError, handleHttpCode } from "./httpHelper";
import { useLocalStorage } from "../utils/useLocalStorage";
import { BASE_URL, TIME_OUT } from "../config/config";

const config = {
    baseURL: BASE_URL,
    timeout: TIME_OUT,
};
class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config);
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const token = useLocalStorage().getLocalStorage("token") || "";
                return {
                    ...config,
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
            },
            (error: AxiosError) => {
                Promise.reject(error);
            }
        );
        this.service.interceptors.response.use(
            async (response: AxiosResponse) => {
                close();
                handleBusinessError(response.data.status);
                return response.data;
            },
            async (error: AxiosError) => {
                close();
                const { response } = error;
                if (response) {
                    // ElMessage.error(`${response.status} ${response.statusText}`);
                    await handleHttpCode(response.status);
                }
                if (!window.navigator.onLine) {
                    ElMessage.error("网络连接失败");
                }
            }
        );
    }
    get<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.get(url, { params });
    }
    post<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.post(url, params);
    }
    patch<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.patch(url, params);
    }
    put<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.put(url, params);
    }
    delete<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.delete(url, { params });
    }
}
export default new RequestHttp(config);
