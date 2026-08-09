'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const IDLE_COLOR = '#4CAF50'
const HOVER_COLOR = '#45a049'
const ACTIVE_COLOR = '#3d8b40'

const BUTTON_STYLE: CSSProperties = {
  position: 'sticky',
  top: 20,
  float: 'right',
  margin: 10,
  padding: '10px 20px',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 16,
  zIndex: 100,
}

type CopyState = 'idle' | 'copied' | 'failed'

const LABELS: Record<CopyState, string> = {
  idle: 'Copy Prompt',
  copied: 'Copied!',
  failed: 'Failed to copy',
}

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  // Fallback for older browsers or non-HTTPS
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    if (!document.execCommand('copy')) throw new Error('execCommand("copy") failed')
  } finally {
    textArea.remove()
  }
}

export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<CopyState>('idle')
  const [color, setColor] = useState(IDLE_COLOR)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  async function handleClick() {
    try {
      await copyToClipboard(text)
      setState('copied')
    } catch (error) {
      setState('failed')
      console.error('Failed to copy text: ', error)
    }

    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button
      id="copyButton"
      type="button"
      style={{ ...BUTTON_STYLE, backgroundColor: color }}
      onClick={handleClick}
      onMouseOver={() => setColor(HOVER_COLOR)}
      onMouseOut={() => setColor(IDLE_COLOR)}
      onMouseDown={() => setColor(ACTIVE_COLOR)}
      onMouseUp={() => setColor(HOVER_COLOR)}
    >
      {LABELS[state]}
    </button>
  )
}
