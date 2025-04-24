export const theme = {
  colors: {
    primary: {
      DEFAULT: '#00bf63',
      hover: '#00a857',
    },
    background: {
      white: 'bg-white',
      light: 'bg-gray-50',
      subtle: 'bg-gray-100',
    },
  },
  typography: {
    h1: 'text-3xl md:text-[3.36rem] font-bold',
    h2: 'text-3xl md:text-4xl font-bold text-center',
    h3: 'text-xl font-semibold',
    paragraph: 'text-muted-foreground text-lg md:text-xl',
  },
  spacing: {
    section: 'py-16',
    container: 'container mx-auto px-4',
  },
  components: {
    button: {
      primary: 'bg-[#00bf63] hover:bg-[#00a857] text-white',
    },
    card: {
      default: 'bg-white p-6 rounded-lg shadow-md',
    },
  },
} as const 