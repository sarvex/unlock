import { QueriesOptions, useQueries } from '@tanstack/react-query'
import { SubgraphService } from '@unlock-protocol/unlock-js'
import { useAuth } from '~/contexts/AuthenticationContext'
import { useConfig } from '~/utils/withConfig'
import { LockCard, LocksByNetworkPlaceholder } from './LockCard'

interface LocksByNetworkProps {
  network: number
  isLoading: boolean
  locks?: any[]
}

const LocksByNetwork = ({ network, isLoading, locks }: LocksByNetworkProps) => {
  const { networks } = useConfig()
  const { name: networkName } = networks[network]

  if (isLoading) return <LocksByNetworkPlaceholder />
  if (locks?.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-brand-ui-primary">{networkName}</h2>
      <div className="flex flex-col gap-6">
        {locks?.map((lock: any, index: number) => (
          <LockCard key={index} lock={lock} network={network} />
        ))}
      </div>
    </div>
  )
}

export const LockList = () => {
  const { networks } = useConfig()
  const { account } = useAuth()

  const getLocksByNetwork = async ({ account, network }: any) => {
    const service = new SubgraphService()
    return await service.locks(
      {
        first: 1000,
        where: {
          lockManagers_contains: [account],
        },
      },
      {
        networks: [network],
      }
    )
  }

  const queries: QueriesOptions<any>[] = Object.entries(networks ?? {}).map(
    ([network]) => {
      if (account && network) {
        return {
          queryKey: ['getLocks', network, account],
          queryFn: async () =>
            await getLocksByNetwork({
              account,
              network,
            }),
        }
      }
    }
  )

  const results = useQueries({
    queries,
  })

  const isLoading = results?.some(({ isLoading }) => isLoading)

  return (
    <div className="grid gap-20 mb-20">
      {Object.values(networks ?? {}).map(({ id: network }: any, index) => {
        const locksByNetwork: any = results?.[index]?.data || []

        return (
          <LocksByNetwork
            isLoading={isLoading}
            key={network}
            network={network}
            locks={locksByNetwork}
          />
        )
      })}
    </div>
  )
}
