<template>
  <div class="data-list">
    <div class="calc-list">
      <div class="calc-tip">选择表格的计算类型</div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in calcList" :key="item.type" :label="item.title"></el-checkbox>
      </el-checkbox-group>

      <el-select v-model="selectValue" placeholder="选择加权因子" :disabled="!checkList.includes('加权平均')" @change="selectChange">
        <el-option v-for="item in selectOptions" :key="item.Alias" :label="item.title" :value="item.Alias"> </el-option>
      </el-select>
    </div>
    <div class="table-list">
      <vxe-table
        ref="vxeTable"
        size="mini"
        height="auto"
        stripe
        border
        resizable
        show-overflow
        show-footer
        highlight-current-row
        highlight-hover-row
        show-header-overflow
        show-footer-overflow
        :data="tableData"
        :footer-method="footerMethods"
      >
      <!--  -->
        <vxe-table-column v-for="item in head" 
            :field="item.Alias" 
            :title="item.title" 
            :key="item.Alias" 
            :fixed="item.fixed ? 'left' : ''" 
            :width="item.width ? item.width : 150">
        </vxe-table-column>

      </vxe-table>
    </div>
  </div>
</template>

<script>
import { head, calcList, table } from './table.js';
//  npm i worker-loader --save-dev 
// 引入方式: 
// 1. 内联: import xxxWorker from 'worker-loader!../worker/xxxWorker.js'
// 2. 配置webpack.config.js 的loader ， 然后引入只需要import xxxWorker from '../worker/xxxWorker.js'
import calcWorker from 'worker-loader!../worker/calcWorker.js';
import dataWorker from 'worker-loader!../worker/dataWorker.js';

export default {
  data() {
    return {
      head,
      calcList,
      tableData: table,
      checkList: [], // 已选计算类型的集合
      // footerList: [], // 底部统计的数据
      footerData: [],
      selectValue: '', // 加权因子
      selectOptions: head.filter((item) => item.Alias !== 'key'), // 获取所有列的集合
      workerList: []  // 存放所有的worker
    };
  },
  watch: {
    checkList() {
      // 刷新列
      this.$refs.vxeTable.refreshColumn();
      // 重新计算统计数据
      this.$refs.vxeTable.handleDefaultMergeFooterItems();
    }
  },
  created() {
    // 这种方式会有错误提示，在created生命周期，worker还没有
    // let worker = new worker('../worker/dataWorker.js');
    let worker = new dataWorker();
    worker.postMessage(table);
    worker.addEventListener('message', (e) => {
      worker.terminate();
      this.tableData = this.tableData.concat(e.data);
      console.log('this.tableData:', this.tableData)
      this.getDataMap();
    });
  },
  methods: {
    // 触发统计计算
    footerMethods(x) {
      console.log(x);
      // 说明没有选中任何技术公式
      if (this.checkList.length) {
        // dif是 计算方式： 计数， 总和， 最大数
        let { dif, add } = this.getCalcChange();
        if (!add) {
          // 取消对应的选项，删除对应统计
          this.footerData.forEach((item, key) => {
            if (item[0] == dif) {
              this.footerData.splice(key, 1);
            }
          });
        } else {
          this.footerData.push([dif]);
          if (!(dif == '加权平均' && !this.selectValue)) {
            this.makeWorker({
              calcType: this.calcList.filter((item) => item.title == dif)[0],
              columnList: this.selectOptions,
              dataMap: this.dataMap,
              selectValue: this.selectValue
            });
          }
        }
      } else {
        this.footerData = [];
      }
      debugger;
      return this.footerData;
    },
    // 获取统计项发生变化 增加 or 减少（差集）
    getCalcChange() {
      let footerList = this.footerData.map((item) => item[0]).filter((item) => item);
      let dif = this.checkList.length > footerList.length ? this.checkList.filter((item) => !footerList.includes(item)) : footerList.filter((item) => !this.checkList.includes(item));
      return {
        dif: dif[0],
        add: footerList.length > this.checkList.length ? false : true
      };
    },

    selectChange(val) {
      this.makeWorker({
        calcType: this.calcList.filter((item) => item.title == '加权平均')[0],
        columnList: this.selectOptions,
        dataMap: this.dataMap,
        selectValue: val
      });
    },
    // 创建计算worker
    makeWorker(calcInfo) {
      debugger;
      let workerName = `worker${this.workerList.length}`;
      let worker = new calcWorker();
      let start = performance.now();
      worker.postMessage(calcInfo);
      worker.addEventListener('message', (e) => {
        worker.terminate();
        this.footerData.forEach((data, key) => {
          if (data[0] == e.data[0]) {
            this.footerData.splice(key, 1, e.data); // 原位置替换
          }
        });
        let end = performance.now();
        let duration = end - start;
        console.log(`当前任务: ${e.data[0]}, 计算用时: ${duration} 毫秒`);
      });
      this.workerList.push({ [workerName]: worker });
    },

    // 将所有数据按每个列进行统计
    getDataMap() {
      let dataMap = {};
      // 每一个列的值
      this.selectOptions.forEach((item) => {
        dataMap[item.Alias] = this.tableData.map((val) => val[item.Alias]);
      });
      this.dataMap = dataMap;
      // console.log(dataMap)
      // 得到的数据结构是这样的
      // key是：a0 Value是[每一列的值]
    },
    clearWorker() {
      if (this.workerList.length) {
        this.workerList.forEach((item, key) => {
          item[`worker${key}`] && item[`worker${key}`].terminate(); // 终止所有线程
        });
      }
    }
  },
  beforeDestroy() {
    this.clearWorker();
  }
};
</script>

<style lang="less">
.data-list {
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;

  .calc-list {
    width: 130px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background: #f2f6fc;

    .calc-tip {
      font-size: 13px;
      font-weight: bold;
      background: #375ee7;
      text-align: center;
      padding: 20px 0;
      color: #fff;
    }

    .el-checkbox-group {
      padding: 10px 10px 0;
      .el-checkbox {
        margin-bottom: 10px;
      }
    }

    .el-select {
      width: 110px;
      margin-left: 10px;
      .el-input__inner,
      .el-input__icon {
        height: 28px;
        line-height: 28px;
        font-size: 12px;
      }
      .el-input__inner {
        padding-left: 5px;
      }
    }
  }

  .table-list {
    flex: 1;
    height: 100%;
    overflow: hidden;

    .vxe-table {
      tfoot {
        background: #f2f6fc;

        tr {
          td {
            &:first-of-type {
              color: #409eff;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
