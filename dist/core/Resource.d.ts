export declare const ResourceLoader: {
    add: (...args: any) => void;
    Load(images: object, options: any): void;
    onLoaded: (onLoaded?: (resources: any) => void) => void;
};
export declare class Resource {
    static _onLoaded: (resources: any) => void;
    static state: 'Loading' | 'Loaded';
    static options: any;
    static resourceGetters: SCENE.ResourceGetter[];
    static use(resourceGetter: SCENE.ResourceGetter): void;
    static useLoad(resourceGetter: SCENE.ResourceGetter): void;
    static getLoad(): any;
    static optionSetting(options: any): void;
    static Load(onLoaded?: (resources: any) => void): Promise<unknown>;
    static onLoading(onLoading?: (percent: number, name: string, url: string) => void): void;
    static onLoaded(onLoaded?: (resources: any) => void): void;
}
//# sourceMappingURL=Resource.d.ts.map