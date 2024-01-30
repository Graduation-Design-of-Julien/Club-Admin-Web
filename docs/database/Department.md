## 部门表 ( department )

| 序号 | 字段名 | 说明 | 数据类型 | 长度 | 是否主键 | 是否外键 | 是否唯一 | 是否非空 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | departmentCode | 部门编号 | char | 2 | o | x | o | o |  |
| 2 | departmentName | 部门名称 | varchar | 60 | x | x | x | o |  |
| 3 | createTime | 添加时间 | Datetime |  | x | x | x | o | 初次添加时的时间 |
| 4 | changeTime | 修改时间 | Datetime |  | x | x | x | o | 最后修改时的时间 |
| 5 | deleted | 逻辑删除 | tinyint |  | x | x | x | o | 0表示仍在使用，1表示已删除 |
| 6 |  |  |  |  |  |  |  |  |

### 部门信息示例
```TypeScript
type DepartmentType = {
    departmentCode: string,
    departmentName: string,
    createTime: Date,
    changeTime: Date,
    deleted: 0 | 1
}

const departmenList: Array<DepartmentType> = [
    {
        departmentCode: 1,
        departmentName: "运营中心",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        departmentCode: 2,
        departmentName: "媒体中心",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        departmentCode: 3,
        departmentName: "技术中心",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
]
```