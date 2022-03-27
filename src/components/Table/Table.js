import TableHeader from './TableHeader'
import TableRow from './TableRow'

const Table = ({ headers, rows, handleOrderChange, orderBy, orderDirection }) => {
  const sortedColumnIndex = headers.findIndex(({ id }) => id === orderBy)

  return (
    <table>
      <thead>
        <TableHeader
          headers={headers}
          handleOrderChange={handleOrderChange}
          orderDirection={orderDirection}
          orderBy={orderBy}
          sortedColumnIndex={sortedColumnIndex}
        />
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <TableRow key={index} row={row} sortedColumnIndex={sortedColumnIndex} />
        ))}
      </tbody>
    </table>
  )
}

export default Table
