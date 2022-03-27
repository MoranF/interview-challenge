/** @jsxImportSource theme-ui */
import globalTheme from '../../theme'

const TableRow = ({ row, sortedColumnIndex }) => {
  return (
    <tr>
      {row.map((cell, index) => (
        <td
          key={index}
          sx={{
            color:
              index === sortedColumnIndex ? 'inherit' : globalTheme.colors.secondaryText,
            fontSize: globalTheme.fontSizes[1],
            p: `${globalTheme.space[3]} ${globalTheme.space[4]}`,
            borderBottom: `1px solid ${globalTheme.colors.borderColor}`,
          }}
        >
          {cell}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
