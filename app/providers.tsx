'use client'
import React from 'react'
import ImageProvider from './context/ImageProvider'

interface Props {
    children: React.ReactNode
}

const Providers = ({children}: Props) => {
  return (
    <ImageProvider>
      {children}
    </ImageProvider>
  )
}

export default Providers