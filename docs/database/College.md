## 学院表 ( college )

| 序号 | 字段名 | 说明 | 数据类型 | 长度 | 是否主键 | 是否外键 | 是否唯一 | 是否非空 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | collegeCode | 学院代号 | char | 5 | o | x | o | o |  |
| 2 | collegeName | 学院名称 | varchar | 30 | x | x | x | o |  |
| 3 | createTime | 添加时间 | Datetime |  | x | x | x | o | 初次添加时的时间 |
| 4 | changeTime | 修改时间 | Datetime |  | x | x | x | o | 最后修改时的时间 |
| 5 | deleted | 逻辑删除 | tinyint |  | x | x | x | o | 0表示仍在使用，1表示已删除 |
| 6 |  |  |  |  |  |  |  |  |

### 学院信息示例
```TypeScript
type CollegeType = {
    collegeCode: String,
    collegeName: String,
    createTime: Date,
    changeTime: Date,
    deleted: 0 | 1
}

const collegeList: Array<MojarType> = [
    {
        mojarCode: 1,
        mojarName: "信息学院",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        mojarCode: 2,
        mojarName: "计算机学院",
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    }
]
```