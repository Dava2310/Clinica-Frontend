export interface ApiError {
    response?: {
        data?: {
            statusCode?: number;
            message?: string;
        };
        status?: number;
    };
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

export type PropsToaster = {
    theme: 'colored' | 'dark' | 'light',
    message: string,
    autoClose?:number,
    type: 'success' | 'error' | 'info' | 'warning'
    position: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-center' | 'top-left' | 'top-right' 
};

