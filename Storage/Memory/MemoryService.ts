class MemoryService {
    private static memory: { store: { [k: string]: any[]; } }= {store:{}};

    public static initializeMemoryService(){
        // console.log("Mierdaaa", MemoryService.memory);
        // console.log("Tipo de la m", typeof MemoryService.memory);
        //
        // if(MemoryService.memory !== null ||
        //     MemoryService.memory !== undefined) {
        //     console.log("Viene aca ?");
        //     return;
        // }
        // console.log("Mierda dos ?");
        // MemoryService.memory = {
        //     store:{}
        // };
        //console.log("STOREEEE", MemoryService.memory);
    }

    public static addMemoryKey(key: string) {
        if(MemoryService.memory.store[`${key}`] !== undefined)
            return;
        if (MemoryService.memory.store === undefined) {
            return;
        }

        MemoryService.memory.store = {
            ...MemoryService.memory.store,
            [`${key}`]: []
        };
    }

    public static pushElementToKey(key: string, value: string): boolean {
        if (!MemoryService.memory.store[`${key}`]) {
            return false;
        }

        MemoryService.memory.store[`${key}`].push(value);
        return true;
    }

    public static getLastElementByKey(key: string) {
        const storeArray: any[] = MemoryService.memory.store[`${key}`];
        return storeArray[storeArray.length-1];
    }

    public static getElementByKey(key: string):any[]{
        if(MemoryService.memory.store === undefined)
            return [];
        const storeArray: any[] =
            MemoryService.memory.store[`${key}`] === undefined?[]:
                [...MemoryService.memory.store[`${key}`]]
        ;
        return storeArray;
    }

}

export default MemoryService;