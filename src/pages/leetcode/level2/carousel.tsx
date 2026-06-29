import { useEffect, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/carousel.css'

const slides = ['Slide one', 'Slide two', 'Slide three']

export default function CarouselPage() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 2000)
    return () => window.clearInterval(timer)
  }, [playing])

  return (
    <ChallengePage eyebrow="Level 2" title="Image Carousel / Slider" summary="Move through images with arrows, autoplay, and pagination dots.">
      <div className="challenge-demo">
        <p className="challenge-metric">{slides[index]}</p>
        <div className="challenge-actions">
          <button type="button" onClick={() => setIndex((current) => (current - 1 + slides.length) % slides.length)}>Prev</button>
          <button type="button" onClick={() => setPlaying((value) => !value)}>{playing ? 'Pause' : 'Play'}</button>
          <button type="button" onClick={() => setIndex((current) => (current + 1) % slides.length)}>Next</button>
        </div>
        <div className="challenge-dots">
          {slides.map((slide, slideIndex) => (
            <button key={slide} type="button" aria-pressed={index === slideIndex} onClick={() => setIndex(slideIndex)}>
              {slideIndex + 1}
            </button>
          ))}
        </div>
      </div>
    </ChallengePage>
  )
}
