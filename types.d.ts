/// <reference types="react" />

declare module 'react' {
  import * as React from 'react'
  export = React
  export as namespace React
}

declare module 'next/link' {
  import { ComponentType, AnchorHTMLAttributes } from 'react'
  interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    as?: string
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    passHref?: boolean
    prefetch?: boolean
  }
  const Link: ComponentType<LinkProps>
  export default Link
}

declare module 'next/image' {
  import { ComponentType, ImgHTMLAttributes } from 'react'
  interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    priority?: boolean
    loading?: 'lazy' | 'eager'
    quality?: number
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
    unoptimized?: boolean
    onLoadingComplete?: () => void
  }
  const Image: ComponentType<ImageProps>
  export default Image
}

declare module 'next/font/google' {
  interface FontOptions {
    weight?: string | string[]
    style?: string | string[]
    subsets?: string[]
    display?: string
    variable?: string
    preload?: boolean
    fallback?: string[]
    adjustFontFallback?: boolean
    axes?: string[]
  }
  interface Font {
    className: string
    style: { fontFamily: string }
  }
  export function Roboto(options: FontOptions): Font
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 