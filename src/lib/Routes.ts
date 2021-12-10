const MyAccount = '/account'

const Routes = {
  CreateProject: '/create',
  Projects: '/projects',
  Project: '/project',
  Donate: '/donate',
  AboutUs: '/about',
  Faq: '/faq',
  Support: '/support',
  Join: '/join',
  Terms: '/tos',
  Partnerships: '/partnerships',
  MyAccount,
  MyProjects: MyAccount + '?data=all&view=projects',
  MyDonations: MyAccount + '?view=donations'
}

export default Routes
