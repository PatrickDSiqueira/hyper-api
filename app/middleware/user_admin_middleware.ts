import type {HttpContext} from '@adonisjs/core/http'
import type {NextFn} from '@adonisjs/core/types/http'
import {UserType} from "#start/enums/user_enum";

export default class UserAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user

    if (user?.user_type !== UserType.ADMIN) {
      return ctx.response.unauthorized()
    }

    const output = await next()
    return output
  }
}
