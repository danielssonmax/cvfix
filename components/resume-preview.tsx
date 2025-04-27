"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { debounce } from "lodash"
import DefaultTemplate from "./templates/default-template"
import { LyxigTemplate } from "./templates/lyxig-template"
import { ElegantTemplate } from "./templates/elegant-template"

interface Template {
  id: string
  name: string
}

interface ResumePreviewProps {
  data: any
  selectedTemplate: string
  selectedFont: string
  fontSize: string
  textColor: string
  headerColor: string
  hasChangedTemplate: boolean
  sectionOrder: string[]
  sections?: { id: string; title: string; hidden?: boolean }[]
  templates: Template[]
  onSelectTemplate: (templateId: string) => void
}

const A4_WIDTH = 210 // mm
const A4_HEIGHT = 297 // mm
const PAGE_MARGIN_PX = 20 // Marginal för alla sidor

export function ResumePreview({
  data,
  sectionOrder,
  sections = [],
  selectedFont,
  fontSize,
  textColor,
  headerColor,
  selectedTemplate,
}: ResumePreviewProps) {
  const [pageCount, setPageCount] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleSections = useMemo(
    () =>
      sectionOrder.filter((sectionId) => {
        const section = sections.find((s) => s.id === sectionId)
        return section && !section.hidden
      }),
    [sectionOrder, sections],
  )

  const memoizedTemplate = useMemo(() => {
    const TemplateComponent =
      selectedTemplate === "lyxig" ? LyxigTemplate : selectedTemplate === "elegant" ? ElegantTemplate : DefaultTemplate
    return (
      <TemplateComponent
        data={data}
        sectionOrder={visibleSections}
        sections={sections}
        selectedFont={selectedFont}
        fontSize={fontSize}
        textColor={textColor}
        headerColor={headerColor}
      />
    )
  }, [data, visibleSections, sections, selectedFont, fontSize, textColor, headerColor, selectedTemplate])

  const checkContentHeight = useCallback(() => {
    if (contentRef.current && containerRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      const pageHeight = A4_HEIGHT * 3.78 // Konvertera mm till pixlar
      const neededPages = Math.ceil(contentHeight / (pageHeight - PAGE_MARGIN_PX * 2))
      setPageCount(neededPages)
      
      // Debugging
      console.log('Content height:', contentHeight)
      console.log('Page height:', pageHeight)
      console.log('Needed pages:', neededPages)
      console.log('Content per page:', contentHeight / neededPages)
      console.log('Content ref:', contentRef.current)
      console.log('Content HTML:', contentRef.current.innerHTML)
    }
  }, []) // Empty dependency array since we only need the refs

  // Separate effect for initial content check
  useEffect(() => {
    const timer = setTimeout(checkContentHeight, 100)
    return () => clearTimeout(timer)
  }, [checkContentHeight])

  // Separate effect for resize handling
  useEffect(() => {
    const debouncedCheckHeight = debounce(checkContentHeight, 200)
    window.addEventListener("resize", debouncedCheckHeight)
    return () => {
      window.removeEventListener("resize", debouncedCheckHeight)
    }
  }, [checkContentHeight])

  // Effect to recheck when data changes
  useEffect(() => {
    checkContentHeight()
  }, [data, checkContentHeight])

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      <div id="resume-preview" className="flex flex-col gap-4">
        {Array.from({ length: pageCount }).map((_, index) => {
          const pageHeight = A4_HEIGHT * 3.78
          const contentHeight = contentRef.current?.scrollHeight || 0
          const pageStart = index * pageHeight
          const pageEnd = (index + 1) * pageHeight
          const hasContent = contentHeight > pageStart || index === 0
          
          // Debugging
          console.log(`Page ${index + 1}:`, {
            contentHeight,
            pageStart,
            pageEnd,
            hasContent,
            data
          })
          
          if (!hasContent) return null
          
          return (
            <div
              key={index}
              className="bg-white shadow-lg"
              style={{
                width: `${A4_WIDTH * 3.78}px`,
                height: `${pageHeight}px`,
                padding: '0',
                position: 'relative',
                overflow: 'hidden',
                pageBreakAfter: 'always',
              }}
            >
              <div
                ref={index === 0 ? contentRef : null}
                className="resume-content"
                style={{
                  width: '100%',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  overflow: 'visible',
                  height: 'auto',
                  transform: `translateY(-${pageStart}px)`,
                  willChange: 'transform'
                }}
              >
                {memoizedTemplate}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ResumePreview
