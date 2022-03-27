import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches(
    $orderBy: Epoch_orderBy!
    $orderDirection: OrderDirection!
    $where: Epoch_filter
    $first: Int
  ) {
    epoches(
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      first: $first
    ) {
      id
      startBlock
      endBlock
      queryFeeRebates
      totalRewards
    }
    graphNetworks {
      epochCount
    }
  }
`
