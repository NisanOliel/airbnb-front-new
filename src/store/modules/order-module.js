import { orderService } from '../../services/order.service.js';

export const orderStore = {
    state: {
        orders: [],
        lastRemoveOrder: null,
    },

    getters: {
        getOrders({ orders }) {
            return orders;
        },
    },

    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders;
        },

        removeOrder(state, { orderId }) {
            const idx = state.orders.findIndex(p => p._id === orderId);
            state.lastRemovedorder = state.orders[idx];
            state.orders.splice(idx, 1);
        },
        clearRemoveorder(state) {
            state.lastRemoveorder = null;
        },
        undoRemoveorder(state) {
            state.orders.unshift(state.lastRemoveorder);
            state.lastRemoveorder = null;
        },

        addOrder(state, { order }) {
            state.orders.push(order);
        },

        updateOrder(state, { order }) {
            const idx = state.orders.findIndex(p => p._id === order._id);
            state.orders.splice(idx, 1, order);
        },
    },
    actions: {
        async loadOrders({ commit }, { usrId }) {
            const userId = usrId?._id;
            try {
                const orders = await orderService.query({ userId });
                commit({ type: 'setOrders', orders });
            } catch (error) {
                throw error;
            }
        },

        removeOrder({ commit }, payload) {
            commit(payload);
            return orderService
                .remove(payload.orderId)
                .then(() => {
                    commit({ type: 'clearRemoveorder' });
                })
                .catch(err => {
                    commit({ type: 'undoRemoveorder' });
                    throw err;
                });
        },
        saveOrder({ commit }, { order, status }) {
            order.status = status;
            const actionType = order._id ? 'updateOrder' : 'addOrder';
            return orderService.save(order).then(savedOrder => {
                commit({ type: actionType, order: savedOrder });
                return savedOrder;
            });
        },

        getOrderById(context, { orderId }) {
            return orderService.getById(orderId);
        },
    },
};
