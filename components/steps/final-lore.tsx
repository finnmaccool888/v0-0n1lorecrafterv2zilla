"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AiAssistant } from "@/components/ai-assistant"
import { AiChat } from "@/components/ai-chat"
import type { CharacterData } from "@/lib/types"
import { Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface FinalLoreProps {
  characterData: CharacterData
  updateCharacterData: (data: Partial<CharacterData>) => void
  prevStep: () => void
}

export function FinalLore({ characterData, updateCharacterData, prevStep }: FinalLoreProps) {
  const [soulName, setSoulName] = useState(characterData.soulName || "")
  const CONTRACT_ADDRESS = "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d" // 0N1 Force contract address

  const handleSoulNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoulName(e.target.value)
    updateCharacterData({ soulName: e.target.value })
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setSoulName(suggestion)
    updateCharacterData({ soulName: suggestion })
  }

  const exportAsJson = () => {
    const dataStr = JSON.stringify(characterData, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `0N1_${characterData.pfpId}_lore.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const openSeaLink = characterData.pfpId
    ? `https://opensea.io/assets/ethereum/${CONTRACT_ADDRESS}/${characterData.pfpId}`
    : "https://opensea.io/collection/0n1-force"

  // Add this function to the FinalLore component
  const resetVisitedState = () => {
    localStorage.removeItem("oni-visited")
    window.location.href = "/"
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Final Lore</h2>
        <p className="text-muted-foreground">Review your character's complete profile and give them a soul name</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="soulName">Soul Name</Label>
          <Input
            id="soulName"
            value={soulName}
            onChange={handleSoulNameChange}
            placeholder="Give your character a unique soul name..."
            className="bg-background/50 border-purple-500/30 focus-visible:ring-purple-500"
            required
          />
        </div>

        <Card className="border border-purple-500/30 bg-black/60 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">0N1 Force #{characterData.pfpId}</h3>
                <Link
                  href={openSeaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View on OpenSea
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Display NFT Image */}
              {characterData.imageUrl && (
                <div className="flex justify-center my-4">
                  <div className="relative w-full max-w-[200px] aspect-square rounded-lg overflow-hidden border border-purple-500/30">
                    <Image
                      src={characterData.imageUrl || "/placeholder.svg"}
                      alt={`0N1 Force #${characterData.pfpId}`}
                      fill
                      className="object-contain" // Changed from object-cover to object-contain
                      unoptimized // Use unoptimized to avoid issues with external images
                    />
                  </div>
                </div>
              )}

              <div className="grid gap-1">
                {characterData.traits.map((trait, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-semibold">{trait.trait_type}:</span> {trait.value}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Archetype</h3>
              <p>{characterData.archetype}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Background</h3>
              <p className="whitespace-pre-line">{characterData.background}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Hopes & Fears</h3>
              <div className="grid gap-1">
                <p>
                  <span className="font-semibold">Hopes:</span> {characterData.hopesFears?.hopes}
                </p>
                <p>
                  <span className="font-semibold">Fears:</span> {characterData.hopesFears?.fears}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Personality Profile</h3>
              <p className="whitespace-pre-line">{characterData.personalityProfile?.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Motivations</h3>
              <div className="grid gap-1">
                <p>
                  <span className="font-semibold">Drives:</span> {characterData.motivations?.drives}
                </p>
                <p>
                  <span className="font-semibold">Goals:</span> {characterData.motivations?.goals}
                </p>
                <p>
                  <span className="font-semibold">Values:</span> {characterData.motivations?.values}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Relationships</h3>
              <div className="grid gap-1">
                <p>
                  <span className="font-semibold">Friends:</span> {characterData.relationships?.friends}
                </p>
                <p>
                  <span className="font-semibold">Rivals:</span> {characterData.relationships?.rivals}
                </p>
                <p>
                  <span className="font-semibold">Family:</span> {characterData.relationships?.family}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">World Position</h3>
              <div className="grid gap-1">
                <p>
                  <span className="font-semibold">Societal Role:</span> {characterData.worldPosition?.societalRole}
                </p>
                <p>
                  <span className="font-semibold">Class Status:</span> {characterData.worldPosition?.classStatus}
                </p>
                <p>
                  <span className="font-semibold">Perception:</span> {characterData.worldPosition?.perception}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Voice</h3>
              <div className="grid gap-1">
                <p>
                  <span className="font-semibold">Speech Style:</span> {characterData.voice?.speechStyle}
                </p>
                <p>
                  <span className="font-semibold">Inner Dialogue:</span> {characterData.voice?.innerDialogue}
                </p>
                <p>
                  <span className="font-semibold">Unique Phrases:</span> {characterData.voice?.uniquePhrases}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Symbolism</h3>
              <div className="grid gap-1">
                <p>
                  <span className="font-semibold">Colors:</span> {characterData.symbolism?.colors}
                </p>
                <p>
                  <span className="font-semibold">Items:</span> {characterData.symbolism?.items}
                </p>
                <p>
                  <span className="font-semibold">Motifs:</span> {characterData.symbolism?.motifs}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Powers & Abilities</h3>
              <div className="grid gap-1">
                <p>
                  <span className="font-semibold">Powers:</span> {characterData.powersAbilities?.powers.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Description:</span> {characterData.powersAbilities?.description}
                </p>
              </div>
            </div>

            {soulName && (
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Soul Name</h3>
                <p className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {soulName}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <AiAssistant
          characterData={characterData}
          currentStep="soulName"
          onRegenerateSuggestions={() => {}}
          onSelectSuggestion={handleSelectSuggestion}
        />

        <AiChat characterData={characterData} currentStep="soulName" />

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            onClick={prevStep}
            variant="outline"
            className="border-purple-500/30 hover:bg-purple-900/20"
          >
            Previous
          </Button>
          <Button onClick={resetVisitedState} variant="outline" className="border-purple-500/30 hover:bg-purple-900/20">
            Reset Intro Animation
          </Button>
          <Button
            onClick={exportAsJson}
            disabled={!soulName.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Export as JSON
          </Button>
        </div>
      </div>
    </div>
  )
}
