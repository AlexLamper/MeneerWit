import { ImageResponse } from 'next/og'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#18181b',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fafafa',
          borderRadius: '10px',
          fontWeight: 900,
          transform: 'rotate(3deg)',
        }}
      >
        ?
      </div>
    ),
    {
      ...size,
    }
  )
}
