import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'

const PublicLayout = async ({
  children,
}) => {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    redirect("/dashboard")
    return
  }


  return children
}

export default PublicLayout