import { getUserPermissions } from './infra'

const UserChains = {
  permissions: async (source, params, ctx) => await getUserPermissions(ctx, source)
}

export default UserChains
