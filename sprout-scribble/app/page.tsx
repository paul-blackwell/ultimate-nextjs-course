import getPosts from '@/server/actions/get-posts';
import createPost from '@/server/actions/create-post';

export default async function Home() {
  const { error, data } = await getPosts();

  if (error) {
    throw new Error(error);
  }

  if (data) {
    return (
      <main>
        {data.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
        <form action={createPost}>
          <input
            className="bg-black"
            type="text"
            name="title"
            placeholder="Title"
          />
          <button type="submit">Submit</button>
        </form>
      </main>
    );
  }
}
