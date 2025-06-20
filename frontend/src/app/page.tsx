import Header from '@/app/feature/Header/page'
import Sidebar from '@/app/feature/Sidebar/page'
import SearchBar from '@/app/feature/Searchbar/page'

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