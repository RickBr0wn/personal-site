'use client'

import { useEffect, useState } from 'react'

interface WeatherData {
  temp: number
  description: string
  id: number
  city: string
  isDay: boolean
}

function weatherEmoji(id: number, isDay: boolean): string {
  if (id >= 200 && id < 300) return '⛈️'
  if (id >= 300 && id < 600) return '🌧️'
  if (id >= 600 && id < 700) return '🌨️'
  if (id >= 700 && id < 800) return '🌫️'
  if (id === 800) return isDay ? '☀️' : '🌙'
  if (id === 801) return isDay ? '🌤️' : '🌙'
  if (id === 802) return '⛅'
  return '☁️'
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `/api/weather?lat=${coords.latitude}&lon=${coords.longitude}`
          )
          if (!res.ok) return
          setWeather(await res.json())
        } catch {}
      },
      () => {}
    )
  }, [])

  if (!weather) return null

  return (
    <p className="mt-10 text-sm text-zinc-600">
      {weatherEmoji(weather.id, weather.isDay)} {weather.temp}°c · {weather.city}
    </p>
  )
}
