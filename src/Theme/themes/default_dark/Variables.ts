import { ThemeColors, ThemeNavigationColors } from '@/Theme/theme.type'

const Colors: ThemeColors = {
  primary: 'lightblue',
  text: 'white',
  inputBackground: 'gray',
  grey:'#EEEDED7E'
}

const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
}

export default {
  Colors,
  NavigationColors,
}
