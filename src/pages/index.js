import { Box, Button, Heading, Flex } from 'theme-ui'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../apollo/client'
import { EPOCHES_QUERY } from '../apollo/queries'
import Table, { ORDER_DIRECTION_VALUES } from '../components/Table'
import SearchInput from '../components/SearchInput'
import globalTheme from '../theme'

const HEADERS = {
  EPOCH: getTableHeaderProps('EPOCH', 'id'),
  START_BLOCK: getTableHeaderProps('START BLOCK', 'startBlock'),
  END_BLOCK: getTableHeaderProps('END BLOCK', 'endBlock'),
  QUERY_FEES: getTableHeaderProps('QUERY FEES', 'queryFeeRebates'),
  TOTAL_REWARDS: getTableHeaderProps('TOTAL REWARDS', 'totalRewards'),
  EMPTY: getTableHeaderProps('', '', false), // a header for the column that contains the link to an epoch page
}
const TABLE_HEADERS = [
  HEADERS.EPOCH,
  HEADERS.START_BLOCK,
  HEADERS.END_BLOCK,
  HEADERS.QUERY_FEES,
  HEADERS.TOTAL_REWARDS,
  HEADERS.EMPTY,
]
const BIG_NUMBER_REDUNDANT_DIGITS = 10 ** 18
const DEFAULT_ORDER_BY_VALUE = HEADERS.START_BLOCK.id
const DEFAULT_ORDER_DIRECTION_VALUE = ORDER_DIRECTION_VALUES.ASC
const NUMBER_OF_EPOCHS_TO_LOAD = 3

const Index = () => {
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY_VALUE)
  const [orderDirection, setOrderDirection] = useState(DEFAULT_ORDER_DIRECTION_VALUE)
  const [searchValue, setSearchValue] = useState('')
  const [totalEpochsToLoad, setTotalEpochsToLoad] = useState(NUMBER_OF_EPOCHS_TO_LOAD)

  const { error, data } = useQuery(EPOCHES_QUERY, {
    variables: {
      orderBy,
      orderDirection,
      where: searchValue !== '' ? { startBlock: getParsedSearchValue() } : null,
      first: totalEpochsToLoad,
    },
  })

  const totalEpochCount = data?.graphNetworks[0].epochCount
  const epochCount = data?.epoches.length

  return (
    <Box sx={{ p: globalTheme.space[9] }}>
      {data != null ? (
        <Flex>
          <Box>
            <Heading>Epochs</Heading>
          </Box>
          <Box>
            <SearchInput
              searchValue={searchValue}
              handleSearchValueChange={handleSearchValueChange}
            />
          </Box>
        </Flex>
      ) : undefined}
      <Box
        sx={{
          pt: '48px',
          m: '0 auto',
          textAlign: 'center',
        }}
      >
        {data != null
          ? renderEpochsTable()
          : error != null
          ? error.message
          : 'Loading...'}
      </Box>
      {data != null ? (
        <Box
          sx={{
            color: globalTheme.colors.secondaryText,
            fontSize: globalTheme.fontSizes[0],
            marginTop: globalTheme.space[4],
          }}
        >
          {epochCount} of {totalEpochCount}
        </Box>
      ) : undefined}
      {data != null && totalEpochsToLoad === epochCount ? (
        // if totalEpochsToLoad > epochCount it means that there are no more epochs to load
        <Box sx={{ textAlign: 'center', marginTop: globalTheme.space[4] }}>
          {renderLoadMoreButton()}
        </Box>
      ) : undefined}
    </Box>
  )

  function handleSearchValueChange(event) {
    setSearchValue(event.target.value)
  }

  function handleOrderChange(orderByNewValue) {
    if (orderBy === orderByNewValue) {
      setOrderDirection(
        orderDirection === ORDER_DIRECTION_VALUES.ASC
          ? ORDER_DIRECTION_VALUES.DESC
          : ORDER_DIRECTION_VALUES.ASC,
      )
    } else {
      setOrderBy(orderByNewValue)
      setOrderDirection(ORDER_DIRECTION_VALUES.ASC)
    }
  }

  function getRows() {
    const { epoches } = data

    return epoches.map(({ id, startBlock, endBlock, queryFeeRebates, totalRewards }) => [
      id,
      renderBlock(startBlock),
      renderBlock(endBlock),
      renderGRTAmount(queryFeeRebates),
      renderGRTAmount(totalRewards),
      renderEpochLink(id),
    ])
  }

  function getParsedSearchValue() {
    const isValueNaN = Number.isNaN(parseInt(searchValue))

    return isValueNaN ? null : parseInt(searchValue)
  }

  function renderEpochLink(id) {
    return (
      <Link href={`/epoch/${id}`}>
        <a>
          <Box
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '20px',
              backgroundColor: '#03254c',
              p: '10px 8px',
              ':hover': { backgroundColor: '#1167b1' },
            }}
          >
            <Image src="/images/Delegate.svg" width={20} height={20} />
          </Box>
        </a>
      </Link>
    )
  }

  function renderGRTAmount(bigNumber) {
    const roundedBigNumber = Math.round(bigNumber / BIG_NUMBER_REDUNDANT_DIGITS)

    return `${roundedBigNumber} GRT`
  }

  function renderLoadMoreButton() {
    return (
      <Button
        onClick={() => setTotalEpochsToLoad(totalEpochsToLoad + NUMBER_OF_EPOCHS_TO_LOAD)}
        sx={{
          border: `1px solid ${globalTheme.colors.borderColor}`,
          backgroundColor: 'transparent',
          fontSize: globalTheme.fontSizes[0],
          fontWeight: globalTheme.fontWeights.heading,
          p: `${globalTheme.space[3]} ${globalTheme.space[7]}`,
          ':hover': { boxShadow: '0 0 24px 0 rgba(111,76,255,0.32)' },
        }}
      >
        Load more
      </Button>
    )
  }

  function renderBlock(block) {
    return `#${block}`
  }

  function renderEpochsTable() {
    return (
      <Table
        headers={TABLE_HEADERS}
        rows={getRows()}
        handleOrderChange={handleOrderChange}
        orderBy={orderBy}
        orderDirection={orderDirection}
      />
    )
  }
}

function getTableHeaderProps(title, id, isSortable = true) {
  return { title, id, isSortable }
}

export default withApollo(Index, { ssr: false })
