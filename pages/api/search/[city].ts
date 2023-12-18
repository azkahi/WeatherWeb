import type { NextApiRequest, NextApiResponse } from "next"
import axiosInstance from "app/utils/axiosCreate"
import { Just, prop } from "app/utils/monads"

const searchCurrentWeatherInCity = async (city: string) => {
    const apiType = "search.json"
    const paramObject = { q: city, key: process.env.WEATHERWEB_API_KEY }
    const baseURL = process.env.WEATHERWEB_BASE_URL?.toString() || ""
    const axiosWeatherAPI = axiosInstance(baseURL, apiType)

    const response = await axiosWeatherAPI.get("", { params: paramObject })

    return response.data
}

const getCityParam = (req: NextApiRequest) => {
  const cityMaybe = new Just(req)

  const ret = cityMaybe
    .bind(prop("query"))
    .bind(prop("city"))
    .match(
      (value) => value,
      () => ""
    )

  // Monads force-casting
  if (ret) return ret.toString()
  else return ""
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await searchCurrentWeatherInCity(getCityParam(req))
    res.status(200).json({ result })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
