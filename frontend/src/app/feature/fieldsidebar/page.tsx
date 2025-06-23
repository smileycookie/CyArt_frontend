// app/field-sidebar/page.tsx
import FieldSidebar from "@/components/feature03/FieldSidebar"

export default function FieldSidebarPage() {
  return (
    <main className="flex h-screen">
      <FieldSidebar />

      {/* Main content area next to the sidebar */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Field Selection Panel
        </h1>
        <p className="text-muted-foreground mb-4">
          Use the sidebar to choose fields for log inspection, filtering, or export.
        </p>

        {/* Optional placeholder for dynamic results/logs */}
        <div className="border rounded-lg p-4 text-gray-600 dark:text-gray-300 bg-muted/10">
          Log data preview or table will appear here based on selected fields.
        </div>
      </div>
    </main>
  )
}
