## 用户表 ( cmsuser )

| 序号 | 字段名 | 说明 | 数据类型 | 长度 | 是否主键 | 是否外键 | 是否唯一 | 是否非空 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | uid | 用户ID | char | 12 | o | x | o | o | 格式为`xxxx-xxxx`，同时作为登录系统所用的账号 |
| 2 | pwd | 用户密码 | varchar | 65 | x | x  | x | o | 经过`base64`编码后使用`SHA-512`进行加密后存入 |
| 3 | userName | 姓名 | varchar | 60 | x | x | x | o |  |
| 4 | stuNo | 学号 | varchar | 15 | x | x | o | o |  |
| 5 | sex | 性别 | varchar | 30 | x | x | x | x | 男 / 女 / 其他 |
| 6 | nativePlace | 籍贯 | varchar | 8 | x | x | x | x | 以6位地址码存储 |
| 7 | phoneNum | 手机号码 | varchar | 20 | x | x | o | o | 以区号存储，如`+8613000000000` |
| 8 | email | 电子邮箱 | varchar | 100 | x | x | x | x |  |
| 9 | cardNum | 银行卡号 | varchar | 20 | x | x | x | x |  |
| 10 | avatarUrl | 头像链接 | text |  | x | x | x | o | 存储图床返回的地址 |
| 11 | introduction | 个人介绍 | text |  | x | x | x | o | 有默认值“该人很懒，还没有介绍。” |
| 12 | departmentCode | 所属部门编号 | char | 2 | x | o | x | o | 与部门表关联 |
| 13 | directionCode | 方向代号 | char | 5 | x | o | x | o | 与方向表关联 |
| 14 | userRole | 职位 | char | 2 | x | o | x | o | 与职位表关联 |
| 15 | collegeCode | 学院代号 | char | 5 | x | o | x | o | 与学院表关联 |
| 16 | mojarCode | 专业代号 | char | 5 | x | o | x | o | 与专业表关联 |
| 17 | createTime | 添加时间 | Datetime |  | x | x | x | o | 初次添加时的时间 |
| 18 | changeTime | 修改时间 | Datetime |  | x | x | x | o | 最后修改时的时间 |
| 19 | userStatus | 用户状态 | char | 3 | x | x | x | o | 0:已离职，1:正常，2:已退休，3:停职中，4:已辞退 |
| 20 | deleted | 逻辑删除 | tinyint |  | x | x | x | o | 0表示仍在使用，1表示已删除 |
|  | 

### 用户信息示例
```TypeScript
type UserType = {
    uid: String,
    pwd: String,
    userName: String,
    sex?: String,
    nativePlace?: String,
    phoneNum: String,
    email?: String,
    cardNum?: String,
    avatarUrl: String,
    introduction: String,
    departmentCode: String,
    directionCode: String,
    userRole: String,
    collegeCode: String,
    mojarCode: String,
    createTime: Date,
    changeTime: Date,
    userStatus: 0 | 1 | 2 | 3 | 4,
    deleted: 0 | 1
}

const userData: UserType = {
    uid: "UCS-1513",
    pwd: "String",
    userName: "张三",
    sex?: "男",
    nativePlace?: "110000",
    phoneNum: "+8613000000000",
    email?: "example@example.com",
    cardNum?: null,
    avatarUrl: "http://example.com/example.jpg",
    introduction: "该个人很懒，还没有介绍。",
    departmentCode: 1,
    directionCode: 1,
    userRole: 5,
    collegeCode: 2,
    mojarCode: 2,
    createTime: "2024-01-01 00:00:00",
    changeTime: "2024-01-01 00:00:00",
    userStatus: 1,
    deleted: 0
}
```