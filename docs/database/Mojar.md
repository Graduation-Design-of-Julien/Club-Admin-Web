## 专业表 ( mojar )

| 序号| 字段名 | 说明 | 数据类型 | 长度 | 是否主键| 是否外键 | 是否唯一 | 是否非空 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | mojarCode | 专业代号 | char | 5 | o | x | o | o |  |
| 2 | mojarName | 专业名称 | varchar | 60 | x | x | x | o |  |
| 3 | collegeCode | 学院代号 | char | 5 | x | o | x | o | 与学院表关联 |
| 4 | createTime | 添加时间 | Datetime |  | x | x | x | o | 初次添加时的时间 |
| 5 | changeTime | 修改时间 | Datetime |  | x | x | x | o | 最后修改时的时间 |
| 6 | deleted | 逻辑删除 | tinyint |  | x | x | x | o | 0表示仍在使用，1表示已删除 |
| 7 |  |  |  |  |  |  |  |  |

### 专业信息示例
```TypeScript
type MojarType = {
    mojarCode: String,
    mojarName: String,
    collegeCode: String,
    createTime: Date,
    changeTime: Date,
    deleted: 0 | 1
}

const mojarList: Array<MojarType> = [
    {
        mojarCode: 1,
        mojarName: "电子信息类",
        collegeCode: 1,
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        mojarCode: 2,
        mojarName: "通信工程",
        collegeCode: 1,
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        mojarCode: 2,
        mojarName: "计算机科学与技术",
        collegeCode: 2,
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
    {
        mojarCode: 2,
        mojarName: "软件工程",
        collegeCode: 2,
        createTime: "2024-01-01 00:00:00",
        changeTime: "2024-01-01 00:00:00",
        deleted: 0
    },
]
```