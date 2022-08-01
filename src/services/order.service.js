import { storageService } from './async-storage.service.js';
import axios from 'axios';
import { httpService } from './http.service.js';

// import ordersJason from '../../data/order.json' assert { type: 'json' }

// const KEY = 'ordersDB'
// const API = '//localhost:3030/api/order/'
// const API = process.env.NODE_ENV !== 'development' ? '/api/order/' : '//localhost:3030/api/order/'

const API = 'order';

export const orderService = {
  query,
  getById,
  remove,
  save,
  getorder,
};

async function query(filterBy = null) {
  return await httpService.get(API, filterBy);
}

async function getById(id) {
  // return axios.get(API + id).then(res => res.data)
  // return storageService.get(KEY, id)
  return await httpService.get(`${API}/${id}`);
}

async function remove(id) {
  // return axios.delete(API + id).then(res => res.data)
  // return storageService.remove(KEY, id)
  return await httpService.delete(API, id);
}

async function save(order) {
  if (order._id) {
    // return axios.put(API + order._id, order).then(res => res.data);
    const data = await httpService.put(`${API}/${order._id}`, order);
    return data;
  } else {
    return await httpService.post(API, order);
    // return axios.post(API, order).then(res => res.data);
  }
}

function getorder(orderId) {
  return storageService.get(KEY, orderId);
}
