
const AUTH = '/auth'
const ADMIN = '/admin'

const HOME = '/home';
const MOVIE = '/movie';

export const URL_ROUTES = {
  // ? Rutas authenticación
  LOGIN: `${AUTH}/login`,
  REGISTER: `${AUTH}/register`,
  CHANGE_PASSWORD: `${AUTH}/change-password`,

  // ? Rutas administrativas
  DASHBOARD: `${ADMIN}${HOME}/dashboard`

}
