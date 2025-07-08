// app/fields/page.tsx
import FieldSidebar from '@/components/feature03/FieldSidebar'

export default function FieldsPage() {
  return (
    <div className="flex h-screen">
      <FieldSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Field Selection Workspace</h1>
        <p className="text-gray-600">
          Select or deselect fields using the sidebar. Your selections will appear under "Selected Fields".
        </p>
      </div>
    </div>
  )
}
