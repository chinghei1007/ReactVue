// src/pages/blog/[slug].tsx
import { useParams } from 'react-router-dom'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()

  return <h1>Blog Post: {slug}</h1>
}