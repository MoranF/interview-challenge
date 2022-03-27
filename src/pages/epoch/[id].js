/** @jsxImportSource theme-ui */
import globalTheme from '../../theme'
import { Box } from 'theme-ui'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

const EpochPage = () => {
  const {
    query: { id },
  } = useRouter()

  return (
    <Box sx={{ p: globalTheme.space[9] }}>
      <Link href={'/'}>
        <a>
          <Box
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '20px',
              backgroundColor: '#03254c',
              p: '10px 14px',
              ':hover': { backgroundColor: '#1167b1' },
              transform: 'rotate(90deg)',
              display: 'inline-block',
            }}
          >
            <Image src="/images/Direction-Down.svg" width={12} height={12} />
          </Box>
        </a>
      </Link>
      <Box
        sx={{
          display: 'inline-block',
          marginLeft: globalTheme.space[4],
          fontWeight: globalTheme.fontWeights.heading,
        }}
      >
        {id}
      </Box>
    </Box>
  )
}

export default EpochPage
