import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionController {
  async store({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return { user, token }
  }

  async delete({ auth }: HttpContext) {
    const user = auth.user

    const token = auth.user!.currentAccessToken

    // @ts-ignore
    await User.accessTokens.delete(user, token.identifier)
  }
}
