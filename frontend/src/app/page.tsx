import Header from '@/components/sections/Header'
import Sidebar from '@/components/sections/Sidebar'
import SearchBar from '@/components/sections/Searchbar'

export default function DashboardPage() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <SearchBar />
          
        </main>
      </div>
    </>
  )
}