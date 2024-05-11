export interface Outbox {
    notificationID: string;
    title: string;
    content: string;
    sender: string;
    status: number;
    recipients: string;
    createTime: string;
    updateTime: string;
    deleted: number;
}

export interface Notification extends Outbox {
    notificationID: string;
    title: string;
    content: string;
    sender: string;
    status: number;
    recipients: string;
}

export interface CreateOutbox {
    title: string;
    content: string;
    status: number;
    recipients: string;
}

export interface UpdateOutbox {
    notificationID: string;
    title: string;
    content: string;
    status: number;
    recipients: string;
}

export interface DeleteOutbox {
    notificationID: string;
}

export interface Inbox {
    id: string;
    notificationID: string;
    recipientID: string;
    status: number;
    createTime: string;
    updateTime: string;
    deleted: number;
}

export interface UpdateInbox {
    notificationID: string;
    status: number;
}

export interface DeleteInbox {
    notificationID: string;
}
