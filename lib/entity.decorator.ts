import {EntityDecoratorOptions} from './entity.interface';
export function EntityDecorator (options: EntityDecoratorOptions) {
  return (target: Function) => {
    if (options.url[options.url.length - 1] === '/') {
      const url: any = options.url.split('');
      url.pop();
      options.url = url.join('');
    }
    Object.assign(target.prototype, options);
  };
}
