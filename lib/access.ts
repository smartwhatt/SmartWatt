import type { Access, FieldAccess } from 'payload'

/** Anyone may read published portfolio content. */
export const anyone: Access = () => true

/** Only signed-in editors may change content. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const authenticatedField: FieldAccess = ({ req: { user } }) => Boolean(user)
