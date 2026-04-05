//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export function StudentWork() {
  //add variables here
  const name = 'Andre';
  const age = 38;
  const hobbies = ['boxing', 'mma', 'football', 'coding'];

  return (
    <div>
      {/* add JSX here */}

      <h1>About me</h1>

      <p>
        Hi, my name is {name} and I am {age} years old!
      </p>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
