import "reflect-metadata";
const requiredMetadataKey = Symbol("required");

function CheckUndefinedAndNull() {
    return function(
        target:any,
        propertyName: string,
        descriptor: TypedPropertyDescriptor<Function>)
    {
        let method = descriptor.value;

        descriptor.value = function() {
            if(method === undefined)
                return;

            let requiredParameters: number[] = Reflect.getOwnMetadata(
                requiredMetadataKey,
                target,
                propertyName
            );

            if (requiredParameters) {
                for (let parameterIndex of requiredParameters) {
                    if (
                        parameterIndex >= arguments.length ||
                        arguments[parameterIndex] === undefined
                    ) {
                        throw new Error("Missing required argument.");
                    }
                }
            }

            return method.apply(this, arguments);
        };
    }
}

export {CheckUndefinedAndNull}