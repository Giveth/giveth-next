import Routes from '../../lib/Routes'
import config from '../../../config'

export const headerRoutes = [
  {
    title: 'Home',
    href: Routes.Home,
    desktopOnly: true
  },
  {
    title: 'Projects',
    href: Routes.Projects,
    desktopOnly: true
  },
  {
    title: 'GIVeconomy',
    href: config.LINKS.GIVECONOMY
  },
  {
    title: 'Community',
    href: Routes.Join,
    desktopOnly: true
  },
  {
    title: 'Create a Project',
    href: Routes.CreateProject,
    desktopOnly: false
  }
]
