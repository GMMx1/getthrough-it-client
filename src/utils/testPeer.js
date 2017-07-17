export const NULL_ID = 'NULL_ID'
export const SAME_ID = 'SAME_ID'
export const DIFF_ID = 'DIFF_ID'

export const testPeerId = (peerId, myId) => {
  if (!peerId)
    return NULL_ID
  else if (peerId === myId) 
    return SAME_ID
  else if (peerId !== myId)
    return DIFF_ID
}