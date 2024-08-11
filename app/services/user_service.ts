import User from '#models/user'
import { UserType } from '#start/enums/user_enum'

class UserService {
  /**
   * Create a new user
   */
  async createUser(data: {
    first_name: string
    last_name: string
    email: string
    password: string
    phone: string
  }) {
    const user = new User()

    user.fullName = data.first_name + ' ' + data.last_name

    user.email = data.email

    user.password = data.password

    user.phone = data.phone

    user.user_type = UserType.PLAYER

    await user.save()

    return user
  }

  /**
   * Atualiza um usuário existente
   */
  async updateUser(id: number, data: { fullName?: string; email?: string; password?: string }) {
    const user = await User.findOrFail(id)

    if (data.fullName) user.fullName = data.fullName
    if (data.email) user.email = data.email
    if (data.password) user.password = data.password

    await user.save()
    return user
  }

  /**
   * Deleta um usuário
   */
  async deleteUser(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
  }

  /**
   * Busca um usuário pelo ID
   */
  async findUserById(id: number) {
    return await User.find(id)
  }

  /**
   * Retorna todos os usuários
   */
  async getAllUsers() {
    return await User.all()
  }
}

export default new UserService()
