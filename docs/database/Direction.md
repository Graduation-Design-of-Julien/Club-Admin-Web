## 方向表 （ direction ）

| 序号 | 字段名 | 说明 | 数据类型 | 长度 | 是否主键 | 是否外键 | 是否唯一 | 是否非空 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | directionCode | 方向编号 | char | 2 | o | x | o | o |  |
| 2 | directionName | 方向名称 | varchar | 60 | x | x | x | o |  |
| 3 | departmentCode | 部门编号 | char | 2 | x | o | x | o | 与部门表关联 |
| 3 | createTime | 添加时间 | Datetime |  | x | x | x | o | 初次添加时的时间 |
| 4 | changeTime | 修改时间 | Datetime |  | x | x | x | o | 最后修改时的时间 |
| 5 | deleted | 逻辑删除 | tinyint |  | x | x | x | o | 0表示仍在使用，1表示已删除 |
| 6 |  |  |  |  |  |  |  |  |

### 方向信息示例
```TypeScript
type DirectionType = {
    directionCode: String,
    directionName: String,
    departmentCode: String,
    createTime: Date,
    changeTime: Date,
    deleted: 0 | 1
}

const directionList: Array<DirectionType> = [
    {
        directionCode: 1,
        directionName: "财务",
        departmentCode: 1,
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        directionCode: 2,
        directionName: "人事",
        departmentCode: 1,
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
]
```