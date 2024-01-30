## 职位表

| 序号| 字段名 | 说明 | 数据类型 | 长度 | 是否主键| 是否外键 | 是否唯一 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | userRole | 职位编号 | char | 2 | [x] | [] | [x] |  |
| 2 | roleName | 职位名称 | varchar | 30 | [] | [] | [] |  |
| 3 |  |  |  |  |  |  |  |  |


## 职位信息
``` js
const role = [
    {
        userRole: 0,
        roleName: "管理员"
    },
    {
        userRole: 1,
        roleName: "部长"
    },
    {
        userRole: 2,
        roleName: "副部长"
    },
    {
        userRole: 3,
        roleName: "主任"
    },
    {
        userRole: 4,
        roleName: "副主任"
    },
    {
        userRole: 5,
        roleName: "成员"
    },
]
```