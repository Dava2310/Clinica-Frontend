export type RoutesApp = '/'
    | '/login'
    | '/signup'
    | '/profile';

export type users = 'administrador' | 'doctor' | 'paciente'

export type EndPointApi = '/api/auth/login'
    |'/api/auth/register'
    |'/api/auth/login'
    |'/api/auth/verify-token'
    |'/api/auth/refresh-token'
    |'/api/auth/logout'
    |'/api/auth/changePassword'
    | `api/users/${users}`

export type ErrForActions = {
    status:number,
    statusText:string
}


export type PropsToken = {
    accessToken: string,
    refreshToken: string,
    nombre: string,
    apellido:string,
    tipoUsuario:string
  }