interface ServiceConfig {
    baseUrl: string;
    authUrl: string;

    client_id: string;
    client_secret: string;
    grant_type: string;
    scope: string;
}

    export const SERV_CONFIG: ServiceConfig = {
        baseUrl : 'https://app.inkastudios-api.com',
        // baseUrl : 'https://localhost:44339',
        authUrl : 'https://auth.inkastudios.com',

        client_id: 'ISClient',
        client_secret: 'Ll(pSIRf#0LFnau',
        grant_type: 'password',
        scope: 'inkapi openid profile'
    };
