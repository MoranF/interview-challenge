/** @jsxImportSource theme-ui */
import globalTheme from '../theme'
import { Input } from 'theme-ui'

const SearchInput = ({ searchValue, handleSearchValueChange }) => {
  return (
    <Input
      placeholder="Search"
      value={searchValue}
      onChange={handleSearchValueChange}
      sx={{
        border: 'none',
        borderLeft: `1px solid ${globalTheme.colors.borderColor}`,
        borderRadius: '0',
        ':focus': { outline: 'none' },
        display: 'inline-block',
        marginLeft: globalTheme.space[2],
      }}
    />
  )
}

export default SearchInput
