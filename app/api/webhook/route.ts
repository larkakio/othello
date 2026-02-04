export async function POST(request: Request) {
  const body = await request.json()
  console.log('Farcaster webhook:', body)
  
  return Response.json({ received: true }, { status: 200 })
}
