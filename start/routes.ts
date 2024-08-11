import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')

const SessionController = () => import('#controllers/session_controller')

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// router.resource('user', UsersController)

router.get('user', [UsersController, 'index']).use(middleware.auth({ guards: ['api'] }))
  .use(middleware.user_admin())

router.get('user/:id', [UsersController, 'show']).use(middleware.auth({ guards: ['api'] }))

router.post('user', [UsersController, 'store'])

router.post('login', [SessionController, 'store'])

router.post('logout', [SessionController, 'delete']).use(middleware.auth({ guards: ['api'] }))
