import axios from 'axios';

const url_domain = process.env.REACT_APP_DOMAIN;

const Services = {
  fetchUser: async function () {
    const response = await axios
      .get(`${url_domain}/api/v1/user`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return response;
  },

  fetchUserRestriction: async function (userId: string) {
    const response = await axios
      .get(`${url_domain}/api/v1/user/${userId}/restrictions`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return response;
  },

  fetchLevelDetail: async function (level: string) {
    const response = await axios
      .get(`${url_domain}/api/v1/level/${level}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return response;
  },

  fetchPurchases: async function (user: number, limit: number, offset: number) {
    const response = await axios
      .get(
        `${url_domain}/api/v1/user/${user}/purchases?limit=${limit}&offset=${offset}`
      )
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return response;
  },

  fetchShipment: async function (shipment: number) {
    const response = await axios
      .get(`${url_domain}/api/v1/shipment/${shipment}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return response;
  },

  fetchPayment: async function (payment: number) {
    const response = await axios
      .get(`${url_domain}/api/v1/payment/${payment}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return response;
  },
};

export default Services;
