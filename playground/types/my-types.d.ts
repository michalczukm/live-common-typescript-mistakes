// only declaration --> you have to provide distribution of it in runtime!
declare class ClientDeclaration {
    name: string;
    greet(): void;
}

// same here. This enum won't have distribution
declare enum ClientBadType {
    Internal = 'internal',
    External = 'external'
}

// in general - please don't mix `.d.ts` files with models in your project
// unless you'd like to do some interfaces merging as below 👇

interface JQueryStatic {
    myAwesomePluginWhichMakesMess: () => void
}

interface JQuery {
    myAwesomePluginWhichMakesMess: () => void
}