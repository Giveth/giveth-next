const isNewProject = creationDate => {
  if (!creationDate) return null
  const currentTime = new Date()
  const twoWeeksAgo = currentTime.setDate(currentTime.getDate() - 14)
  return new Date(creationDate)?.valueOf() > twoWeeksAgo
}

export { isNewProject }
