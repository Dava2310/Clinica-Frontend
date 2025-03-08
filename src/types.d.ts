interface ErrorResponse {
    response?: {
        data?: {
            statusCode?: number;
            message?: string;
        };
        status?: number;
    };
}
export type RoutesApp = '/'
    | '/login'
    | '/signup'
    | '/profile';

    export type idUser = number;
    export type users = 'administrador' | 'doctor' | 'paciente' | idUser

export type EndPointApi = '/api/auth/login'
    |'/api/auth/register'
    |'/api/auth/login'
    |'/api/auth/verify-token'
    |'/api/auth/refresh-token'
    |'/api/auth/logout'
    |'/api/auth/changePassword'
    |`/api/users/tipo/${users}`
    |`/api/users/${string}`
    |`/api/doctores/${string}`
    |'/api/doctores/'
    |'/api/pacientes/'
    |`/api/pacientes/${string}`
    |'/api/citas/'
    |`/api/citas/cancelar/${string}`
    |'/api/citas/opciones/'
    |`/api/historiales/`
    |`/api/historiales/${string}`
    |`/api/resumenes/${string}`

export type ErrForActions = {
    status:number,
    statusText:string
}

export type PropsToken = {
    accessToken: string,
    refreshToken: string,
    nombre: string,
    apellido:string,
    tipoUsuario:string,
    email:string,
    id:number
}

export type Panel = 1 | 2;

export type PropsToaster = {
    theme: 'colored' | 'dark' | 'light',
    message: string,
    autoClose?:number,
    type: 'success' | 'error' | 'info' | 'warning'
    position: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-center' | 'top-left' | 'top-right' 
};

