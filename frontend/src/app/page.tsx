import Header from '@/app/feature/header/page'
import Sidebar from '@/app/feature/sidebar1/page'
import SearchBar from '@/app/feature/searchbar/page'

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