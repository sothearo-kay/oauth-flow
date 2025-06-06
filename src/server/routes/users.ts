export default defineEventHandler(async (event) => {
  // Create a large dataset
  const allUsers = Array.from({ length: 200 }, (_, index) => {
    const id = index + 1;
    // Generate different names based on index to simulate a larger dataset
    const names = [
      "John",
      "Jane",
      "Bob",
      "Alice",
      "Charlie",
      "Diana",
      "Ethan",
      "Fiona",
      "George",
      "Helen",
      "Ian",
      "Julia",
      "Kevin",
      "Laura",
      "Michael",
      "Nancy",
      "Oscar",
      "Patricia",
      "Quincy",
      "Rachel",
    ];
    const surnames = [
      "Doe",
      "Smith",
      "Williams",
      "Johnson",
      "Brown",
      "Green",
      "Black",
      "White",
      "Gray",
      "Taylor",
      "Wilson",
      "Davis",
      "Miller",
      "Moore",
      "Anderson",
      "Thomas",
      "Jackson",
      "Martin",
      "Lee",
      "Harris",
    ];

    const nameIndex = id % names.length;
    const surnameIndex = Math.floor(id / names.length) % surnames.length;
    return {
      id,
      name: `${names[nameIndex]} ${surnames[surnameIndex]}`,
    };
  });

  // Get pagination params from query
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = allUsers.slice(startIndex, endIndex);

  // Return response with pagination info
  return {
    users: paginatedUsers,
    hasMore: endIndex < allUsers.length,
    total: allUsers.length,
  };
});
