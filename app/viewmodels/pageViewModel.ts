import { useEffect, useState } from "react"
import axiosInstance from "app/utils/axiosCreate"

const PageViewModel = (BASE_URL: string) => {
  const [render, setRender] = useState(false)
  const [city, setCity] = useState<string>("Jakarta")
  const [query, setQuery] = useState<string>("Jakarta")
  const [cities, setCities] = useState<string[]>([])
  const [response, setResponse] = useState<any>({})
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [isAutoComplete, setIsAutoComplete] = useState<boolean>(false)

  const getCurrentWeather = (city: string) => {
    const apiParam = `current/${city}`
    const axiosAPI = axiosInstance(BASE_URL, apiParam)

    axiosAPI
      .get("")
      .then((res) => {
        setResponse(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const searchCurrentWeather = (query: string) => {
    const apiParam = `search/${query}`
    const axiosAPI = axiosInstance(BASE_URL, apiParam)

    axiosAPI
      .get("")
      .then((res) => {
        if (res.data.result.length > 0 && isSearch) {
            setCities(res.data.result.map((city: any) => city.name))
            setIsAutoComplete(true)
        } else {
            setCities([])
            setIsAutoComplete(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onChangeText = (text: string) => {
    setQuery(text)
  }

  const onSearchBarFocus = () => {
    setIsAutoComplete(false)
    setIsSearch(true)
  }

  const onSearchBarBlur = () => {
    if (isAutoComplete) setQuery(city)
    setIsAutoComplete(false)
    setIsSearch(false)
  }

  const onOpenAutoComplete = (open: boolean) => {
    setIsAutoComplete(open)
  }

  const onClickAutoComplete = (cityValue: string) => {
    setCity(cityValue)
    setIsAutoComplete(false)
  }

  useEffect(() => {
    if (city) {
      getCurrentWeather(city)
      setIsSearch(false)
      setIsAutoComplete(false)
      setQuery(city)
    }
  }, [city])

  useEffect(() => {
    if (query && isSearch) {
      searchCurrentWeather(query)
    }
  }, [query])

  useEffect(() => setRender(true), [])

  return {
    city,
    query,
    onChangeText,
    cities,
    isSearch,
    onSearchBarBlur,
    onSearchBarFocus,
    isAutoComplete,
    onOpenAutoComplete,
    onClickAutoComplete,
    render,
  }
}

export default PageViewModel
