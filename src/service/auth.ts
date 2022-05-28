interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}
export function login(): Promise<Response> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'fhdshfdsnkfndsngodsnkgdsnlkgndslgdfgdfg',
                user: {
                    name: "Pedro Afonso",
                    email: "pedro.afonso@hotmail.com"
                },
            })
        }, 2000)
    });
}