/* eslint-disable @next/next/no-img-element -- static export: plain <img> with our own build-time 800px variants */
import type { CSSProperties } from 'react'

const SMALL = 800

/** Path of the 800px copy made by scripts/build-images.ts, or null when the image is already small. */
export function smallVariant(src: string, width: number): string | null {
  return src.endsWith('.webp') && width > SMALL + 100 ? src.replace(/\.webp$/, `-${SMALL}w.webp`) : null
}

type Props = {
  src: string
  alt: string
  width: number
  height: number
  sizes?: string
  className?: string
  style?: CSSProperties
  /** On screen at load: fetch at once, at high priority. */
  priority?: boolean
}

/** A plain responsive <img>: phones get the 800px file, larger screens the original. */
export function Img({ src, alt, width, height, sizes = '100vw', className, style, priority = false }: Props) {
  const small = smallVariant(src, width)
  return (
    <img
      src={src}
      srcSet={small ? `${small} ${SMALL}w, ${src} ${width}w` : undefined}
      sizes={small ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      // On-screen images decode with the first paint; async decoding would hold back their paint (LCP).
      decoding={priority ? undefined : 'async'}
      className={className}
      style={style}
    />
  )
}
