export declare interface Entity {
    request(params: {});

    getData(component: { data: any }, params?: Object, cb?, componentP?: string);

    sendData(component, params, cb?);
}

export declare interface EntityDecoratorOptions {
    url: string,
    method: string,
    serviceName: string,
    preUrl: string,
    __projectId: string
}