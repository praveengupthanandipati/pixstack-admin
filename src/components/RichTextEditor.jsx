import React, { useRef, useEffect, useCallback } from 'react'
import '../styles/RichTextEditor.scss'

// ── Toolbar button ────────────────────────────────────────────────────────────
const ToolBtn = ({ title, active, onClick, children }) => (
  <button
    type="button"
    title={title}
    className={`rte-btn${active ? ' rte-btn--active' : ''}`}
    onMouseDown={e => { e.preventDefault(); onClick() }}
  >
    {children}
  </button>
)

const Divider = () => <span className="rte-divider" />

// ── exec helpers ──────────────────────────────────────────────────────────────
const exec = (cmd, val = null) => document.execCommand(cmd, false, val)

const isActive = cmd => {
  try { return document.queryCommandState(cmd) } catch { return false }
}

// ── RichTextEditor ────────────────────────────────────────────────────────────
const RichTextEditor = ({ value, onChange, placeholder = 'Write here…', hasError }) => {
  const editorRef = useRef(null)

  // Set initial content once on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, []) // eslint-disable-line

  const handleInput = useCallback(() => {
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }, [onChange])

  const insertLink = () => {
    const url = window.prompt('Enter URL', 'https://')
    if (url) exec('createLink', url)
  }

  const toolGroups = [
    [
      { cmd: 'bold',          title: 'Bold (Ctrl+B)',          label: <strong>B</strong> },
      { cmd: 'italic',        title: 'Italic (Ctrl+I)',        label: <em>I</em>          },
      { cmd: 'underline',     title: 'Underline (Ctrl+U)',     label: <u>U</u>            },
      { cmd: 'strikeThrough', title: 'Strikethrough',          label: <s>S</s>            },
    ],
    [
      { cmd: 'formatBlock', val: 'H2', title: 'Heading 2', label: 'H2' },
      { cmd: 'formatBlock', val: 'H3', title: 'Heading 3', label: 'H3' },
      { cmd: 'formatBlock', val: 'P',  title: 'Paragraph', label: 'P'  },
    ],
    [
      { cmd: 'insertUnorderedList', title: 'Bullet list',   label: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="4" cy="7"  r="1.5" fill="currentColor"/>
          <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="4" cy="17" r="1.5" fill="currentColor"/>
          <line x1="8" y1="7"  x2="20" y2="7"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )},
      { cmd: 'insertOrderedList',   title: 'Numbered list', label: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <text x="2" y="9"  fontSize="8" fontWeight="700" fill="currentColor">1.</text>
          <text x="2" y="14" fontSize="8" fontWeight="700" fill="currentColor">2.</text>
          <text x="2" y="19" fontSize="8" fontWeight="700" fill="currentColor">3.</text>
          <line x1="10" y1="7"  x2="20" y2="7"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="10" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="10" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )},
    ],
    [
      { cmd: 'justifyLeft',   title: 'Align left',    label: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <line x1="3" y1="6"  x2="21" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )},
      { cmd: 'justifyCenter', title: 'Align center', label: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <line x1="3" y1="6"  x2="21" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="7" y1="18" x2="17" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )},
      { cmd: 'justifyRight',  title: 'Align right', label: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <line x1="3" y1="6"  x2="21" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="9" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="11" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )},
    ],
  ]

  return (
    <div className={`rte-wrap${hasError ? ' rte-wrap--error' : ''}`}>
      {/* Toolbar */}
      <div className="rte-toolbar">
        {toolGroups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <Divider />}
            {group.map((t, ti) => (
              <ToolBtn
                key={ti}
                title={t.title}
                active={!t.val && isActive(t.cmd)}
                onClick={() => t.val ? exec(t.cmd, t.val) : exec(t.cmd)}
              >
                {t.label}
              </ToolBtn>
            ))}
          </React.Fragment>
        ))}

        <Divider />

        {/* Link */}
        <ToolBtn title="Insert link" onClick={insertLink}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ToolBtn>

        {/* Remove formatting */}
        <ToolBtn title="Clear formatting" onClick={() => exec('removeFormat')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 19h4M15.586 7L18 4.414M4 4l16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.06 3.06L11 5l-5 5-1.94-1.94a1.5 1.5 0 0 1 0-2.12l3.88-3.88a1.5 1.5 0 0 1 2.12 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ToolBtn>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        className="rte-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
      />
    </div>
  )
}

export default RichTextEditor
