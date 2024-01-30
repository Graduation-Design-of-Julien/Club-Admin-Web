## 职位表

| 序号| 字段名 | 说明 | 数据类型 | 长度 | 是否主键| 是否外键 | 是否唯一 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | userRole | 职位编号 | char | 2 | o | x | o |  |
| 2 | roleName | 职位名称 | varchar | 30 | x | x | x |  |
| 3 | createTime | 添加时间 | Datetime |  | x | x | x | 初次添加部门时的时间 |
| 4 | changeTime | 修改时间 | Datetime |  | x | x | x | 修改状态时的时间 |
| 5 | deleted | 逻辑删除 | tinyint |  | x | x | x | 0表示仍在使用，1表示已删除 | 
| 6 |  |  |  |  |  |  |  |  |


## 职位信息示例
``` TypeScript
type RoleType = {
    userRole: string,
    roleName: string,
    createTime: Date,
    changeTime: Date,
    deleted: 0 | 1
}

const role = [
    {
        userRole: 0,
        roleName: "管理员",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        userRole: 1,
        roleName: "部长",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        userRole: 2,
        roleName: "副部长",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        userRole: 3,
        roleName: "主任",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        userRole: 4,
        roleName: "副主任",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        userRole: 5,
        roleName: "成员",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
]
```