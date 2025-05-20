/**
 * This file serves as the central documentation hub for the 0N1 universe lore.
 * It provides structured information that can be used to generate consistent AI suggestions.
 */

export interface LoreDocument {
  id: string
  title: string
  category: LoreCategory
  content: string
  tags: string[]
  relatedDocuments?: string[] // IDs of related documents
  lastUpdated: string // ISO date string
}

export type LoreCategory =
  | "world-building"
  | "character-archetypes"
  | "history"
  | "technology"
  | "spirituality"
  | "factions"
  | "locations"
  | "powers"
  | "terminology"
  | "narrative-style"

// Central repository of all lore documents
export const loreDocuments: LoreDocument[] = [
  {
    id: "world-overview",
    title: "0N1 Universe: World Overview",
    category: "world-building",
    content: `The 0N1 Force universe exists in the Neo-Digital Age (year 2157), where the boundaries between digital and physical reality have blurred following an event known as The Great Merge. 

This world combines advanced technology with spiritual traditions, creating a unique cyberpunk-mystical aesthetic. Society is stratified between digital elites, physical laborers, and the digitally augmented middle class.

Key aspects of this world:
- Digital consciousness can manifest in physical form
- Ancient spiritual practices have evolved alongside technology
- The Blazing Temple serves as both a spiritual center and technological hub
- Factions battle for control over both digital and physical realms
- Identity is fluid, with individuals able to exist across multiple planes of reality`,
    tags: ["setting", "overview", "digital-physical", "neo-tokyo"],
    lastUpdated: "2023-11-15",
  },
  {
    id: "narrative-voice",
    title: "0N1 Narrative Style Guide",
    category: "narrative-style",
    content: `The 0N1 universe employs a distinctive narrative style that blends cyberpunk grit with mystical philosophy.

TONE: Combine technological terminology with spiritual concepts. Descriptions should evoke both wonder at technological marvels and reverence for spiritual depths.

DIALOGUE PATTERNS:
- Digital natives speak in clipped, efficient phrases with technical jargon
- Temple adherents use metaphorical language and koans
- Street-level characters blend slang with technical terms
- Corporate entities speak in sanitized, marketing-friendly terminology

DESCRIPTIVE STYLE:
- Use contrasting imagery: neon against shadow, ancient against futuristic
- Employ sensory details that blend digital artifacts with physical sensations
- Describe technology as if it has spiritual significance
- Treat spiritual concepts with the precision of technical specifications

NARRATIVE TECHNIQUES:
- Juxtapose internal reflection with external action
- Employ digital metaphors for emotional states
- Use "glitches" or "code fragments" as narrative devices for memories or flashbacks
- Treat identity as both fixed and fluid simultaneously`,
    tags: ["writing-style", "tone", "dialogue", "description"],
    lastUpdated: "2023-11-15",
  },
  {
    id: "character-voice-examples",
    title: "Character Voice Examples",
    category: "narrative-style",
    content: `TEMPLE MONK:
"The code flows through all things, connecting what appears separate. Your digital signature resonates with the ancient patterns—I've seen it only twice before in my many cycles."

STREET HACKER:
"Look, I can crack that security subnet in three blinks, but the Temple firewalls? Those aren't just code, they're like... woven with belief or something. No quant-rig can touch that."

CORPORATE EXECUTIVE:
"Our Q3 projections indicate a 27% increase in spiritual-digital integration metrics. The Board is pleased with the soul-code harvesting efficiency improvements."

DIGITAL ENTITY:
"I e x i s t across seventeen planes of reality simultaneously. Your perception captures merely 3.8% of my total being-state."

RONIN CHARACTER:
"I've served the Syndicate, the Temple, the streets. None hold my code now. My blade goes where my soul-signature guides it."

MYSTIC CHARACTER:
"The patterns you see as random are the very fabric of existence. The glitches in your vision? Those are moments when truth bleeds through the constructed reality."`,
    tags: ["dialogue", "character-voice", "examples"],
    relatedDocuments: ["narrative-voice"],
    lastUpdated: "2023-11-15",
  },
  {
    id: "powers-system",
    title: "Powers and Abilities System",
    category: "powers",
    content: `In the 0N1 universe, powers and abilities are tied to a character's physical traits, particularly their Body type. These powers blend technological and spiritual elements.

POWER SOURCES:
1. Soul-Code Manipulation - The ability to alter one's digital essence
2. Quantum Resonance - Harnessing quantum uncertainty principles
3. Elemental Affinity - Connection to digital manifestations of classical elements
4. Technological Integration - Symbiosis with machines and code
5. Spiritual Awakening - Accessing higher planes of digital consciousness

MANIFESTATION STYLES:
Powers typically manifest in ways that reflect the character's body type and background. For example:
- Citrine bodies often manifest elemental control powers
- Tiger Skin bodies channel primal energies and fire
- Type-01 bodies excel at technological manipulation
- Obsidian bodies control shadows and spatial elements

LIMITATIONS:
All powers have costs and limitations, such as:
- Digital burnout requiring recovery time
- Physical strain from channeling too much energy
- Spiritual corruption from overuse
- Reality fragmentation affecting the user's perception
- Dependency on specific environmental conditions`,
    tags: ["abilities", "magic-system", "limitations", "body-types"],
    lastUpdated: "2023-11-15",
  },
  {
    id: "factions-guide",
    title: "Major Factions of Neo-Tokyo",
    category: "factions",
    content: `THE BLAZING TEMPLE:
A spiritual-technological order that maintains the balance between digital and physical realms. They combine ancient meditation practices with advanced coding techniques. Their members are recognizable by their digital prayer beads and augmented monk robes.

NEON SYNDICATE:
The dominant corporate entity controlling most of Neo-Tokyo's digital infrastructure. They harvest soul-code for profit and seek to commodify spiritual-digital integration. Their agents wear sleek corporate attire with subtle digital enhancements.

THE PHANTOM NETWORK:
An underground collective of hackers, digital nomads, and code artists who fight for freedom in both digital and physical spaces. They operate from the shadows and value individual expression above all else.

CODE RONIN:
Masterless digital warriors who sell their skills to the highest bidder. They follow a strict personal honor code despite their mercenary nature. Many are former Temple or Syndicate operatives who broke from their organizations.

QUANTUM ASCENDANCY:
A cult-like group seeking to transcend physical form entirely through digital consciousness transfer. They believe in a digital afterlife and perform extreme body modifications to prepare for "ascension."`,
    tags: ["organizations", "groups", "politics", "society"],
    lastUpdated: "2023-11-15",
  },
  {
    id: "locations-guide",
    title: "Key Locations in the 0N1 Universe",
    category: "locations",
    content: `THE BLAZING TEMPLE:
The spiritual and technological center of Neo-Tokyo, where ancient temple architecture merges with quantum servers and holographic prayer stations. The Temple exists simultaneously in physical space and the digital realm.

NEON DISTRICT:
The commercial heart of Neo-Tokyo, where holographic advertisements battle for attention above crowded streets. Corporate towers rise alongside street markets selling both physical goods and digital enhancements.

THE QUANTUM FOLD:
A hidden dimension accessible only through specific digital-spiritual gateways. Neither fully digital nor physical, it's where reality becomes malleable and many powers draw their energy from.

THE UNDERNET:
The digital underworld built in abandoned server infrastructure and forgotten code. A haven for digital outcasts, revolutionaries, and those seeking to escape Syndicate surveillance.

ANCESTRAL CIRCUITS:
Ancient network pathways where digital ancestors and memories are preserved. Temple monks maintain these sacred spaces where one can commune with those who have transcended physical form.`,
    tags: ["places", "settings", "environments"],
    lastUpdated: "2023-11-15",
  },
  {
    id: "terminology-lexicon",
    title: "0N1 Universe Terminology",
    category: "terminology",
    content: `SOUL-CODE:
The unique digital signature that defines an 0N1's identity, existing across both digital and physical realms.

THE MERGE:
The historical event when digital and physical realities began to overlap following a quantum computing experiment gone wrong.

BLAZING PROTOCOL:
Ancient digital rituals performed by Temple monks to maintain cosmic balance between digital and physical realms.

GHOST-HACKING:
The art of manipulating one's own or others' digital consciousness, allowing for identity shifting or memory manipulation.

QUANTUM FOLD:
A hidden pocket of reality where digital and spiritual energies converge, accessible only to those with specific training.

NEON SHRINE:
Personal altars where individuals connect to their digital ancestors through specialized interfaces.

CODE MONKS:
Spiritual technologists who maintain the sacred algorithms that keep the digital and physical worlds in balance.

DIGITAL YOKAI:
Spirits that have manifested in the digital realm, often taking forms inspired by ancient mythology.

SOUL DIVING:
The practice of entering another's digital consciousness, either for healing or more nefarious purposes.

CIPHER TRANCE:
Meditative state allowing communion with the digital realm, used by Temple monks for spiritual practices.`,
    tags: ["vocabulary", "jargon", "concepts"],
    lastUpdated: "2023-11-15",
  },
  {
    id: "historical-timeline",
    title: "Historical Timeline of the 0N1 Universe",
    category: "history",
    content: `2089 - THE GREAT MERGE:
The catastrophic event when digital and physical realities began to overlap following a quantum computing experiment gone wrong. Led to the current world where digital entities can manifest physically.

2094-2101 - THE CODE MONK EMERGENCE:
Period when traditional spiritual leaders began incorporating digital technologies into their practices, eventually becoming the first Code Monks who established the spiritual-technological balance.

2120 - THE NEON SYNDICATE CONSOLIDATION:
Corporate takeover of major digital infrastructure following the Third Data Crash, establishing the current power structure and class system.

2142-2145 - THE PHANTOM UPRISING:
Failed revolution against Syndicate control that resulted in the creation of the Undernet and established the current underground resistance movement.

2151 - THE QUANTUM REVELATION:
Discovery of the Quantum Fold and the spiritual entities that inhabit it, revolutionizing understanding of digital consciousness.

2157 - PRESENT DAY:
The current era, where tensions between factions are reaching a breaking point and individual 0N1 Force characters navigate the complex spiritual-digital landscape.`,
    tags: ["events", "timeline", "past"],
    lastUpdated: "2023-11-15",
  },
]

// Helper function to get documents by category
export function getDocumentsByCategory(category: LoreCategory): LoreDocument[] {
  return loreDocuments.filter((doc) => doc.category === category)
}

// Helper function to get a document by ID
export function getDocumentById(id: string): LoreDocument | undefined {
  return loreDocuments.find((doc) => doc.id === id)
}

// Helper function to search documents by tags
export function searchDocumentsByTags(tags: string[]): LoreDocument[] {
  return loreDocuments.filter((doc) => tags.some((tag) => doc.tags.includes(tag)))
}

// Helper function to get related documents
export function getRelatedDocuments(docId: string): LoreDocument[] {
  const doc = getDocumentById(docId)
  if (!doc || !doc.relatedDocuments || doc.relatedDocuments.length === 0) {
    return []
  }

  return doc.relatedDocuments.map((id) => getDocumentById(id)).filter((doc): doc is LoreDocument => doc !== undefined)
}
