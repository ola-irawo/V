// export const getTotalReactionsCount = (reaction) => {
//   const reactionCount = reaction?.length;
//   const totalReactionCount =
//     reactionCount > 6
//       ? reactionCount.slice(0, 3) + "k+"
//       : reactionCount.length > 5
//       ? reactionCount.slice(0, 2) + "k+"
//       : reactionCount;

//   return totalReactionCount;
// };

/**
 * Calculates the total number of reactions and formats the count if it exceeds a certain threshold.
 * @param {Array} reaction - The array containing reaction data.
 * @returns {string} The formatted total reaction count.
 */

export const getTotalReactionsCount = (reaction) => {
  // Get the length of the reaction array, or default to 0 if it's undefined or null
  const reactionCount = reaction?.length ?? 0;

  // Format the reaction count based on its value
  const totalReactionCount =
    reactionCount > 6
      ? reactionCount.toString().slice(0, 3) + "k+"
      : reactionCount > 5
      ? reactionCount.toString().slice(0, 2) + "k+"
      : reactionCount;

  return totalReactionCount;
};
