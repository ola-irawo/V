export const getUserPerformedAction = (reactions, userId) => {
  const reactionUserIds = new Set(reactions);
  return reactionUserIds.has(userId);
};
