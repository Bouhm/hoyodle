import useSWR, { useSWRConfig } from "swr"
import fetcher from "./fetcher"

export default function useHSRPlays(gameId: string) {
  const { data, mutate } = useSWR(`https://localhost:8080/api/v1/hsr/games/${gameId}/plays`, fetcher)

  return {
    stats: data
  }
}