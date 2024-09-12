import Image from 'next/image';

export default async function Home() {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const todo = await data.json();
  console.log(todo);

  // throw new Error('This is an error');
  return (
    <main>
      <h1>{todo.title}</h1>
    </main>
  );
}
