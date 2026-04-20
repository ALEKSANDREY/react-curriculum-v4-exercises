function SnackList() {
  const snacks = [
    { name: 'Chips', rank: 3 },
    { name: 'Pizza', rank: 1 },
    { name: 'Chocolate', rank: 2 },
    { name: 'Popcorn', rank: 4 },
    { name: 'Nuts', rank: 5 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack, index) => (
        <li key={index}>{snack.name}</li>
      ))}
    </ol>
  );
}

export default SnackList;
