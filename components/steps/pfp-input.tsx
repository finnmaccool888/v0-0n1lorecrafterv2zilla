"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { fetchNftDataWithFallback, getOpenSeaNftLink } from "@/lib/api"
import type { CharacterData, Trait } from "@/lib/types"
import { Loader2, ExternalLink, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// import { StepImage } from "@/components/step-image"

interface PfpInputProps {
  characterData: CharacterData
  updateCharacterData: (data: Partial<CharacterData>) => void
  nextStep: () => void
}

export function PfpInput({ characterData, updateCharacterData, nextStep }: PfpInputProps) {
  const [pfpId, setPfpId] = useState(characterData.pfpId || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [traits, setTraits] = useState<Trait[]>(characterData.traits || [])
  const [imageUrl, setImageUrl] = useState<string | null>(characterData.imageUrl || null)
  const [traitsLoaded, setTraitsLoaded] = useState(characterData.traits.length > 0)
  const [isApiData, setIsApiData] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Update the handleSubmit function to validate the token ID range
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Normalize the token ID (remove leading zeros)
    const normalizedTokenId = pfpId.replace(/^0+/, "")

    // Check if the token ID is within the valid range (1-7777)
    const tokenIdNumber = Number.parseInt(normalizedTokenId, 10)
    if (isNaN(tokenIdNumber) || tokenIdNumber < 1 || tokenIdNumber > 7777) {
      setError("Please try again and enter a correct 0N1 Force Token ID (1-7777)")
      setTraitsLoaded(false)
      return
    }

    await fetchTokenData()
  }

  const fetchTokenData = async () => {
    if (!pfpId.trim()) return

    setIsLoading(true)
    setError("")
    setIsApiData(false)

    try {
      // Normalize the token ID (remove leading zeros)
      const normalizedTokenId = pfpId.replace(/^0+/, "")

      // Check if the token ID is within the valid range (1-7777)
      const tokenIdNumber = Number.parseInt(normalizedTokenId, 10)
      if (isNaN(tokenIdNumber) || tokenIdNumber < 1 || tokenIdNumber > 7777) {
        setError("Please try again and enter a correct 0N1 Force Token ID (1-7777)")
        setIsLoading(false)
        setTraitsLoaded(false)
        return
      }

      console.log(`Fetching data for token ID: ${normalizedTokenId}`)

      const {
        traits: fetchedTraits,
        imageUrl: fetchedImageUrl,
        isApiData: isFromApi,
      } = await fetchNftDataWithFallback(normalizedTokenId)

      if (fetchedTraits.length === 0) {
        setError("Could not fetch data from OpenSea API. Using generated traits instead.")
        setTraitsLoaded(false)
      } else {
        setTraits(fetchedTraits)
        setImageUrl(fetchedImageUrl)
        updateCharacterData({
          pfpId: normalizedTokenId, // Store normalized ID
          traits: fetchedTraits,
          imageUrl: fetchedImageUrl,
        })
        setTraitsLoaded(true)
        setIsApiData(isFromApi)
      }
    } catch (err) {
      console.error("Error in PfpInput component:", err)
      setError(`Error fetching NFT data: ${err instanceof Error ? err.message : "Unknown error"}`)
      setTraitsLoaded(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Retry fetching if we have a token ID but no traits
  useEffect(() => {
    if (characterData.pfpId && !characterData.traits.length && retryCount < 2) {
      console.log(`Retrying fetch for token ${characterData.pfpId}, attempt ${retryCount + 1}`)
      setPfpId(characterData.pfpId)
      fetchTokenData()
      setRetryCount((prev) => prev + 1)
    }
  }, [characterData.pfpId, characterData.traits.length, retryCount])

  const handleContinue = () => {
    if (traitsLoaded) {
      nextStep()
    }
  }

  // Use the normalized ID for the OpenSea link
  const normalizedId = pfpId.replace(/^0+/, "")
  const openSeaLink = normalizedId ? getOpenSeaNftLink(normalizedId) : ""

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Start with Your 0N1</h2>
        <p className="text-muted-foreground">Enter your 0N1 Force PFP ID to begin crafting your character's lore</p>
      </div>

      {/* Add the StepImage component */}
      {/* <StepImage step="pfpInput" /> */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter any 0N1 Force PFP ID (e.g. 922, 1631, 7627)"
            value={pfpId}
            onChange={(e) => setPfpId(e.target.value)}
            className="bg-background/50 border-purple-500/30 focus-visible:ring-purple-500"
            required
          />
          <Button
            type="submit"
            disabled={isLoading || !pfpId.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              "Fetch Traits"
            )}
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-950/30 border border-red-500/50 text-red-200 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p>{error}</p>
              <p className="text-sm mt-1">
                Try a different token ID or check if the ID exists in the{" "}
                <a
                  href="https://opensea.io/collection/0n1-force"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-100"
                >
                  0N1 Force collection
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </form>

      {traitsLoaded && (
        <>
          <Card className="border border-purple-500/30 bg-black/60 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* NFT Image */}
                <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                  <div className="relative w-full max-w-[300px] aspect-square rounded-lg overflow-hidden border border-purple-500/30">
                    {imageUrl ? (
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`0N1 Force #${normalizedId}`}
                        fill
                        className="object-contain" // Changed from object-cover to object-contain
                        unoptimized // Use unoptimized to avoid issues with external images
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-purple-900/20 text-purple-300">
                        No image available
                      </div>
                    )}
                  </div>
                </div>

                {/* NFT Details */}
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">0N1 Force #{normalizedId}</h3>
                    <Link
                      href={openSeaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      View on OpenSea
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                  <div className="grid gap-2">
                    {traits.map((trait, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-md bg-purple-950/30 border border-purple-500/20"
                      >
                        <span className="font-semibold">{trait.trait_type}:</span>
                        <span className="text-purple-200">{trait.value}</span>
                      </div>
                    ))}
                  </div>
                  {!isApiData && (
                    <div className="mt-4 text-xs text-amber-400 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>
                        Using generated data as fallback. The OpenSea API may be rate limited or temporarily
                        unavailable. Your character will still work with these traits.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8"
            >
              Start Building Lore
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
