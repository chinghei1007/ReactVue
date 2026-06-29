import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/qr-code.css'

export default function QrCodePage() {
  const [text, setText] = useState('https://example.com')
  const [image, setImage] = useState('')

  useEffect(() => {
    let active = true
    QRCode.toDataURL(text, { margin: 1, width: 220 })
      .then((value: string) => {
        if (active) setImage(value)
      })
      .catch(() => {
        if (active) setImage('')
      })
    return () => {
      active = false
    }
  }, [text])

  return (
    <ChallengePage eyebrow="Level 2" title="QR Code Generator" summary="Generate QR codes from typed text or URLs.">
      <div className="challenge-demo">
        <textarea value={text} onChange={(event) => setText(event.target.value)} />
        {image ? <img src={image} alt="Generated QR code" /> : null}
      </div>
    </ChallengePage>
  )
}
