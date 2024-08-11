import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import { createUserValidator } from '#validators/user_validator'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return UserService.getAllUsers()
  }

  /**
   * Handle form submission for the creation action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    return await UserService.createUser(payload)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return UserService.findUserById(params.id)
  }
}
