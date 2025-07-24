import { Outlet } from 'react-router'
import DashboardSidebar from '../Components/DashboardSidebar/DashboardSidebar'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex'>
      {/* Left Side: Sidebar Component */}
      <DashboardSidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1 md:ml-64'>
        <div className=''>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout