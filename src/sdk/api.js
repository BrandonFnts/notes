import { axiosInstance as api } from "./core/axiosInstance";
import { requestInterceptor, requestErrorInterceptor } from "./interceptors/requestInterceptor";
import { responseInterceptor, responseErrorInterceptor } from "./interceptors/responseInterceptor";

api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default api;
