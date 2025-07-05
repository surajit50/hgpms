import type { WarishDetailProps } from "@/types"

export function buildWarishHierarchy(flatDetails: any[]): WarishDetailProps[] {
  // Create a map to store all details by their ID
  const detailsMap = new Map<string, WarishDetailProps>()

  // First pass: Create all detail objects with empty children arrays
  flatDetails.forEach((detail) => {
    detailsMap.set(detail.id, {
      ...detail,
      children: [],
    })
  })

  const rootDetails: WarishDetailProps[] = []

  // Second pass: Build the hierarchy
  flatDetails.forEach((detail) => {
    const currentDetail = detailsMap.get(detail.id)
    if (!currentDetail) return

    if (detail.parentId) {
      // This is a child - add it to its parent's children array
      const parent = detailsMap.get(detail.parentId)
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(currentDetail)
      }
    } else {
      // This is a root level detail
      rootDetails.push(currentDetail)
    }
  })

  // Sort by creation time to maintain insertion order (closest to form entry order)
  const sortByCreationOrder = (details: WarishDetailProps[]): WarishDetailProps[] => {
    return details
      .sort((a, b) => {
        // Sort by creation time (which should reflect form entry order)
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
      .map((detail) => ({
        ...detail,
        children: detail.children ? sortByCreationOrder(detail.children) : [],
      }))
  }

  return sortByCreationOrder(rootDetails)
}

// Function that maintains form entry order using creation time
export function sortByFormEntryOrder(details: WarishDetailProps[]): WarishDetailProps[] {
  return details
    .sort((a, b) => {
      // Sort by creation time (form entry order)
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
    .map((detail) => ({
      ...detail,
      children: detail.children ? sortByFormEntryOrder(detail.children) : [],
    }))
}

// Keep this function for backward compatibility but use creation time for ordering
export function sortWarishDetailsByRelation(details: WarishDetailProps[]): WarishDetailProps[] {
  // For existing data, we'll use creation time to maintain form entry order
  return sortByFormEntryOrder(details)
}

// Optional function for relation-based sorting (if needed later)
export function sortWarishDetailsByRelationOrder(details: WarishDetailProps[]): WarishDetailProps[] {
  const relationOrder = {
    wife: 1,
    husband: 2,
    son: 3,
    daughter: 4,
    father: 5,
    mother: 6,
    brother: 7,
    sister: 8,
    grandson: 9,
    granddaughter: 10,
    other: 11,
  }

  return details
    .sort((a, b) => {
      // Sort by relation type
      const relationOrderA = relationOrder[a.relation as keyof typeof relationOrder] || 999
      const relationOrderB = relationOrder[b.relation as keyof typeof relationOrder] || 999
      return relationOrderA - relationOrderB
    })
    .map((detail) => ({
      ...detail,
      children: detail.children ? sortWarishDetailsByRelationOrder(detail.children) : [],
    }))
}
