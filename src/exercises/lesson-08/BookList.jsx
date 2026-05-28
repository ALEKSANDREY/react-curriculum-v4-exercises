import { useMemo } from 'react'; // 1. Imported useMemo
import {
  useRenderCounter,
  RenderCounter,
} from '../../private/components/renderCounter.jsx';
import BookCard from './BookCard.jsx';
import styles from './BookList.module.css';

// Book List Component - Optimized sorting operation
function BookList({ books, sortBy, favorites, onToggleFavorite }) {
  const { count } = useRenderCounter('BookList');

  // TODO #3: Optimize this expensive sorting operation with useMemo
  // Reviewer Note: Memorizes the sorted array reference, updating only on books/criteria change
  const sortedBooks = useMemo(() => {
    console.log('Re-sorting books array...'); // Educational log for performance tracking

    return books.toSorted((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.publishYear - a.publishYear;
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [books, sortBy]); // 2. Added dependencies

  return (
    <div className={styles.listContainer}>
      <RenderCounter
        componentName="BookList"
        count={count}
        className={styles.renderCounter}
      />
      <h2 className={styles.listTitle}>Books ({sortedBooks.length} found)</h2>
      {sortedBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favorites.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default BookList;
