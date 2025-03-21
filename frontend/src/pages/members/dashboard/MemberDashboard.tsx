import BarChartComponent from '@/components/charts/bar-chart'
import PageHeader from '@/components/page-header'


export default function MemberDashboard() {
  return (
    <div className="w-full h-full font-regular">
      {/* <PageHeader title="Dashboard"/> */}
      {/* <SignButton /> */}
      <BarChartComponent />
    </div>
  )
}
