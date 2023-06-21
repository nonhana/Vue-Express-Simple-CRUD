<template>
  <div class="index">
    <el-dialog v-model="addDialogVisible" title="添加新学生" width="600px" :before-close="closeDialog">
      <el-row style="align-items: center;margin: 0 0 20px 0;" type="flex" justify="space-between">
        <span>学生姓名</span>
        <el-input style="width: 400px;" v-model="stuItem.stu_name" placeholder="请输入学生姓名"></el-input>
      </el-row>
      <el-row style="align-items: center;margin: 0 0 20px 0;" type="flex" justify="space-between">
        <span>学生性别</span>
        <el-input style="width: 400px;" v-model="stuItem.stu_sex" placeholder="请输入学生性别"></el-input>
      </el-row>
      <el-row style="align-items: center;margin: 0 0 20px 0;" type="flex" justify="space-between">
        <span>学生生日</span>
        <el-input style="width: 400px;" v-model="stuItem.stu_birth" placeholder="请输入学生生日"></el-input>
      </el-row>
      <el-row style="align-items: center;" type="flex" justify="space-between">
        <span>学生专业</span>
        <el-radio-group v-model="stuItem.stu_major">
          <el-radio label="1">计算机应用</el-radio>
          <el-radio label="2">软件技术</el-radio>
          <el-radio label="3">网络技术</el-radio>
          <el-radio label="4">多媒体技术</el-radio>
        </el-radio-group>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAddItem">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editDialogVisible" title="编辑学生" width="600px" :before-close="closeDialog">
      <el-row style="align-items: center;margin: 0 0 20px 0;" type="flex" justify="space-between">
        <span>学生姓名</span>
        <el-input style="width: 400px;" v-model="editStuItem.stu_name" placeholder="请输入学生姓名"></el-input>
      </el-row>
      <el-row style="align-items: center;margin: 0 0 20px 0;" type="flex" justify="space-between">
        <span>学生性别</span>
        <el-input style="width: 400px;" v-model="editStuItem.stu_sex" placeholder="请输入学生性别"></el-input>
      </el-row>
      <el-row style="align-items: center;margin: 0 0 20px 0;" type="flex" justify="space-between">
        <span>学生生日</span>
        <el-input style="width: 400px;" v-model="editStuItem.stu_birth" placeholder="请输入学生生日"></el-input>
      </el-row>
      <el-row style="align-items: center;" type="flex" justify="space-between">
        <span>学生专业</span>
        <el-radio-group v-model="editStuItem.stu_major">
          <el-radio label="1">计算机应用</el-radio>
          <el-radio label="2">软件技术</el-radio>
          <el-radio label="3">网络技术</el-radio>
          <el-radio label="4">多媒体技术</el-radio>
        </el-radio-group>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEditItem">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-row type="flex" justify="center" style="margin: 50px auto 0;width: 90%;">
      <span class="title">学生信息页</span>
    </el-row>
    <el-row type="flex" justify="space-between" style="margin: 50px auto 0;width: 90%;">
      <el-input style="width: 60%;" v-model="keywords" placeholder="请输入学生名称进行搜索"></el-input>
      <el-button @click="searchStuItem">点击搜索</el-button>
    </el-row>
    <el-table class="table" :data="tableData" stripe>
      <el-table-column prop="StuNo" label="StuNo" width="180" />
      <el-table-column prop="Name" label="Name" width="180" />
      <el-table-column prop="Sex" label="Sex" width="180" />
      <el-table-column prop="Birth" label="Birth" width="240" />
      <el-table-column prop="MajorName" label="MajorName" width="180" />
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button @click="deleteItem(scope.row.StuNo)">
            删除
          </el-button>
          <el-button @click="editItem(scope.row.StuNo)">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-button style="width: 90%;height: 40px;" @click="addItem">添加新数据</el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getStuListAPI, deleteStuItemAPI, addStuItemAPI, updateStuItemAPI, searchStuItemAPI } from '../../api/student'
import { ElNotification, ElMessage, ElMessageBox } from 'element-plus';

// 定义类别
type student = {
  StuNo: number;
  Name: string;
  Sex: string;
  Birth: string;
  MajorName: string;
}

// 定义常量
const addDialogVisible = ref<boolean>(false)
const editDialogVisible = ref<boolean>(false)
const major_list = [
  {
    label: "1",
    name: "计算机应用",
  },
  {
    label: "2",
    name: "软件技术",
  },
  {
    label: "3",
    name: "网络技术",
  },
  {
    label: "4",
    name: "多媒体技术",
  },
]

// 定义变量
let tableData = ref<student[]>([])
let stuItem = ref(
  {
    stu_name: '',
    stu_sex: '',
    stu_birth: '',
    stu_major: ''
  }
)
let editStuItem = ref(
  {
    stu_no: 0,
    stu_name: '',
    stu_sex: '',
    stu_birth: '',
    stu_major: ''
  }
)
let keywords = ref<string>('')

// 定义函数
// 单击窗口关闭按钮
const closeDialog = (done: () => void) => {
  ElMessageBox.confirm('确认关闭吗？信息不会保留')
    .then(() => {
      done()
    })
    .catch(() => {
    })
}
// 单击添加新学生按钮
const addItem = () => {
  addDialogVisible.value = !addDialogVisible.value
}
// 确认添加
const confirmAddItem = () => {
  const birth_array = stuItem.value.stu_birth.split('-')
  if (stuItem.value.stu_sex != '男' && stuItem.value.stu_sex != '女') {
    ElMessage({
      type: 'error',
      message: '请输入正确的性别：男/女',
    })
  } else if (birth_array.length != 3 || birth_array[0].length != 4 || birth_array[1].length != 2 || birth_array[2].length != 2) {
    ElMessage({
      type: 'error',
      message: '请输入正确的生日日期格式：yyyy-mm-dd',
    })
  } else {
    const paramsList = {
      Name: stuItem.value.stu_name,
      Sex: stuItem.value.stu_sex,
      Birth: stuItem.value.stu_birth,
      MajorId: Number(stuItem.value.stu_major)
    }
    addStuItemAPI(paramsList).then((res: any) => {
      console.log(res.data)
      if (res.data.result_code === 1) {
        ElMessage({
          type: 'error',
          message: '添加失败',
        })
      } else {
        addDialogVisible.value = !addDialogVisible.value
        tableData.value = res.data.stu_list.map((item: any) => {
          return {
            StuNo: item.StuNo,
            Name: item.Name,
            Sex: item.Sex,
            Birth: item.Birth.split("T")[0],
            MajorName: item.MajorName
          }
        }).sort((a: any, b: any) => {
          // 按 StuNo 升序排序
          return a.StuNo - b.StuNo;
        });
        ElMessage({
          type: 'success',
          message: '添加成功',
        })
        stuItem.value = {
          stu_name: '',
          stu_sex: '',
          stu_birth: '',
          stu_major: ''
        }
      }
    })
  }
}
// 删除学生
const deleteItem = (StuNo: number) => {
  ElMessageBox.confirm(
    '该操作将删除该同学信息。是否继续？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteStuItemAPI({ StuNo: StuNo }).then((res: any) => {
        console.log(res.data)
        if (res.data.result_code === 1) {
          ElMessage({
            type: 'error',
            message: '删除失败',
          })
        } else {
          tableData.value = tableData.value.filter(item => item.StuNo !== StuNo)
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}
// 单击修改按钮
const editItem = (StuNo: number) => {
  editDialogVisible.value = !editDialogVisible.value
  const filtItem = tableData.value.filter(item => item.StuNo === StuNo)
  editStuItem.value.stu_no = StuNo;
  editStuItem.value.stu_name = filtItem[0].Name;
  editStuItem.value.stu_sex = filtItem[0].Sex;
  editStuItem.value.stu_birth = filtItem[0].Birth;
  editStuItem.value.stu_major = major_list.filter(item => item.name === filtItem[0].MajorName)[0].label;
}
// 确认提交编辑
const confirmEditItem = () => {
  const paramsList = {
    StuNo: editStuItem.value.stu_no,
    Name: editStuItem.value.stu_name,
    Sex: editStuItem.value.stu_sex,
    Birth: editStuItem.value.stu_birth,
    MajorId: Number(editStuItem.value.stu_major)
  }
  updateStuItemAPI(paramsList).then((res: any) => {
    console.log(res.data)
    if (res.data.result_code === 1) {
      ElMessage({
        type: 'error',
        message: '编辑失败',
      })
    } else {
      editDialogVisible.value = !editDialogVisible.value
      tableData.value = res.data.stu_list.map((item: any) => {
        return {
          StuNo: item.StuNo,
          Name: item.Name,
          Sex: item.Sex,
          Birth: item.Birth.split("T")[0],
          MajorName: item.MajorName
        }
      }).sort((a: any, b: any) => {
        // 按 StuNo 升序排序
        return a.StuNo - b.StuNo;
      });
      ElMessage({
        type: 'success',
        message: '编辑成功',
      })
    }
  })
  editStuItem.value = {
    stu_no: 0,
    stu_name: '',
    stu_sex: '',
    stu_birth: '',
    stu_major: ''
  }
}
// 搜索学生
const searchStuItem = () => {
  if (keywords.value !== '') {
    searchStuItemAPI({ keywords: keywords.value }).then((res: any) => {
      if (res.data.result_code === 1) {
        ElMessage({
          type: 'error',
          message: '搜索失败',
        })
      } else {
        tableData.value = res.data.stu_list.map((item: any) => {
          return {
            StuNo: item.StuNo,
            Name: item.Name,
            Sex: item.Sex,
            Birth: item.Birth.split("T")[0],
            MajorName: item.MajorName
          }
        }).sort((a: any, b: any) => {
          // 按 StuNo 升序排序
          return a.StuNo - b.StuNo;
        });
        ElMessage({
          type: 'success',
          message: '搜索成功',
        })
      }
    })
  } else {
    getStuListAPI().then((res: any) => {
      if (res.data.result_code === 1) {
        ElNotification({
          title: "获取学生列表失败！",
          message: res.data.result_msg,
          type: "error"
        })
      } else {
        ElNotification({
          title: "获取学生列表成功",
          type: "success"
        })
        tableData.value = res.data.stu_list.map((item: any) => {
          return {
            StuNo: item.StuNo,
            Name: item.Name,
            Sex: item.Sex,
            Birth: item.Birth.split("T")[0],
            MajorName: item.MajorName
          }
        }).sort((a: any, b: any) => {
          // 按 StuNo 升序排序
          return a.StuNo - b.StuNo;
        });
      }
    })
  }
}
onBeforeMount(() => {
  getStuListAPI().then((res: any) => {
    if (res.data.result_code === 1) {
      ElNotification({
        title: "获取学生列表失败！",
        message: res.data.result_msg,
        type: "error"
      })
    } else {
      ElNotification({
        title: "获取学生列表成功",
        type: "success"
      })
      tableData.value = res.data.stu_list.map((item: any) => {
        return {
          StuNo: item.StuNo,
          Name: item.Name,
          Sex: item.Sex,
          Birth: item.Birth.split("T")[0],
          MajorName: item.MajorName
        }
      }).sort((a: any, b: any) => {
        // 按 StuNo 升序排序
        return a.StuNo - b.StuNo;
      });
    }
  })
})
</script>

<style scoped lang="less">
.index {
  position: relative;
  width: 100%;
  height: 1000px;
  background-color: #fff;

  .title {
    font-size: 36px;
    font-weight: bold;
  }
}

.table {
  width: 90%;
  margin: 0 auto;
  border: 1px solid #e9e9e9;
}
</style>