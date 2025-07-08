// app/header-preview/page.tsx
import Header from "@/components/feature03/header"

export default function HeaderPreviewPage() {
  return (
    <main className="flex flex-col h-screen bg-background text-foreground">
      <Header />

      <div className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-2">Header Component Preview</h1>
        <p className="text-muted-foreground">
          This page renders the <code>Header</code> component with tabs and branding. 
          You can integrate this header into other pages as needed.
        </p>
      </div>
    </main>
  )
}
