import { extendTheme } from '@chakra-ui/react'

const activeLabelStyles = {
  transform: 'scale(0.7) translateY(-8px) translateX(3px) '

}

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f5f5f5'
      },
      a: {
        color: 'red',
        _hover: {
          textDecoration: 'underline'
        }
      }
    }
  },
  breakpoints: {
    sm: '320px',
    md: '700px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px'
  },
  colors: {
    primary: '#0095f6',
    primaryHover: 'rgba(0,149,246,.7)',
    bgColor: '#FAFAFA'
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, serif',
    mono: 'Menlo, monospace'
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'transparent',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top'
            }
          }
        }
      }
    },
    Button: {
      defaultProps: {
        colorScheme: 'blue'
      }
    },

    Link: {
      variants: {
        primary: ({ colorScheme = 'blue' }) => ({
          color: `${colorScheme}.400`,
          _hover: {
            color: `${colorScheme}.500`,
            textDecoration: 'none'
          }
        })
      },
      defaultProps: {
        variant: 'primary'
      }
    }
  }
})

export default theme
