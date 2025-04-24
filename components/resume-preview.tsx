"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { debounce } from "lodash"
import DefaultTemplate from "./templates/default-template"
import { LyxigTemplate } from "./templates/lyxig-template"
import { ElegantTemplate } from "./templates/elegant-template"

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
}

const A4_WIDTH = 210 // mm
const A4_HEIGHT = 297 // mm
const PAGE_MARGIN_PX = 0 // Marginal för alla sidor

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
  const [pageHeight, setPageHeight] = useState(A4_HEIGHT)
  const contentRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
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

  const adjustPageHeight = useCallback(() => {
    if (contentRef.current && pageRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      const currentPageHeight = pageRef.current.offsetHeight
      if (contentHeight > currentPageHeight - PAGE_MARGIN_PX * 2) {
        setPageHeight((prevHeight) => prevHeight + A4_HEIGHT)
      }
    }
  }, [])

  useEffect(() => {
    const debouncedAdjustPageHeight = debounce(adjustPageHeight, 200)
    window.addEventListener("resize", debouncedAdjustPageHeight)
    adjustPageHeight()
    return () => {
      window.removeEventListener("resize", debouncedAdjustPageHeight)
    }
  }, [adjustPageHeight])

  return (
    <div ref={containerRef} id="resume-preview" className="w-full h-full overflow-auto bg-white shadow-lg">
      <div ref={contentRef}>{memoizedTemplate}</div>
    </div>
  )
}

export default ResumePreview
