import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/main.css'

import router from './routes'
import { Provider } from 'react-redux'
import store from './redux'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#212121',
            borderRadius: 2,
          },
          components: {
            Input: {
              activeShadow: undefined,
            },
            Form: {
              labelFontSize: 14,
              verticalLabelMargin: '6px 0',
            },
            Button: {
              primaryShadow: undefined,
            },
            Collapse: {
              headerPadding: '12px 16px 12px 0px',
              contentPadding: '16px 0',
            },
            Select: {
              optionSelectedBg: 'rgba(0, 0, 0, 0.04)',
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </StrictMode>
)
