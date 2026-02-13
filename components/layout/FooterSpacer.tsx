'use client'

import React, { useEffect, useRef } from 'react'

export default function FooterSpacer() {
    const spacerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateFooterHeight = () => {
            const footer = document.querySelector('footer')
            if (footer && spacerRef.current) {
                const height = footer.offsetHeight
                document.documentElement.style.setProperty('--footer-h', `${height}px`)
            }
        }

        // Initial check
        updateFooterHeight()

        // Resize observer
        const footer = document.querySelector('footer')
        if (!footer) return

        const resizeObserver = new ResizeObserver(() => {
            updateFooterHeight()
        })

        resizeObserver.observe(footer)

        return () => resizeObserver.disconnect()
    }, [])

    return null
}
