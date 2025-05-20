export interface Trait {
  trait_type: string
  value: string
}

export interface CharacterData {
  pfpId: string
  traits: Trait[]
  imageUrl?: string // Add imageUrl to store the NFT image
  archetype: string
  background: string
  hopesFears: {
    hopes: string
    fears: string
  }
  personalityProfile: {
    description: string // Changed to a single description field
  }
  motivations: {
    drives: string
    goals: string
    values: string
  }
  relationships: {
    friends: string
    rivals: string
    family: string
  }
  worldPosition: {
    societalRole: string
    classStatus: string
    perception: string
  }
  voice: {
    speechStyle: string
    innerDialogue: string
    uniquePhrases: string
  }
  symbolism: {
    colors: string
    items: string
    motifs: string
  }
  powersAbilities: {
    powers: string[]
    description: string
  }
  soulName: string
}

// OpenSea API response types
export interface OpenSeaApiResponse {
  nft: {
    identifier: string
    collection: string
    contract: string
    token_standard: string
    name: string
    description: string
    image_url: string
    metadata_url: string
    created_at: string
    updated_at: string
    is_disabled: boolean
    is_nsfw: boolean
    animation_url: string | null
    is_suspicious: boolean
    creator: string | null
    traits: OpenSeaTrait[]
    owners: any[]
    rarity: any
  }
}

export interface OpenSeaTrait {
  trait_type: string
  value: string
  display_type: string | null
  max_value: string | null
  trait_count: number
  order: number | null
}
