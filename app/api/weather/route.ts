import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 })
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
    { next: { revalidate: 1800 } }
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Weather fetch failed' }, { status: 502 })
  }

  const data = await res.json()
  const isDay = data.dt > data.sys.sunrise && data.dt < data.sys.sunset

  return NextResponse.json({
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    id: data.weather[0].id,
    city: data.name,
    isDay,
  })
}
