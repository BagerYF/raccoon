import { Spin } from 'antd'
import './index.css'

function LoadingView(props: { fullScreen?: boolean; height?: string }) {
  const { fullScreen = false, height = '0' } = props
  return (
    <div
      style={{
        width: '100%',
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin spinning={true} fullscreen={fullScreen} />
    </div>
  )
}

export default LoadingView
