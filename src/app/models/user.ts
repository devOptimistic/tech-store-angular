
export type User = {
    id: string,
    email: string;
    name: string,
    imageUrl: string,
    addresses: Address[]
}

export type Address = {
    id: number,
    fullName: string,
    phone: string,
    streetAddress: string,
    city: string,
    postalCode: string,
    isMain: boolean,
}

export type SignUpParams = {
    name: string,
    email: string;
    password: string;
    checkout?: boolean;
    dialogId: string; 
}

export type SignInParams = Omit<SignUpParams, 'name'>;