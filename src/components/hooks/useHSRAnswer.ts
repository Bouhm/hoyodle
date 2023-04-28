import useSWR from "swr"
import fetcher from "./fetcher"

export default function useHSRAnswer() {
  const { data, error, isLoading } = useSWR('https://hoyodle.fly.dev/api/v1/hsr/games/today', fetcher)

  return {
    answer: data,
    isLoading,
    isError: error
  }
}