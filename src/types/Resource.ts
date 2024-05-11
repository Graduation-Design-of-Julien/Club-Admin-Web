export interface ResourceType {
    resourceTypeID: string;
    resourceTypeName: string;
    createTime: Date;
    changeTime: Date;
    deleted: number;
}

export interface CreateResourceType {
    resourceTypeName: string;
}

export interface UpdateResourceType {
    resourceTypeID: string;
    resourceTypeName: string;
}

export interface DeleteResourceType {
    resourceTypeID: string;
}

export interface Resource {
    resourceID: string;
    resourceTypeID: string;
    resourceName: string;
    status: number;
    createTime: Date;
    changeTime: Date;
    deleted: number;
}

export interface CreateResource {
    resourceTypeID: string;
    resourceName: string;
}

export interface UpdateResource {
    resourceID: string;
    resourceTypeID: string;
    resourceName: string;
    status: number;
}

export interface DeleteResource {
    resourceID: string;
}

export interface ResourceBorrow {
    borrowedID: string;
    uid: string;
    resourceID: string;
    borrowTime: Date;
    returnTime: Date;
    realReturnTime: Date;
    isReturn: boolean;
    createTime: Date;
    changeTime: Date;
    deleted: number;
}

export interface CreateBorrow {
    resourceID: string;
    returnTime: Date;
}

export interface UpdateBorrow {
    borrowedID: string;
    resourceID: string;
    borrowTime: Date;
    returnTime: Date;
    realReturnTime: Date;
    isReturn: boolean;
}

export interface DeleteBorrow {
    borrowedID: string;
}
