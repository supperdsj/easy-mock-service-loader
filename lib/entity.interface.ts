export interface Entity {
  request(params: {});

  getData(component: { data: any }, params?: Object, cb?, componentP?: string);

  sendData(component, params, cb?);

}

export interface EntityDecoratorOptions {
  url: string,
  method: string,
  serviceName: string,
  preUrl: string,
  __projectId: string
}

