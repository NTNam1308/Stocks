import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

import * as io from "socket.io-client";
import VueSocketIO from "vue-socket.io";

// Containers
const TheContainer = () =>
    import ('@/containers/TheContainer')

// Homepage
const Home = () => import('@/views/homepage/Home')
const Contact = () => import('@/views/homepage/Contact')
const OurTeam = () => import('@/views/homepage/OurTeam')
const Project = () => import('@/views/homepage/Project')

//News
const KungfuNew = () => import('@/views/news/KungfuNew')
const KungfuEdit = () => import('@/views/news/KungfuEdit')
const KungfuCreate = () => import('@/views/news/KungfuCreate')
const KungfuShow = () => import('@/views/news/KungfuShow')


// Views
const Dashboard = () =>
    import ('@/views/Dashboard')
const Fourm = () =>
    import ('@/views/Fourm')
const FilterCanslim = () => import('@/views/pages/FilterCanslim')
const Top400Stock = () => import('@/views/pages/Top400Stock')
const TradingChart = () => import('@/views/MultiTabTrading')
const LogTradingStock = () => import('@/views/TabTradingLog')
const StockSuggestion = () => import('@/views/StockSuggestion')
const Watchlist = () => import('@/views/Watchlist')
const MarketPulse = () => import('@/views/MarketPulse')
const FilterCompanyGroup = () => import('@/views/FilterCompanyGroup')
const MarginSafety = () => import('@/views/pages/MarginSafety')
const ManageReferenceCode =() => import('@/views/ManageReferenceCode')
const ReferenceHistory =() => import('@/views/users/ReferenceHistory')
const Colors = () =>
    import ('@/views/theme/Colors')
const Typography = () =>
    import ('@/views/theme/Typography')

const Charts = () =>
    import ('@/views/charts/Charts')
const Widgets = () =>
    import ('@/views/widgets/Widgets')

// Views - Components
const Cards = () =>
    import ('@/views/base/Cards')
const Forms = () =>
    import ('@/views/base/Forms')
const Switches = () =>
    import ('@/views/base/Switches')
const Tables = () =>
    import ('@/views/base/Tables')
const Tabs = () =>
    import ('@/views/base/Tabs')
const Breadcrumbs = () =>
    import ('@/views/base/Breadcrumbs')
const Carousels = () =>
    import ('@/views/base/Carousels')
const Collapses = () =>
    import ('@/views/base/Collapses')
const Jumbotrons = () =>
    import ('@/views/base/Jumbotrons')
const ListGroups = () =>
    import ('@/views/base/ListGroups')
const Navs = () =>
    import ('@/views/base/Navs')
const Navbars = () =>
    import ('@/views/base/Navbars')
const Paginations = () =>
    import ('@/views/base/Paginations')
const Popovers = () =>
    import ('@/views/base/Popovers')
const ProgressBars = () =>
    import ('@/views/base/ProgressBars')
const Tooltips = () =>
    import ('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () =>
    import ('@/views/buttons/StandardButtons')
const ButtonGroups = () =>
    import ('@/views/buttons/ButtonGroups')
const Dropdowns = () =>
    import ('@/views/buttons/Dropdowns')
const BrandButtons = () =>
    import ('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () =>
    import ('@/views/icons/CoreUIIcons')
const Brands = () =>
    import ('@/views/icons/Brands')
const Flags = () =>
    import ('@/views/icons/Flags')

// Views - Notifications
const Alerts = () =>
    import ('@/views/notifications/Alerts')
const Badges = () =>
    import ('@/views/notifications/Badges')
const Modals = () =>
    import ('@/views/notifications/Modals')

// Views - Pages
const Page404 = () =>
    import ('@/views/pages/Page404')
const Page500 = () =>
    import ('@/views/pages/Page500')
const Login = () =>
    import ('@/views/pages/Login')
const Register = () =>
    import ('@/views/pages/Register')
const RequestReset = () =>
    import ('@/views/pages/RequestReset')
const ResetPassword = () =>
    import ('@/views/pages/ResetPassword')    
const Verify = () =>
    import ('@/views/pages/Verify')

// Users
const Users = () =>
    import ('@/views/users/Users')
const User = () =>
    import ('@/views/users/User')
const EditUser = () =>
    import ('@/views/users/EditUser')
const Profile = () =>
    import ('@/views/users/Profile')
const ChangePassword = () =>
    import ('@/views/users/ChangePassword')
const ChangeUserPassword = () =>
    import ('@/views/users/ChangeUserPassword')
const Plan = () => 
    import('@/views/users/Plan')
const ChangeAvatar = () =>
    import ('@/views/users/ChangeAvatar')

//Notes
const Notes = () =>
    import ('@/views/notes/Notes')
const Note = () =>
    import ('@/views/notes/Note')
const EditNote = () =>
    import ('@/views/notes/EditNote')
const CreateNote = () =>
    import ('@/views/notes/CreateNote')

//Roles
const Roles = () =>
    import ('@/views/roles/Roles')
const Role = () =>
    import ('@/views/roles/Role')
const EditRole = () =>
    import ('@/views/roles/EditRole')
const CreateRole = () =>
    import ('@/views/roles/CreateRole')

//Bread
const Breads = () =>
    import ('@/views/bread/Breads')
const Bread = () =>
    import ('@/views/bread/Bread')
const EditBread = () =>
    import ('@/views/bread/EditBread')
const CreateBread = () =>
    import ('@/views/bread/CreateBread')
const DeleteBread = () =>
    import ('@/views/bread/DeleteBread')

//Resources
const Resources = () =>
    import ('@/views/resources/Resources')
const CreateResource = () =>
    import ('@/views/resources/CreateResources')
const Resource = () =>
    import ('@/views/resources/Resource')
const EditResource = () =>
    import ('@/views/resources/EditResource')
const DeleteResource = () =>
    import ('@/views/resources/DeleteResource')

//Email
const Emails = () =>
    import ('@/views/email/Emails')
const CreateEmail = () =>
    import ('@/views/email/CreateEmail')
const EditEmail = () =>
    import ('@/views/email/EditEmail')
const ShowEmail = () =>
    import ('@/views/email/ShowEmail')
const SendEmail = () =>
    import ('@/views/email/SendEmail')

const Menus = () =>
    import ('@/views/menu/MenuIndex')
const CreateMenu = () =>
    import ('@/views/menu/CreateMenu')
const EditMenu = () =>
    import ('@/views/menu/EditMenu')
const DeleteMenu = () =>
    import ('@/views/menu/DeleteMenu')

const MenuElements = () =>
    import ('@/views/menuElements/ElementsIndex')
const CreateMenuElement = () =>
    import ('@/views/menuElements/CreateMenuElement')
const EditMenuElement = () =>
    import ('@/views/menuElements/EditMenuElement')
const ShowMenuElement = () =>
    import ('@/views/menuElements/ShowMenuElement')
const DeleteMenuElement = () =>
    import ('@/views/menuElements/DeleteMenuElement')

const Media = () =>
    import ('@/views/media/Media')

//contact-feedback
const CustomerContactFeedbacks = () =>
    import ('@/views/contactFeedback/CustomerContactFeedbacks')
const CustomerContactFeedback = () =>
    import ('@/views/contactFeedback/CustomerContactFeedback')    
const EditCustomerContactFeedback = () =>
    import ('@/views/contactFeedback/EditCustomerContactFeedback')      

//Version
const Versions = () =>
    import ('@/views/versions/Versions')
// Maintenance
const Maintenance = () => import ('@/views/theme/Maintenance')

Vue.use(Router)

let router = new Router({
    mode: 'history', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})


router.beforeEach((to, from, next) => {
    let roles = localStorage.getItem("roles");
    let currentTime = Math.floor((new Date()).getTime() / 1000);
    let expiresIn = localStorage.getItem("expires_in");
    if (roles != null) {
        roles = roles.split(',')
    }

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (roles != null && roles.indexOf('admin') >= 0 && currentTime<expiresIn) {
            next()
        } else {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        }
    } else if (to.matched.some(record => record.meta.requiresUser)) {
        if (roles != null && roles.indexOf('user') >= 0 && currentTime<expiresIn) {
            next()
        } else {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        }
    } else if (to.matched.some(record => record.meta.requiresModerator)) {
        if (roles != null && roles.indexOf('moderator') >= 0 && currentTime<expiresIn) {
            next()
        } else {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        }
    } else if (to.matched.some(record => record.meta.requiresCoworker)) {
        if (roles != null && roles.indexOf('coworker') >= 0 && currentTime<expiresIn) {
            next()
        } else {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        }
    } else if (to.matched.some(record => record.meta.requiresClan)) {
        if (roles != null && roles.indexOf('clan') >= 0 && currentTime<expiresIn) {
            next()
        } else {
            store.commit('set', ['clanModal', true]);
            next({
                path: from.fullPath,
                params: { nextUrl: to.fullPath }
            })
        }
    } else if(to.path === '/login' && localStorage.getItem('api_token') && currentTime<expiresIn) {
        next({
            path: '/dashboard',
            params: { nextUrl: to.fullPath }
        })
    } else {
        next()
    }
})

export default router

function configRoutes() {
    return [
        {
            path: '/',
            name: 'Trang chủ',
            component: Home
        },
        {
            path: '/mua',
            name: 'Mua',
            component: Home
        },
        {
            path: '/hoi-dap',
            name: 'Hỏi Đáp',
            component: Home
        },
        {
            path: '/lien-he',
            name: 'Liên Hệ',
            component: Home
        },
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Trang chủ',
            component: TheContainer,
            children: [{
                    path: 'media',
                    name: 'Media',
                    component: Media,
                    meta: {
                        requiresAdmin: true
                    }
                },
                {
                    path: 'dashboard',
                    name: 'Trang chủ',
                    component: Dashboard,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'contact-feedback',
                    name: 'Liên hệ và phản hồi',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: {
                        requiresModerator: true
                    },
                    children:
                        [{
                            path: '',
                            component: CustomerContactFeedbacks,
                            meta: {
                                requiresModerator: true
                            }
                        },
                        {
                            path: ':id/show',
                            name: 'CustomerContactFeedback',
                            component: CustomerContactFeedback,
                            meta: {
                                requiresModerator: true,
                                label: 'Show Customer Contact and Feedback'
                            }
                        },
                        {
                            path: ':id/edit',
                            name: 'EditCustomerContactFeedback',
                            component: EditCustomerContactFeedback,
                            meta: {
                                requiresModerator: true,
                                label: 'Edit Contact and Feedback'
                            }
                        },]
                },
                {
                    path: 'profile',
                    name: 'Thông tin tài khoản',
                    component: Profile,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'maintenance',
                    name: '',
                    component: Maintenance,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'change_password',
                    name: 'Thay đổi mật khẩu',
                    component: ChangePassword,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'gioi-thieu',
                    name: 'Thông tin giới thiệu',
                    component: ReferenceHistory,
                    meta: {
                        requiresUser: true
                    }
                },  
                {
                    path: 'change_avatar',
                    name: 'Thay ảnh đại diện',
                    component: ChangeAvatar,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'plan',
                    name: 'Gói cước',
                    component: Plan,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'phan-tich-doanh-nghiep/:macks*',
                    name: 'Phân tích doanh nghiệp',
                    props: true,
                    component: Fourm,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'phan-tich-ky-thuat',
                    name: 'Phân tích kỹ thuật',
                    component: TradingChart,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'loc-diem',
                    name: 'Lọc điểm',
                    component: FilterCanslim,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'nhip-dap-thi-truong',
                    name: 'Nhịp đập thị trường',
                    component: MarketPulse,
                    meta: {
                        requiresModerator: true
                    }
                },
                {
                    path: 'loc-nhom-cong-ty',
                    name: 'Lọc nhóm công ty',
                    component: FilterCompanyGroup,
                    meta: {
                        requiresModerator: true
                    }
                },
                {
                    path: 'lich-su-gioi-thieu',
                    name: 'Lịch sử giới thiệu',
                    component: ManageReferenceCode,
                    meta: {
                        requiresModerator: true
                        // requiresUser: true
                    }
                },
                {
                    path: 'dinh-gia',
                    name: 'Định giá',
                    component: MarginSafety,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'xep-hang-co-phieu',
                    name: 'Xếp hạng cổ phiếu',
                    component: Top400Stock,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'quan-ly-version',
                    name: 'Quản lý Version',
                    component: Versions,
                    meta: {
                        requiresAdmin: true
                    }
                },
                {
                    path: 'tin-tuc',
                    name: 'Tin Tức',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: {
                        requiresCoworker: true
                    },
                    children: [{
                        path: '',
                        component: KungfuNew,
                        meta: {
                            requiresCoworker: true
                        }
                    },
                    {
                        path: 'create',
                        meta: { label: 'Create Kungfu New' },
                        name: 'KungfuCreate',
                        component: KungfuCreate,
                        meta: {
                            requiresCoworker: true
                        }
                    },
                    {
                        path: ':id/edit',
                        meta: { label: 'Edit Kungfu' },
                        name: 'KungfuEdit',
                        component: KungfuEdit,
                        meta: {
                            requiresCoworker: true
                        }
                    },
                    {
                        path: ':id',
                        meta: { label: 'Show Kungfu' },
                        name: 'Kungfu Show',
                        component: KungfuShow,
                        meta: {
                            requiresCoworker: true
                        }
                    },
                    ]
                },
                {
                    path: 'nhat-ky-giao-dich',
                    name: 'Nhật ký giao dịch',
                    component: LogTradingStock,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'co-phieu-goi-y',
                    name: 'Cổ phiếu gợi ý',
                    component: StockSuggestion,
                    meta: {
                        requiresClan: true
                    }
                },
                {
                    path: 'watchlist',
                    name: 'watchlist',
                    component: Watchlist,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'colors',
                    name: 'Colors',
                    component: Colors,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'typography',
                    name: 'Typography',
                    component: Typography,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'charts',
                    name: 'Charts',
                    component: Charts,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'widgets',
                    name: 'Widgets',
                    component: Widgets,
                    meta: {
                        requiresUser: true
                    }
                },
                {
                    path: 'menu',
                    meta: { label: 'Menu' },
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '',
                            component: Menus,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: 'create',
                            meta: { label: 'Create Menu' },
                            name: 'CreateMenu',
                            component: CreateMenu,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id/edit',
                            meta: { label: 'Edit Menu' },
                            name: 'EditMenu',
                            component: EditMenu,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id/delete',
                            meta: { label: 'Delete Menu' },
                            name: 'DeleteMenu',
                            component: DeleteMenu,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                    ]
                },
                {
                    path: 'menuelement',
                    meta: { label: 'MenuElement' },
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: ':menu/menuelement',
                            component: MenuElements,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':menu/menuelement/create',
                            meta: { label: 'Create Menu Element' },
                            name: 'Create Menu Element',
                            component: CreateMenuElement,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':menu/menuelement/:id',
                            meta: { label: 'Menu Element Details' },
                            name: 'Menu Element',
                            component: ShowMenuElement,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':menu/menuelement/:id/edit',
                            meta: { label: 'Edit Menu Element' },
                            name: 'Edit Menu Element',
                            component: EditMenuElement,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':menu/menuelement/:id/delete',
                            meta: { label: 'Delete Menu Element' },
                            name: 'Delete Menu Element',
                            component: DeleteMenuElement,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                    ]
                },
                {
                    path: 'users',
                    meta: { label: 'Users' },
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '',
                            component: Users,
                            meta: {
                                requiresModerator: true
                            }
                        },
                        {
                            path: ':id',
                            meta: { label: 'User Details' },
                            name: 'User',
                            component: User,
                            meta: {
                                requiresModerator: true
                            }
                        },
                        {
                            path: ':id/edit',
                            meta: { label: 'Edit User' },
                            name: 'Edit User',
                            component: EditUser,
                            meta: {
                                requiresModerator: true
                            }
                        },
                        {
                            path: ':id/:name/changepassword',
                            meta: { label: 'Change User Password' },
                            name: 'Change User Password',
                            component: ChangeUserPassword,
                            meta: {
                                requiresModerator: true
                            }
                        },
                    ]
                },
                {
                    path: 'notes',
                    meta: { label: 'Notes' },
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '',
                            component: Notes,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'create',
                            meta: { label: 'Create Note' },
                            name: 'Create Note',
                            component: CreateNote,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: ':id',
                            meta: { label: 'Note Details' },
                            name: 'Note',
                            component: Note,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: ':id/edit',
                            meta: { label: 'Edit Note' },
                            name: 'Edit Note',
                            component: EditNote,
                            meta: {
                                requiresUser: true
                            }
                        },
                    ]
                },
                {
                    path: 'roles',
                    meta: { label: 'Roles' },
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '',
                            component: Roles,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: 'create',
                            meta: { label: 'Create Role' },
                            name: 'Create Role',
                            component: CreateRole,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id',
                            meta: { label: 'Role Details' },
                            name: 'Role',
                            component: Role,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id/edit',
                            meta: { label: 'Edit Role' },
                            name: 'Edit Role',
                            component: EditRole,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                    ]
                },
                {
                    path: 'bread',
                    meta: { label: 'Bread' },
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '',
                            component: Breads,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: 'create',
                            meta: { label: 'Create Bread' },
                            name: 'CreateBread',
                            component: CreateBread,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id',
                            meta: { label: 'Bread Details' },
                            name: 'Bread',
                            component: Bread,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id/edit',
                            meta: { label: 'Edit Bread' },
                            name: 'Edit Bread',
                            component: EditBread,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id/delete',
                            meta: { label: 'Delete Bread' },
                            name: 'Delete Bread',
                            component: DeleteBread,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                    ]
                },
                {
                    path: 'email',
                    meta: { label: 'Emails' },
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: '',
                            component: Emails,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: 'create',
                            meta: { label: 'Create Email Template' },
                            name: 'Create Email Template',
                            component: CreateEmail,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id',
                            meta: { label: 'Show Email Template' },
                            name: 'Show Email Tempalte',
                            component: ShowEmail,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id/edit',
                            meta: { label: 'Edit Email Tempalate' },
                            name: 'Edit Email Template',
                            component: EditEmail,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                        {
                            path: ':id/sendEmail',
                            meta: { label: 'Send Email' },
                            name: 'Send Email',
                            component: SendEmail,
                            meta: {
                                requiresAdmin: true
                            }
                        },
                    ]
                },
                {
                    path: 'resource',
                    meta: { label: 'Resources' },
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: ':bread/resource',
                            component: Resources,
                        },
                        {
                            path: ':bread/resource/create',
                            meta: { label: 'Create Resource' },
                            name: 'CreateResource',
                            component: CreateResource
                        },
                        {
                            path: ':bread/resource/:id',
                            meta: { label: 'Resource Details' },
                            name: 'Resource',
                            component: Resource,
                        },
                        {
                            path: ':bread/resource/:id/edit',
                            meta: { label: 'Edit Resource' },
                            name: 'Edit Resource',
                            component: EditResource
                        },
                        {
                            path: ':bread/resource/:id/delete',
                            meta: { label: 'Delete Resource' },
                            name: 'Delete Resource',
                            component: DeleteResource
                        },
                    ]
                },
                {
                    path: 'base',
                    redirect: '/base/cards',
                    name: 'Base',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'cards',
                            name: 'Cards',
                            component: Cards,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'forms',
                            name: 'Forms',
                            component: Forms,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'switches',
                            name: 'Switches',
                            component: Switches,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'tables',
                            name: 'Tables',
                            component: Tables,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'tabs',
                            name: 'Tabs',
                            component: Tabs,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'breadcrumb',
                            name: 'Breadcrumb',
                            component: Breadcrumbs,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'carousel',
                            name: 'Carousel',
                            component: Carousels,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'collapse',
                            name: 'Collapse',
                            component: Collapses,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'jumbotron',
                            name: 'Jumbotron',
                            component: Jumbotrons,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'list-group',
                            name: 'List Group',
                            component: ListGroups,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'navs',
                            name: 'Navs',
                            component: Navs,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'navbars',
                            name: 'Navbars',
                            component: Navbars,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'pagination',
                            name: 'Pagination',
                            component: Paginations,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'popovers',
                            name: 'Popovers',
                            component: Popovers,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'progress',
                            name: 'Progress',
                            component: ProgressBars,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'tooltips',
                            name: 'Tooltips',
                            component: Tooltips,
                            meta: {
                                requiresUser: true
                            }
                        }
                    ]
                },
                {
                    path: 'buttons',
                    redirect: '/buttons/standard-buttons',
                    name: 'Buttons',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'buttons',
                            name: 'Standard Buttons',
                            component: StandardButtons,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'button-group',
                            name: 'Button Group',
                            component: ButtonGroups,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'dropdowns',
                            name: 'Dropdowns',
                            component: Dropdowns,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'brand-buttons',
                            name: 'Brand Buttons',
                            component: BrandButtons,
                            meta: {
                                requiresUser: true
                            }
                        }
                    ]
                },
                {
                    path: 'icon',
                    redirect: '/icons/coreui-icons',
                    name: 'CoreUI Icons',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'coreui-icons',
                            name: 'Icons library',
                            component: CoreUIIcons,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'brands',
                            name: 'Brands',
                            component: Brands,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'flags',
                            name: 'Flags',
                            component: Flags,
                            meta: {
                                requiresUser: true
                            }
                        }
                    ]
                },
                {
                    path: 'notifications',
                    redirect: '/notifications/alerts',
                    name: 'Notifications',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'alerts',
                            name: 'Alerts',
                            component: Alerts,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'badge',
                            name: 'Badge',
                            component: Badges,
                            meta: {
                                requiresUser: true
                            }
                        },
                        {
                            path: 'modals',
                            name: 'Modals',
                            component: Modals,
                            meta: {
                                requiresUser: true
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/',
            redirect: '/ourteam',
            name: 'OurTeam',
            component: OurTeam
        },
        {
            path: '/',
            redirect: '/project',
            name: 'Project',
            component: Project
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            component: {
                render(c) { return c('router-view') }
            },
            children: [{
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
            ]
        },
        {
            path: '/',
            redirect: '/login',
            name: 'Auth',
            component: {
                render(c) { return c('router-view') }
            },
            children: [{
                    path: 'login',
                    name: 'Đăng nhập',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'Đăng ký',
                    component: Register
                },
                {
                    path: 'verify',
                    name: 'Xác thực email',
                    component: Verify
                },
                {
                    path: 'request-password',
                    name: 'Đặt lại mật khẩu',
                    component: RequestReset
                },
                {
                    path: 'reset-password',
                    name: 'Đổi mật khẩu',
                    component: ResetPassword
                },
            ]
        },
        {
            path: '*',
            name: '404',
            component: Page404
        }
    ]
}
