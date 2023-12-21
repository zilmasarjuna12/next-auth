import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { convertResponse } from '@/lib/response';

export const POST = async (req: Request) => {
  try {
    const {
      name, email, password
    } = await req.json()

    /* check user */
    const count = await prisma.user.count({
      where: {
        email: email,
      }
    })

    if (count > 0) {
      return convertResponse(400, "Email have been used before.", null)
    }

    /* hash password */
    const hash_password = await hash(password, 12);

    /* save user */
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
      }
    })

    return convertResponse(200, "Success", user)
  } catch (error: any) {
    return convertResponse(500, error.message, null)
  }
}