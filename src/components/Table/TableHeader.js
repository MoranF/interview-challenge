/** @jsxImportSource theme-ui */
import globalTheme from '../../theme'
import Image from 'next/image'

export const ORDER_DIRECTION_VALUES = {
  ASC: 'asc',
  DESC: 'desc',
}

const TableHeader = ({
  headers,
  handleOrderChange,
  orderDirection,
  orderBy,
  sortedColumnIndex,
}) => {
  return <tr>{headers.map(renderHeaderCell)}</tr>

  function renderHeaderCell({ title, id, isSortable }, index) {
    const isSortedColum = index === sortedColumnIndex

    return (
      <th
        key={index}
        onClick={() => (isSortable ? handleOrderChange(id) : undefined)}
        sx={{
          color: isSortedColum ? 'inherit' : globalTheme.colors.secondaryText,
          fontWeight: globalTheme.fontWeights.body,
          fontSize: globalTheme.fontSizes[0],
          p: globalTheme.space[4],
          borderBottom: `1px solid ${
            isSortedColum ? globalTheme.colors.text : globalTheme.colors.borderColor
          }`,
          cursor: isSortable ? 'pointer' : 'inherit',
        }}
      >
        {title}
        {maybeRenderArrow()}
      </th>
    )

    function maybeRenderArrow() {
      return isSortedColum ? (
        <>
          {' '}
          <Image
            src={`/images/Direction-${
              orderDirection === ORDER_DIRECTION_VALUES.ASC ? 'Up' : 'Down'
            }.svg`}
            width={10}
            height={10}
          />
        </>
      ) : undefined
    }
  }
}

export default TableHeader
