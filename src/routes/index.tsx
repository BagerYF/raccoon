import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainView from '../views/main'
import HomeView from '../views/home'
import AboutView from '../views/static/about'
import FAQView from '../views/static/faq'
import OrderShippingView from '../views/static/order_and_shipping'
import PrivacyPolicyView from '../views/static/privacy_policy'
import TermsConditionsView from '../views/static/terms_conditions'
import ContactUsView from '../views/static/contact_us'
import DesignersView from '../views/designers'
import ProductListView from '../views/product_list'
import ProductDetail from '../views/product_detail'
import WishlistView from '../views/wishlist'
import CartView from '../views/cart'
import PageNotFoundView from '../views/static/page_not_found'
import LoginView from '../views/login'
import RegisterView from '../views/register'
import AccountView from '../views/account'
import AccountDetailView from '../views/account_detail'
import OrderView from '../views/order'
import AddressView from '../views/address'
import OrderDetailView from '../views/order_detail/index'
import CheckoutView from '../views/checkout'

function isAuthenticated(): boolean {
  return localStorage.getItem('KPublicToken') != null
}

const router = createBrowserRouter([
  {
    path: '/account',
    element: <Navigate to='/account/account-detail' />,
  },
  {
    path: '/',
    element: <MainView />,
    children: [
      {
        path: '',
        element: <HomeView />,
      },
      {
        path: 'about',
        element: <AboutView />,
      },
      {
        path: 'faq',
        element: <FAQView />,
      },
      {
        path: 'order-shipping',
        element: <OrderShippingView key={new Date().getTime()} />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicyView />,
      },
      {
        path: 'terms-conditions',
        element: <TermsConditionsView />,
      },
      {
        path: 'contact-us',
        element: <ContactUsView />,
      },
      {
        path: 'designers',
        element: <DesignersView />,
      },
      {
        path: 'product-list',
        element: <ProductListView />,
      },
      {
        path: 'product-detail',
        element: <ProductDetail />,
      },
      {
        path: 'wishlist',
        element: <WishlistView />,
      },
      {
        path: 'cart',
        element: <CartView />,
      },
      {
        path: 'login',
        element: <LoginView />,
      },
      {
        path: 'register',
        element: <RegisterView />,
      },
      {
        path: 'order-detail',
        element: isAuthenticated() ? (
          <OrderDetailView />
        ) : (
          <Navigate to='/login' />
        ),
      },
      {
        path: 'account',
        element: isAuthenticated() ? <AccountView /> : <Navigate to='/login' />,
        children: [
          {
            path: 'account-detail',
            element: isAuthenticated() ? (
              <AccountDetailView />
            ) : (
              <Navigate to='/login' />
            ),
          },
          {
            path: 'order',
            element: isAuthenticated() ? (
              <OrderView />
            ) : (
              <Navigate to='/login' />
            ),
          },
          {
            path: 'address',
            element: isAuthenticated() ? (
              <AddressView />
            ) : (
              <Navigate to='/login' />
            ),
          },
        ],
      },
      {
        path: '*',
        element: <PageNotFoundView />,
      },
    ],
  },
  {
    path: '/checkout',
    element: <CheckoutView />,
  },
])

export default router
