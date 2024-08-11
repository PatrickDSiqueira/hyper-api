import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'
import User from '#models/user'

async function uniqueEmail(_db: Database, value: string) {
  const user = await User.findBy('email', value)

  return !user
}

async function uniquePhone(_db: Database, value: string) {
  const user = await User.findBy('phone', value)

  return !user
}

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    first_name: vine.string(),
    last_name: vine.string(),
    email: vine.string().email().unique(uniqueEmail),
    phone: vine.string().mobile().unique(uniquePhone),
    password: vine
      .string()
      .minLength(8)
      .maxLength(12)
      .alphaNumeric({
        allowSpaces: false,
      })
      .confirmed(),
  })
)
