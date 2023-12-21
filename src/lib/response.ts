import { NextResponse } from 'next/server'

export const convertResponse = (
  statusCode = 200,
  message: string,
  data: any,
): NextResponse => {
  return NextResponse.json({
    message,
    data
  }, {
    status: statusCode
  })
}