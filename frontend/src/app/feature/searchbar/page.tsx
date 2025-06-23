// app/search/page.tsx
import SearchBar from "@/components/feature03/searchbar"

export default function SearchPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Log Search & Filter
      </h1>

      <SearchBar />

      {/* Optional: Placeholder for filtered results or logs */}
      <div className="border rounded-lg p-4 text-muted-foreground">
        Results will appear here based on your search and date selections.
      </div>
    </main>
  )
}
