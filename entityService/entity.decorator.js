"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function EntityDecorator(options) {
    return (target) => {
        if (options.url[options.url.length - 1] === '/') {
            const url = options.url.split('');
            url.pop();
            options.url = url.join('');
        }
        Object.assign(target.prototype, options);
    };
}
exports.EntityDecorator = EntityDecorator;
//# sourceMappingURL=entity.decorator.js.map