import { httpsBase } from "../configApiPokemon";
const actionScope = `loader`;
export function setup({ dispatch }) {
  let requestsPending = 0;
  const req = {
    pending: () => {
      requestsPending++;
      dispatch(`${actionScope}/show`);
    },
    done: () => {
      requestsPending--;
      if (requestsPending <= 0) {
        dispatch(`${actionScope}/hide`);
      }
    },
  };
  httpsBase.interceptors.request.use(
    (config) => {
      req.pending();
      return config;
    },
    (error) => {
      console.error(error);
      requestsPending--;
      req.done();
      return Promise.reject(error);
    }
  );
  httpsBase.interceptors.response.use(
    ({ data }) => {
      req.done();
      return Promise.resolve(data);
    },
    (error) => {
      req.done();
      console.error(error);
      return Promise.reject(error);
    }
  );
}
