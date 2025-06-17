import Header from '@/app/features/Header/page'
import Sidebar from '@/app/features/Sidebar/page'
import SearchBar from '@/app/features/Searchbar/page'

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