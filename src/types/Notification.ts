export interface Notification {
    notificationID: string,
    title: string,
    content: string,
    sender: string,
    createTime: string,
    status: string,
    changeTime: string,
    recipients: string[]
}

export interface Recipient {
    recipientID: string,
    notificationsID: string,
    status: string,
    changeTime: string
}

export interface Outbox {
    notificationID: string,
    title: string,
    content: string,
    sender: string,
    status: string,
    changeTime: string
}