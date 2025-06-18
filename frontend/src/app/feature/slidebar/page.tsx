import { SlidebarLayout } from "../../../components/sections/layout"

export default function SlidebarPage() {
  return (
    <SlidebarLayout>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">Slidebar Demo</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-medium">Component Preview</h3>
              <p className="text-2xl font-bold">Working!</p>
            </div>
          </div>
        </div>
      </div>
    </SlidebarLayout>
  )
}