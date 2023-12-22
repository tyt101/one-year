/* eslint-disable */

import { defineStore } from 'pinia';

export const mainStore = defineStore('store', {
  state: () => {
    return {
      count: 0,
      name: '大伟聊前端',
      phone: '18701664166',
    };
  },
  getters: {
    phoneHidden(state) {
      console.log('getters 被调用');

      return state.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
    },
  },
  actions: {
    increment() {
      // 这里不要用箭头函数
      this.count++;
      this.name = '前端进阶训练营';
    },
  },
});
