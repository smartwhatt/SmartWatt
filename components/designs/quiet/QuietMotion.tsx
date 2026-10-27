'use client'

import { useEffect } from 'react'

/**
 * Small, tea-on-paper motion. All of it is optional: without JavaScript the
 * page stays still and readable, and reduced-motion users get no movement.
 */
export default function QuietMotion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Only animate sections that start below the first screen. A section that
    // is already visible on load must not flash.
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight * 0.85,
    )
    let observer: IntersectionObserver | null = null

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const element = entry.target as HTMLElement
            element.removeAttribute('data-reveal-pending')
            element.animate(
              [
                { opacity: 0, transform: 'translateY(10px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              {
                duration: 650,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                fill: 'both',
              },
            )
            observer?.unobserve(element)
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )

      for (const target of targets) {
        target.dataset.revealPending = 'true'
        observer.observe(target)
      }
    }

    // One soft ring per press, like a drop on the surface of tea.
    const ripple = (event: PointerEvent) => {
      if (event.button !== 0) return

      const ring = document.createElement('span')
      const size = 150

      Object.assign(ring.style, {
        position: 'fixed',
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
        width: `${size}px`,
        height: `${size}px`,
        border: '1px solid rgba(92, 106, 85, 0.45)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '80',
        transform: 'translate(-50%, -50%) scale(0.15)',
      })

      document.body.appendChild(ring)

      const animation = ring.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.15)', opacity: 0.75 },
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 },
        ],
        { duration: 850, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      )

      animation.onfinish = () => ring.remove()
      animation.oncancel = () => ring.remove()
    }

    window.addEventListener('pointerdown', ripple)

    return () => {
      observer?.disconnect()
      window.removeEventListener('pointerdown', ripple)
    }
  }, [])

  return null
}
