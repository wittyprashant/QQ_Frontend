import React from 'react'

const RolePermission = React.lazy(() => import('../containers/RolePermission'))

const UserRequest = React.lazy(() => import('../containers/UserRequest'))
const UserRequestDetail = React.lazy(() => import('../containers/UserRequest/detail'))

const UserList = React.lazy(() => import('../containers/User'))
const UserDetail = React.lazy(() => import('../containers/User/detail'))
const UserAddEdit = React.lazy(() => import('../containers/User/addEdit'))

const GroupList = React.lazy(() => import('../containers/Group'))
const GroupListAddEdit = React.lazy(() => import('../containers/Group/addEdit'))

const ContactList = React.lazy(() => import('../containers/Contact'))


const GroupCategory = React.lazy(() => import('../containers/GroupCategory'))
const GroupCategoryAddEdit = React.lazy(() => import('../containers/GroupCategory/addEdit'))

const GroupActivity = React.lazy(() => import('../containers/GroupActivity'))
const GroupActivityAddEdit = React.lazy(() => import('../containers/GroupActivity/addEdit'))

const DigitalLibrary = React.lazy(() => import('../containers/DigitalLibrary'))
const DigitalLibraryAddEdit = React.lazy(() => import('../containers/DigitalLibrary/addEdit'))
const Dashboard = React.lazy(() => import('../components/payment dashboard/btndashboard'));
const Transaction = React.lazy(() => import('../containers/Transaction'))
const TransactionDetail = React.lazy(() => import('../containers/Transaction/detail'))
const TransactionAddEdit = React.lazy(() => import('../containers/Transaction/addEdit'))

const FaqList = React.lazy(() => import('../containers/Faqs'))
const FaqAddEdit = React.lazy(() => import('../containers/Faqs/addEdit'))

const Replays = React.lazy(() => import('../containers/Replays'))
const ReplayAddEdit = React.lazy(() => import('../containers/Replays/addEdit'))

const Events = React.lazy(() => import('../containers/Events'))
const EventAddEdit = React.lazy(() => import('../containers/Events/addEdit'))
const EventUserList = React.lazy(() => import('../containers/Events/userList'))

const Funding = React.lazy(() => import('../containers/Funding'))
const FundAddEdit = React.lazy(() => import('../containers/Funding/addEdit'))

const BillingInfo = React.lazy(() => import('../containers/BillingInfo/index'))

const routes = [

  { path: '/members', name: 'Members', element: UserList, exact: true },
  { path: '/members/add', name: 'Add Member', element: UserAddEdit, exact: true },
  { path: '/members/edit/:memberId', name: 'Edit Member', element: UserAddEdit },
  { path: '/members/:memberId', name: 'Member Detail', element: UserDetail },

  { path: '/group_management', name: 'Group Management', element: GroupList, exact: true },
  { path: '/group_management/add', name: 'Group Management', element: GroupListAddEdit, exact: true },
  { path: '/group_management/edit/:groupId', name: 'Group Management', element: GroupListAddEdit, exact: true },

  { path: '/contact_management', name: 'Contact Us', element: ContactList, exact: true },

  { path: '/group_category_management', name: 'Group Management', element: GroupCategory, exact: true },
  { path: '/group_category_management/add', name: 'Group Management', element: GroupCategoryAddEdit, exact: true },
  { path: '/group_category_management/edit:categoryId', name: 'Group Management', element: GroupCategoryAddEdit, exact: true },

  { path: '/group_activity_management/:categoryName/:groupId', name: 'Group Management', element: GroupActivity, exact: true },
  { path: '/group_activity_management/add/:categoryName/:groupId/:maxRows', name: 'Group Management', element: GroupActivityAddEdit, exact: true },
  { path: '/group_activity_management/edit/:categoryName/:groupId/:maxRows/:taskId', name: 'Group Management', element: GroupActivityAddEdit, exact: true },

  { path: '/digital_library', name: 'Digital Library', element: DigitalLibrary, exact: true },
  { path: '/digital_library/add', name: 'Add Digital Library', element: DigitalLibraryAddEdit, exact: true },
  { path: '/digital_library/edit/:digitalId', name: 'Edit Digital Library', element: DigitalLibraryAddEdit },
  { path: '/dashboard',name:'Dashboards',element:Dashboard,exact:true},
  
  { path: '/transactions', name: 'Transactions', element: Transaction, exact: true },
  { path: '/transactions/add', name: 'Add Transaction', element: TransactionAddEdit, exact: true },
  { path: '/transactions/edit/:transactionsId', name: 'Edit Transaction', element: TransactionAddEdit },
  { path: '/transactions/detail/:transactionsId', name: 'Detail Transaction', element: TransactionDetail },

  { path: '/faqs', name: 'FAQs', element: FaqList, exact: true },
  { path: '/faqs/add', name: 'Add FAQ', element: FaqAddEdit, exact: true },
  { path: '/faqs/edit/:faqId', name: 'Edit FAQ', element: FaqAddEdit },
  
  { path: '/replays/add', name: 'Replay Add', element: ReplayAddEdit, exact: true },
  { path: '/replays/edit/:replayId', name: 'Replay Edit', element: ReplayAddEdit },
  { path: '/replays', name: 'Replays', element: Replays, exact: true },

  { path: '/events', name: 'Events', element: Events, exact: true },
  { path: '/events/add', name: 'Events', element: EventAddEdit, exact: true },
  { path: '/events/edit/:eventId', name: 'Events', element: EventAddEdit },
  { path: '/events/user_list/:eventId', name: 'Events', element: EventUserList },

  { path: '/funding', name: 'Funding', element: Funding, exact: true },
  { path: '/funding/add', name: 'Fund Add', element: FundAddEdit, exact: true },
  { path: '/funding/edit/:fundingId', name: 'Fund Edit', element: FundAddEdit },

  { path: '/bill', name: 'Billing info', element: BillingInfo, exact: true },

  { path: '/role_permission', name: 'Role Permission', element: RolePermission, exact: true },

  { path: '/user_request', name: 'User Request', element: UserRequest, exact: true },  
  { path: '/user/request/:memberId', name: 'User Request', element: UserRequestDetail },
]

export default routes
