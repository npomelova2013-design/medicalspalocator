'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'

const DEFAULT_FALLBACK = '/images/hero-portrait.png'

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
}

export function SafeImage({ fallbackSrc = DEFAULT_FALLBACK, src, alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasErrored, setHasErrored] = useState(false)

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (!hasErrored) {
          setHasErrored(true)
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}
