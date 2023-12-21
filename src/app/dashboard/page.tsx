import PrivateLayout from "@/components/layout/private-layout"
import Welcome from "./components/welcome"

const DashboardPage = () => {
  return (
    <PrivateLayout>
      <Welcome />
    </PrivateLayout>
  )
}

export default DashboardPage