<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu @select="changeSelect">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>结果</template
            >
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="/seccess">成功</el-menu-item>
              <el-menu-item index="/false">失败</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 12px">
          <el-button type="primary" @click="doBatch()">批量操作</el-button>
          <el-progress
            id="pro"
            style="float: right; margin-top: 10px"
            type="circle"
            :percentage="p"
            :width="40"
            :stroke-width="4"
          ></el-progress>
        </el-header>

        <el-main>
          <el-table :data="isResult == '/false' ? list2 : list">
            <el-table-column prop="id" label="id" width="310">
            </el-table-column>
            <el-table-column prop="result" label="结果" width="310">
            </el-table-column>
            <el-table-column prop="code" label="code" width="310">
            </el-table-column>
            <el-table-column prop="message" label="message" width="310">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import requestApi from "./test";
export default {
  name: "siderNav",
  data() {
    var list = [];
    var list2 = [];
    var isResult = "/seccess";
    var times = 20;
    var p = 0;
    return {
      requestApi,
      list,
      list2,
      isResult,
      times,
      p,
    };
  },
  methods: {
    async doBatch() {
      // 初始化成功和失败的数组
      this.list = [];
      this.list2 = [];
      let k = 1;
      this.p = 0;
      for (let i = 0; i < this.times; i++) {
        // 等待处理，将成功或失败的详细结果存入数组
        await this.requestApi().then(
          (res) => {
            res.result = "成功";
            res.id = k++;
            this.p += 100 / this.times;
            this.list.push(res);
          },
          (reason) => {
            reason.result = "失败";
            reason.id = k++;
            this.p += 100 / this.times;
            this.list2.push(reason);
            this.$message({
              message: `第${k - 1}条处理失败！`,
              type: " type: 'error'",
            });
          }
        );
      }

      // 当批量处理已经完成，跳出提示
      if (this.p >= 100) {
        this.$message({
          message: "批量处理已完成,请在左侧导航栏查看失败原因",
          type: "success",
        });
      }
    },

    //当导航栏更改，改变isResult显示不同的结果
    changeSelect(val) {
      this.isResult = val;
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
