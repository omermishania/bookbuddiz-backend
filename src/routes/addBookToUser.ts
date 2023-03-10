import User from '../models/user.model';

export async function addBookToUser(userName: string, bookId: string): Promise<boolean> {
  // Find the user document and update the books array
  const result = await User.findOneAndUpdate(
    { userName },
    { $addToSet: { books: bookId } },
    { new: true }
  );

  if (!result) {
    // User not found
    return false;
  }

  // Book added to user's books array
  return true;
}