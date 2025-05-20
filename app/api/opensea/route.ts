import { NextResponse } from "next/server"

const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY || "21ebea66ff5346cca87d56b5d0e27feb"
const CONTRACT_ADDRESS = "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d" // 0N1 Force contract address

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tokenId = searchParams.get("tokenId")

  if (!tokenId) {
    return NextResponse.json({ error: "Token ID is required" }, { status: 400 })
  }

  // Normalize token ID by removing leading zeros
  const normalizedTokenId = tokenId.replace(/^0+/, "")

  try {
    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

    console.log(`Fetching OpenSea data for token ${normalizedTokenId}...`)

    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/ethereum/contract/${CONTRACT_ADDRESS}/nfts/${normalizedTokenId}`,
      {
        headers: {
          Accept: "application/json",
          "X-API-KEY": OPENSEA_API_KEY,
        },
        signal: controller.signal,
        cache: "no-store", // Ensure we don't use cached responses
      },
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error(`OpenSea API error for token ${normalizedTokenId}: ${response.status} ${response.statusText}`)

      // Log response body for debugging
      try {
        const errorBody = await response.text()
        console.error(`Error response body: ${errorBody}`)
      } catch (e) {
        console.error(`Could not read error response body: ${e}`)
      }

      return NextResponse.json(
        {
          error: `OpenSea API error: ${response.status}`,
          message: `Failed to fetch data for token ID ${normalizedTokenId}`,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log(`Successfully fetched data for token ${normalizedTokenId}`)
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error fetching from OpenSea for token ${normalizedTokenId}:`, error)
    return NextResponse.json(
      {
        error: "Failed to fetch data from OpenSea",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
