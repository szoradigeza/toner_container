import { createContext, ReactNode } from "react";
import Axios, { AxiosInstance, AxiosTransformer } from "axios";
import { notification } from "antd";
import { useContext } from "react";
import { createBrowserHistory } from "history";
import { useQuery, useMutation, useQueryClient } from "react-query";
import qs from "qs";
import { result } from "cypress/types/lodash";

const history = createBrowserHistory();

console.log("baseurl:", import.meta.env.VITE_BASE_URL);
const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  // Read token for anywhere, in this case directly from localStorage
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response interceptor
axios.interceptors.response.use(
  (response) => {
    const data = response.data;
    console.log("response:", response);
    if (response.status === 200) {
      return data;
    }

    notification.error({
      message: `kérés hiba ${response.statusText}: ${response}`,
      description: data || response.statusText || "Error",
    });

    if (response.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(new Error(response.statusText || "Error"));
  },
  (error) => {
    console.log("err:", error, error.response); // for debug
    let msg = "kérés hiba";
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: Nem logolt be
        // Ha nem vagy belogolva, ugorás a login oldalra, és vidd a címét a jelenlegi oldalnak
        // Térj vissza a jelenlegi oldalra sikeres belépés után, ennek a lépésnek a login oldalon kell végrehajtódnia
        case 401:
          window.location.href = "/login";

          break;
        // 403 token lejárt
        // Felszólítja a felhasználót ha lejár a login
        // Törölje a helyi tokent és törölje a token objektumot a vuexben
        // Ugrás a login oldalra
        case 403:
          window.location.href = "/login";
          break;
        // 404 kérés nem létezik
        case 404:
          notification.error({
            message: `kérés nem létezik`,
            description: error.response.data?.msg || "Error",
          });
          break;
        case 406:
          notification.error({
            message: `Hibás kérési paraméterek`,
            description: error.response.data?.msg || "Error",
          });
          break;
        default:
          notification.error({
            message: `kérés hiba`,
            description: error.response.data?.msg || "Error",
          });
      }
    }

    // throw new Error(error);
    return Promise.reject(error);
  }
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
    get: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
  })
);

export const useAxios = () => {
  return useContext(AxiosContext);
};

const transformPagination = (pagination: any) => {
  if (!pagination) return;

  const current = pagination.current
    ? pagination.current
    : pagination.defaultCurrent;
  const pageSize = pagination.pageSize
    ? pagination.pageSize
    : pagination.defaultPageSize;

  let offset = 0;
  if (current && pageSize) {
    offset = (current - 1) * pageSize;
  }

  return {
    offset,
    limit: pageSize,
  };
};

const transformFilters = (filters: any) => {
  if (!filters) return;
  let result: any[] = [];
  for (let key in filters) {
    if (!filters[key] || filters[key] === null) continue;
    result = [...result, [key + ":eq:" + filters[key]]];
  }
  return result;
};

const transformSorter = (sorter: any) => {
  if (!sorter) return;

  let result = "";
  if (sorter.field && sorter.order) {
    let order: string = "desc";
    if (sorter.order === "ascend") order = "asc";
    result = sorter.field + " " + order;
  }

  return result;
};

type listParams = {
  limit?: number;
  offset?: number;
  filter?: string[];
  order?: string;
};
const useGetList = <T>(
  key: string,
  url: string,
  pagination?: any,
  filters?: any,
  sorter?: any
) => {
  const axios = useAxios();

  const service = async () => {
    let params: listParams = {};

    params = { ...transformPagination(pagination) };
    params.filter = transformFilters(filters);
    params.order = transformSorter(sorter);

    const transformRequest: AxiosTransformer = (data, headers) => {};
    console.log("params: ", params);
    const data: T = await axios.get(`${url}`, {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
      transformRequest,
    });

    return data;
  };
  return useQuery(key, () => service());
};

const useGetOne = <T>(key: string, url: string, params?: any) => {
  const axios = useAxios();

  const service = async () => {
    const data: T = await axios.get(`${url}`, params);

    return data;
  };
  return useQuery(key, () => service());
};

const useCreate = <T, U>(url: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(async (params: T) => {
    const data: U = await axios.post(`${url}`, params);
    return data;
  });
};

const useUpdate = <T>(url: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(async (item: T) => {
    const data: T = await axios.patch(`${url}`, item);
    return data;
  });
};

const useDelete = <T>(url: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(async (id: number) => {
    const data: T = await axios.delete(`${url}?id=${id}`);
    return data;
  });
};

const useBatch = (url: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(async (ids: number[]) => {
    const data = await axios.post(`${url}`, { idList: ids });
    return data;
  });
};

export { useGetOne, useGetList, useUpdate, useCreate, useDelete, useBatch };

export default axios;
