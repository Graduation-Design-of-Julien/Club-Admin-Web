## 部门表

| 序号| 字段名 | 说明 | 数据类型 | 长度 | 是否主键| 是否外键 | 是否唯一 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | departmentCode | 部门编号 | char | 2 | [x] | [] | [x] |  |
| 2 | departmentName | 部门名称 | varchar | 60 | [] | [] | [] |  |
| 3 |  |  |  |  |  |  |  |  |

## 职位信息
``` js
const role = [
    {
        departmentCode: 1,
        departmentName: "运营中心"
    },
    {
        departmentCode: 2,
        departmentName: "媒体中心"
    },
    {
        departmentCode: 3,
        departmentName: "技术中心"
    },
]
```