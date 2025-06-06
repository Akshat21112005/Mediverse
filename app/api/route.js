export async function GET() {
  return Response.json({
    name: 'Mediverse API',
    version: '1.0.0',
    status: 'online'
  })
}