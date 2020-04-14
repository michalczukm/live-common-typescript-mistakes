console.log('👋');
console.log('To see output from any example please call its function. First one is called as an example.');

const marks = (() => {
    class Client {
        // "!" here is bang operator. It stands for asserting that field is not-null/not-undefined 
        name!: string;
        address?: {
            street: string
        };
        optional?: string; // <-- string | undefined
        nullable!: string | null; // <-- string | null
    };

    // ?. --> optional chaining, since address is optional
    new Client().address?.street;

    console.log('example 1!');
})(); // <-- thats how you "run" the example


const anyAndUnknown = (() => {
    type Client = {
        id: string;
        name: string;
        address: any,
        billing: unknown
    };

    function handleClient(client: Client): void {
        let anyAddress = client.address;
        let unknownBilling = client.billing;

        // we assign to `any`, call `any`. Do anything with it.
        anyAddress.foo();
        anyAddress = 'foo';

        // we can assign to `unknown`, but we cannot `call` it, nor use "nested" fields
        unknownBilling = 'foo';
        // unknownBilling();
        // unknownBilling.foo();

        // only if we're sure - we can do type assertion for unknown
        (unknownBilling as Client['address']).country;
    }
});


const usingDeclarations = (() => {
    const client = new ClientDeclaration();
    // since ClientDeclaration is only defined in .d.ts it will throw an exception if we won't provide `ClientDeclaration` into runtime (or distribution)
    client.greet();
});


const trickyEnum = (() => {
    // 👇 don't do this. It will NOT generate this `enum` in dist!
    const enum ClientType {
        Internal = 'internal',
        External = 'external'
    };

    if ('internal' === ClientType.Internal) {
        //...
    }
});


const classesVsInterfacesVsTypes = (() => {
    // USE IT ONLY IF YOU REALLY WANT TO MAKE AN INSTANCE OF SOMETHING!!!!
    class ClientClass {
        name!: string;
        greet(): string {
            return 'hi 👋';
        }
    }   

    interface ClientInterface {
        name: string;
        greet(): string;
    }

    interface ClientInterface {
        id: string;
    }

    type ClientType = {
        name: string;
        greet(): string;
    }

    const client = { name: 'Big fat client!', greet: () => 'hello!' };

    const clientClass: ClientClass = client;
    // const clientInterface: ClientInterface = client;
    const clientType: ClientType = client;

    client.greet();

    // it will log "false", because we didn't instantiate `ClientClass`. We only provide shape which matches.
    console.log("clientClass instanceof ClientClass", clientClass instanceof ClientClass);

    // 👇 below won't compile because interface and type won't produce any value and are only types. Not values.
    // console.log(clientInterface instanceof ClientInterface);
    // console.log(clientType instanceof ClientType);
});


const extendInterface = (() => {
    // 👇 below interface is added in `my-types.d.ts`, and it extends JQueryStatic interface from jquery typings
    // interface JQueryStatic {
    //     myAwesomePluginWhichMakesMess: () => void
    // }
    
    // thats why this works like a charm ;) The interfaces merged!
    $.myAwesomePluginWhichMakesMess();
});


const dontLeftEmptyTypesNorInterfaces = () => {
    interface EmptyOneInterface {};
    type EmptyOneType = {};

    function handleEmptyInterface(value: EmptyOneInterface){}
    function handleEmptyType(value: EmptyOneType){}

    // 👇 why? Because if we have empty type definition as above, it is treated as any
    handleEmptyInterface({});
    handleEmptyInterface('foo');
    handleEmptyInterface(5);

    handleEmptyType({});
    handleEmptyType('foo');
    handleEmptyType(5);
};


const classicInheritanceClassicInterfaceUsage = (() => {
    class User {
        name!: string;
    }

    interface SaySomething {
        say(): string;
    }

    class ClientUser extends User implements SaySomething {
        say(): string {
            return 'say';
        }
    }

    const clientUser = new ClientUser();
});


const modelByInterfaces = (() => {
    interface User {
        name: string;
    }

    interface SaySomething {
        say(): string;
    }

    interface ClientUser extends User, SaySomething {
    }

    interface InheritedFromClientUser extends ClientUser {
        newMethod(): void;
    }

    const clientUser: InheritedFromClientUser = {
        name: 'name sssss',
        say: () => 'hi!',
        newMethod: () => {}
    };
});


const typesCanDoSameAsInterfaces = (() => {
    interface User {
        name: string;
    }
    
    interface SaySomething {
        say(): string;
    }

    type ClientUser = User & SaySomething;

    interface InheritedFromClientUser extends ClientUser {
        newMethod(): void;
    }

    const clientUser: InheritedFromClientUser = {
        name: 'name sssss',
        say: () => 'hi!',
        newMethod: () => {}
    };
});


const trickyThisInTypeScript = (() => {
    const company = {
        name: 'my company',
        setName: function (newName: string): void {
            this.name = newName;
        }
    };
    
    company.setName('new company name');
    console.log(company.name); // 'new company name'
    
    
    //==============================
    // this is situation similar to callbacks, we've got functions that returns function or gets it as parameter
    const company2 = {
        name: 'my company',
        setName: function () {
            // if you have `"noImplicitThis": true,` or `"strict": true` in your tsconfig.json
            // it wouldn't compile! Which is good, because in this case `this = window`
            return function (newName: string) { this.name = newName; }
        }
    };
    
    company2.setName()('new company name');
    console.log(company2.name); //'my company'
    // ☝️ why? Because `this` in func will be `window`
});


// How to do nominal types 👇
const Nominal_Branding = (() => {
    type ClientId = {
        brand: 'clientId';
        id: string
    };

    type UserId = {
        brand: 'userId';
        id: string;
    };

    const createClientId = (id: string): ClientId => ({ brand: 'clientId', id });
    const createUserId = (id: string): UserId => ({ brand: 'userId', id });

    const getClient = (id: string) => {
        //...
    };

    getClient('foo');
    getClient('user-id-5');

    const getClientNominal = (id: ClientId) => {}
});


const Nominal_private = (() => {
    console.log('2');

    class ClientId {
        // private brand!: void

        constructor(public id: string) {}
    };

    class UserId {
        // private brand!: void

        constructor(public id: string) {}
    };

    const clientId: ClientId = new UserId('5');
    const userId: UserId = new ClientId('5');
});


export {};
