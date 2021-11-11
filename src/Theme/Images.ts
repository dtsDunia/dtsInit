import { ThemeImages, ThemeVariables } from '@/Theme/theme.type'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({}: ThemeVariables): ThemeImages {
  return {
    logo: require('@/Assets/Images/TOM.png'),
    star: require('@/Assets/Images/star.png'),
    unstar: require('@/Assets/Images/star_grey.png'),
    light: require('@/Assets/Images/light.png'),
    dark: require('@/Assets/Images/dark.png'),
    heist: require('@/Assets/Images/heist.jpeg'),
    army: require('@/Assets/Images/army.jpeg')
  }
}
